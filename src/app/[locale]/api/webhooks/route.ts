import { constructEventWebhookUC, retrieveSessionUC, deleteCustomerUC, retrieveSubscriptionUC } from "@/core/application/usecases/services/pay";
import { NextRequest, NextResponse } from "next/server";
import { apiReadUserByIdUC } from "@/core/application/usecases/entities/user";
import { apiCreateRoleUC, apiDeleteRolesUC, apiUpdateRoleByIdUC, apiReadRolesUC } from "@/core/application/usecases/entities/role";
import { RoleType } from "@/core/domain/entities/role.type";

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get("stripe-signature")

  try {
    const event = constructEventWebhookUC(payload, sig!)

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        console.log("checkout session triggered")
        const session = await retrieveSessionUC(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        
        // Get user from backend
        const userResponse = await apiReadUserByIdUC(session.client_reference_id!);
        if (!userResponse || !userResponse.success) {
          throw new Error("Error with client_reference_id");
        }
        const user = userResponse.data;
        
        if (!session.metadata || !session.metadata.role) {
          throw new Error("Error at set metadata role");
        }

        // Check if user already has a role (STUDENT or STUDENT_PRO)
        if (user.role === RoleType.STUDENT || user.role === RoleType.STUDENT_PRO) {
          if (user.roleId) {
            const roleResponse = await apiReadRolesUC({ _id: user.roleId });
            if (roleResponse && roleResponse.success && roleResponse.data.length > 0) {
              const role = roleResponse.data[0];
              const stripeCustomerId = role.stripeCustomerId;
              
              if (stripeCustomerId) {
                console.info("Cancelling previous subscription...");
                try {
                  await deleteCustomerUC(stripeCustomerId);
                  console.info("Previous customer deleted successfully");
                } catch (error) {
                  console.error("Error cancelling previous subscription:", error);
                  throw error;
                }
              }
            }
          }
        }

        // Create or update role
        if (!user.roleId) {
          // Create new role
          const roleResponse = await apiCreateRoleUC({
            address: user.address,
            permissions: session.metadata.role as RoleType,
            stripeCustomerId: session.customer as string,
            subscriptionId: session.subscription as string,
            subscriptionStatus: session.status as string,
          });
          console.debug("Role created: ", roleResponse);

          // Update user with new roleId and role
          try {
            const updatedUser = await apiReadUserByIdUC(user.id);
            if (!updatedUser || !updatedUser.success) {
              throw new Error(`Error at find user ${user.id}`);
            }
            console.log("updatedUser: ", updatedUser);
          } catch (saveError) {
            console.error("Error saving role or updating user:", saveError);
            throw saveError;
          }
        } else {
          // Update existing role
          const roleResponse = await apiReadRolesUC({ _id: user.roleId });
          if (!roleResponse || !roleResponse.success || roleResponse.data.length === 0) {
            throw new Error("error at set role");
          }
          const role = roleResponse.data[0];
          
          console.log("role info to be updated: ", { role });
          const updatedRole = await apiUpdateRoleByIdUC({
            id: role.id,
            updateData: {
              stripeCustomerId: session.customer as string,
              subscriptionId: session.subscription as string,
              subscriptionStatus: session.status as string,
              permissions: session.metadata.role as RoleType,
            }
          });
          console.log("updatedRole :", { updatedRole });
          
          const updatedUser = await apiReadUserByIdUC(user.id);
          if (!updatedUser || !updatedUser.success) {
            throw new Error(`Error at find user ${user.id}`);
          }
          console.log("updatedUser: ", { updatedUser });
        }
        break;

      case "customer.subscription.deleted":
        const subscriptionId = event.data.object.id;
        console.log("subscriptionId: ", subscriptionId);
        
        try {
          const subscription = await retrieveSubscriptionUC(subscriptionId);
          const roleResponse = await apiDeleteRolesUC({
            filter: { stripeCustomerId: subscription.customer as string }
          });

          if (!roleResponse || !roleResponse.success || roleResponse.data.length === 0) {
            return NextResponse.json({ status: "success", message: "No role found" });
          }

          const role = roleResponse.data[0];
          console.log("deleted role: ", { role });
          
          // Note: User update should be handled by the backend when role is deleted
          console.log("Role deleted successfully");
        } catch (error) {
          console.error("Error at handle delete subscription: ", error);
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({
      status: "success",
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ status: "Failed", err });
  }
}

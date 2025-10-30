import { RoleType } from "./role.type";

export type RoleBase = {
    address: string,
    permissions: RoleType,
    stripeCustomerId?: string;
    subscriptionId?: string;
    subscriptionStatus?: string;
}

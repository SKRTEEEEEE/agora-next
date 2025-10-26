"use server";

import { apiUpdateUserUC, apiDeleteUserUC } from "@/core/application/usecases/entities/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginPayload } from "thirdweb/auth";
import { UserUpdateData } from "@/core/infrastructure/api/user.repository";

export async function updateUser(
  id: string,
  payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
  },
  formData: { email: string | null; nick?: string; img: string | null }
) {
  const res = await apiUpdateUserUC({
    payload,
    formData: {
      id,
      nick: formData.nick ? formData.nick : null,
      img: formData.img,
      email: formData.email,
    },
  });
  revalidatePath("/");
  redirect("/");
}

export async function deleteUser(
  payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
  },
  id: string,
  address: string
) {
  const res = await apiDeleteUserUC({ payload, id, address });
  if (!res.success) {
    throw new Error(res.message || "Error deleting user");
  }
  revalidatePath("/");
}

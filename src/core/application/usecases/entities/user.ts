import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { ApiUserRepository, UserUpdateData } from "@/core/infrastructure/api/user.repository";

const apiUserRepository = new ApiUserRepository()

export const apiReadUserByIdUC = async (id: string) => {
    return await apiUserRepository.readById(id)
}

export const apiReadUsersUC = async () => {
    return await apiUserRepository.readAll()
}

export const apiLoginUserUC = async (data:{payload: VerifyLoginPayloadParams}) => {
    return await apiUserRepository.login(data)
}

export const apiUpdateUserUC = async (data: {
    payload: VerifyLoginPayloadParams;
    formData: UserUpdateData;
}) => {
    return await apiUserRepository.update(data)
}

export const apiDeleteUserUC = async (data: {
    payload: VerifyLoginPayloadParams;
    id: string;
    address: string;
}) => {
    return await apiUserRepository.deleteById(data)
}

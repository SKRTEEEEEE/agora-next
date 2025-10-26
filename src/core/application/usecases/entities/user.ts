import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { ApiUserRepository } from "@/core/infrastructure/api/user.repository";

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

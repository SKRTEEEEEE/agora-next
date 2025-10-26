"use server"

import { apiLoginUserUC } from "@/core/application/usecases/entities/user"
import { generatePayloadUC, getCookiesUC, isLoggedInUC, logoutUC, protAdmActUC, setJwtUC } from "@/core/application/usecases/services/auth"
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth"


export async function isLoggedIn(){
    return await isLoggedInUC()
}
export async function generatePayload(address: GenerateLoginPayloadParams): Promise<LoginPayload>{
    return await generatePayloadUC(address)
}
export async function logout(){
    await logoutUC()
}
export async function login(payload: VerifyLoginPayloadParams){
    const res = await apiLoginUserUC({payload})
    if(!res || !res.success) throw new Error("Login failed")
    const jwt = await setJwtUC(
    payload,
    {
      role: res.data.role,
      nick: res.data.nick,
      id: res.data.id,
      img: res.data.img || undefined
    }
  );
  return jwt
}

export async function protAdmAct(){
    return await protAdmActUC()
}

export async function getCookies(){
    return await getCookiesUC()
}

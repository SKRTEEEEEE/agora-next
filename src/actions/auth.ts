"use server"

import { apiLoginUserUC, apiReadUserByIdUC } from "@/core/application/usecases/entities/user"
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

export async function getUserData() {
    const cookies = await getCookiesUC()
    if (!cookies || !cookies.ctx) return null
    
    // Obtener datos completos del usuario desde el backend
    const userData = await apiReadUserByIdUC(cookies.ctx.id)
    if (!userData || !userData.success) return null
    
    return {
        id: userData.data.id,
        nick: userData.data.nick,
        img: userData.data.img,
        email: userData.data.email,
        address: userData.data.address,
        role: userData.data.role
    }
}

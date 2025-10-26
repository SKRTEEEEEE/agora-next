"use server"

import { redirect } from 'next/navigation'
 
export async function rd(path: string) {
  redirect(path)
}

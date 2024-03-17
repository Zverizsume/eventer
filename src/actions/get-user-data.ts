"use server"

import { createClient } from "@/utils/supabase/server"

export async function getUserData () {

    const supabase = createClient()

    const user = await supabase.auth.getUser()

    return user

}
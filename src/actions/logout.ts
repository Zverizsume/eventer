'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function logout ( ) {

    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if( error ) {

        return{
            error: 'Error while trying to logout'
        }

    }

    redirect('/')

}
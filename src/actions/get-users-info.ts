"use server"

import { createClient } from "@/utils/supabase/server"

export async function getUsersInfoByIds ( user_ids : string[] ) {

    const supabase = createClient()

    const { data, error } = await supabase.from('profile').select('id, full_name, email').in('id', user_ids)

    if( error )
    {
        console.log(error)
    }

    return data

}
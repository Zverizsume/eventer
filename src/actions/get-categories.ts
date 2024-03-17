'use server'

import { createClient } from "@/utils/supabase/server"

interface CategoriesObject {

    data: { title : string }[] | null,
    error: boolean,
    message: string

}

export async function getCategories(): Promise<CategoriesObject> {

    const supabase = createClient()
    const { data, error } = await supabase.from('category').select('title')

    if( error ){

        return({
            data: data,
            error: true,
            message: error.message
        })

    }

    return ({

        data: data,
        error: false,
        message: 'Success fetching categories'

    })

}
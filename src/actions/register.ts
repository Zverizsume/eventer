'use server'

import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const signInSchema = z.object({

    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email address is invalid.'}),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/, { message: 'Password must be at least 8 chars long and contain at least one digit, one lowercase and uppercase letter, one special char.'})

})

interface RegisterFormState {

    errors: {

        email?: string[]
        password?: string[],
        _form?: string[]

    }

}

export async function registerWithPassword(formState: RegisterFormState, formData: FormData) : Promise<RegisterFormState> {

    const supabase = createClient()

    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    const full_name = formData.get('full_name')?.toString()
    const birth_day = formData.get('birth_day')?.toString()
    const birth_month = formData.get('birth_month')?.toString()
    const birth_year = formData.get('birth_year')?.toString()

    if( !email || !password )
    {
        return {
            errors: {}
        }
    }

    const result = signInSchema.safeParse({

        email: email,
        password: password

    })

    if ( !result.success ){

        return {

           errors: result.error.flatten().fieldErrors

        }

    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: full_name,
                birth_data: birth_day + ' ' + birth_month + ' ' + birth_year
            }
        }
    })

    if(error) {

        return {
            errors: {
                _form: [error.message]
            }
        }

    }

    // console.log('Data: ', data)

    return {

        errors: {}

    }

}
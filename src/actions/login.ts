'use server'

import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const signInSchema = z.object({

    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email address is invalid.'}),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/, { message: 'Password must be at least 8 chars long and contain at least one digit, one lowercase and uppercase letter, one special char.'})

})

interface SignInFormState {

    errors: {

        email?: string[]
        password?: string[],
        _form?: string[]

    }

}

export async function loginWithPassword(formState: SignInFormState, formData: FormData) : Promise<SignInFormState> {

    const supabase = createClient()

    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

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

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if(error) {

        return {
            errors: {
                _form: [error.message]
            }
        }

    }

    return {

        errors: {}

    }

}

export async function loginWithGoogle () {

    // console.log('Trying to login with google!')

    const supabase = createClient()

    const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `http://localhost:3000/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            }
        }
    })

    if( error || !data.url )
    {
        console.log('Error while trying to login with google: ', error)
    }
    else
    {
        // console.log("Login with google data: ", data)

        redirect(data.url)
    }



}
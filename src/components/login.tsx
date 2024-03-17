'use client'

import { Button, Input } from "@nextui-org/react"
import { useFormState } from "react-dom"
import * as actions from '@/actions'

export default function Login() {

    const [ formState, action ] = useFormState( actions.login, {

        errors: {}

    })

    return(

        <form
            className={'p-3 bg-black-400'}
            action={action}
        >

            <Input type={'email'} label={'Email'} name={'email'} placeholder={'Enter email'} />
            <Input type={'password'} label={'Password'} name={'password'} placeholder={'Enter password'} />

            <Button
                type={'submit'}
            >
                Login
            </Button>

        </form>

    )

}
'use client'

import Nav from "./nav";
import { User } from '@supabase/supabase-js'

export default function Navbar({ userData } : { userData : User | null } ) {

    // console.log('User data: ', userData)

    return(

        <Nav userData = { userData } />

    )

}
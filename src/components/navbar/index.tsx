

import { getNotifications } from "@/actions";
import Nav from "./nav";
import { User } from '@supabase/supabase-js'

export default async function Navbar({ userData } : { userData : User | null } ) {

    const {data, error, message} = await getNotifications()

    return(

        <Nav userData={ userData } notifications={data} />

    )

}
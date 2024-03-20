'use client'

import {
    Navbar,
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    Link,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import { ThemeSwitcher } from "../themeSwitcher";
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react";

import LoginButton from "./loginButton";
import { User } from "@supabase/supabase-js";
import Notifications from "../notifications";
import { Notification } from "@/utils/types";

const menuItems = [

  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'Events',
    href: '/events'
  },
  {
    title: 'Add Event',
    href: '/create_event'
  }

]

export default function Nav({ userData, notifications } : { userData : User | null, notifications : Notification[] }) {

    const [ isMenuOpen, setIsMenuOpen ] = useState(false)

    return(

      <Navbar 
        shouldHideOnScroll
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">EVENTER</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {
            menuItems.map( mi => {

              return(

                <NavbarItem key={uuidv4()}>
                  <Link color="foreground" href={ mi.href } >
                    { mi.title }
                  </Link>
                </NavbarItem>

              )

            })
          }
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <LoginButton userData={ userData } />
          </NavbarItem>
          {/* <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem> */}
          <NavbarItem>
            <Notifications notifs={notifications} />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((mi) => (
            <NavbarMenuItem key={uuidv4()}>
              <Link
                className="w-full"
                color="foreground"
                href={mi.href}
                size="lg"
              >
                {mi.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

      </Navbar>

    )

}
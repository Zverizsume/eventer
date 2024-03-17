"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { IconSun, IconMoon } from '@tabler/icons-react'

export function ThemeSwitcher() {
  const [ mounted, setMounted ] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
        <Switch
            defaultSelected
            size="lg"
            color="warning"
            endContent={<IconSun/>}
            startContent={<IconMoon />}
            onValueChange={ theme === 'light' ? () => setTheme('dark') : () => setTheme('light') }
        />
    </div>
  )
};
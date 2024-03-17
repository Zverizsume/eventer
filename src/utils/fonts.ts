import { Montserrat, Karla } from 'next/font/google'

export const montserrat_init = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
    weight: ['300', '600', '900']
})

export const karla_init = Karla({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-karla',
    weight: ['300', '600', '800']
})

export const montserrat = montserrat_init.variable;
export const karla = karla_init.variable;

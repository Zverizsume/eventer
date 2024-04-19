'use client'

import { Accordion, AccordionItem, Button, Checkbox, CheckboxGroup } from "@nextui-org/react"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

type Filter = {

    field: string,
    values: any[]

}

export default function FilterBar({setActiveFilters} : { setActiveFilters: Dispatch<SetStateAction<Filter[]>> }) {

    const [ filters, setFilteres ] = useState<Filter[]>([
        {
            field: 'type',
            values: []
        },
        {
            field: 'category',
            values: []
        }
    ])

    const [ isButtonLoading, setIsButtonLoading ] = useState(false)

    const handleFilterChange = ( e : string[] | FormEvent<HTMLDivElement>, index: number ) => {

        if( Array.isArray(e) ) {

            let updatedFilters = [...filters]

            updatedFilters[index].values = e

            setFilteres(updatedFilters)
        }

    }

    const handleApplyFilters = () => {

        setIsButtonLoading(true)

        const toBeActivatedFilters = filters.filter( f => f.values.length > 0 )

        setActiveFilters( prev =>

            [...toBeActivatedFilters].concat([...prev].splice(-2))

        )

        setIsButtonLoading(false)

    }

    return(

        <div className="flex flex-col gap-4 h-[84vh] 2xl:w-[350px] py-8 px-6 rounded-xl bg-[linear-gradient(to_bottom,#141414_0%,#1e1e1e_100%)]">
            <p>Filter events</p>
            <div className="flex flex-col gap-2">
                <Accordion>
                    <AccordionItem key="1" aria-label="type" title="By type">
                        <CheckboxGroup name={'type'} onChange={ e => handleFilterChange(e, 0)}  value={filters[0].values} color={'secondary'}>
                            <Checkbox value="public">Public</Checkbox>
                            <Checkbox value="private">Private</Checkbox>
                            <Checkbox value="invite_only">Invite only</Checkbox>
                        </CheckboxGroup>
                    </AccordionItem>
                    <AccordionItem  key="2" aria-label="category" title="By category">
                        <CheckboxGroup name={'category'} onChange={ e => handleFilterChange(e, 1)}  value={filters[1].values} color={'secondary'}>
                            <Checkbox value="Conference">Conference</Checkbox>
                            <Checkbox value="Music">Music</Checkbox>
                            <Checkbox value="Sports">Sports</Checkbox>
                            <Checkbox value="Fashion">Fashion</Checkbox>
                            <Checkbox value="Festivals">Festivals</Checkbox>
                        </CheckboxGroup>
                    </AccordionItem>
                </Accordion>
            </div>
            <Button className={'absolute bottom-8 left-[50%] translate-x-[-50%] shadow-md shadow-content1 bg-default-100'} onPress={handleApplyFilters} isLoading={isButtonLoading}>Apply filters</Button>
        </div>

    )

}
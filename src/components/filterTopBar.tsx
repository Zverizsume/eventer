'use client'

import { Button, Chip, Input, Select, SelectItem, Selection } from "@nextui-org/react"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { IconSearch } from '@tabler/icons-react'

type Filter = {

    field: string,
    values: any[]

}

export default function FilterTopBar( { activeFilters, setActiveFilters } : { activeFilters: Filter[], setActiveFilters: Dispatch<SetStateAction<Filter[]>>}) {

    const [ searchCriteria, setSearchCriteria ] = useState('')

    const handleRemoveFilter = (i: number, j: number) => {

       let updatedActiveFilters = [...activeFilters]
       updatedActiveFilters[i].values.splice(j, 1)

       if( updatedActiveFilters[i].values.length === 0 )
            updatedActiveFilters.splice(i, 1)

       setActiveFilters(updatedActiveFilters)

    }
    const [ orderBySelectedValue, setOrderBySelectedValue ] = useState<Selection>(new Set(["l"]))
    const [ limitSelectedValue, setLimitSelectedValue ] = useState<Selection>(new Set(["10"]))

    const handleSearchByTitle = () => {

        let updatedActiveFilters = [...activeFilters]

        const index = activeFilters.findIndex( af => af.field === 'search' )

        if( searchCriteria ) {

            if( index >= 0 ) {

                updatedActiveFilters[index].values = [searchCriteria]

            } else {

                updatedActiveFilters.unshift({
                    field: 'search',
                    values: [searchCriteria]
                })

            }

            setActiveFilters(updatedActiveFilters)

        } else {

            if( index >= 0 ) {

                updatedActiveFilters.splice(index, 1)
                setActiveFilters(updatedActiveFilters)

            }

        }

    }

    const handleOrderByChanged = ( e : ChangeEvent<HTMLSelectElement> ) => {

        const value = e.target.value

        if( value ) {

            setOrderBySelectedValue( new Set([value]) )

            setActiveFilters( prev => {
                return(
                    prev.map( p => p.field === 'order' && p.values[0] !== e.target.value ? { ...p, values:[e.target.value] } : p )
                )
            })

        }

    }

    const handleLimitChanged = ( e : ChangeEvent<HTMLSelectElement> ) => {

        const value = e.target.value

        if( value ) {

            setLimitSelectedValue( new Set([value]) )

            setActiveFilters( prev => {
                return(
                    prev.map( p => p.field === 'limit' && p.values[0] !== e.target.value ? { ...p, values:[e.target.value] } : p )
                )
            })

        }

    }

    const handleKeyPressed = ( e : React.KeyboardEvent<HTMLInputElement> ) => {

        console.log('Key is pressed')

        if( e.key === 'Enter' ) {

            handleSearchByTitle()

        }

    }

    return(

        <div className="flex flex-col justify-start items-start gap-3">
            <div className="flex flex-row gap-3 w-full">
                <Input 
                    type="text"
                    placeholder={'Search events by title'}
                    onValueChange={setSearchCriteria}
                    value={searchCriteria}
                    startContent={
                        <Button className="focus:outline-none shadow-md shadow-content1 bg-default-100 p-2 min-w-0 rounded-lg h-auto mr-2" type="button" onClick={handleSearchByTitle}><IconSearch size={'20'} color="rgba(174, 67, 1, .8)" /></Button>
                    }
                    isClearable
                    onKeyDown={handleKeyPressed}
                />
                <Select onChange={ e => handleOrderByChanged(e)} selectedKeys={orderBySelectedValue} className="w-[300px]" label='Order by'>
                    <SelectItem key={'l'} value={'latest'}>
                        Latest
                    </SelectItem>
                    <SelectItem key={'o'} value={'oldest'}>
                        Oldest
                    </SelectItem>
                    <SelectItem key={'p'} value={'popular'}>
                        Popular
                    </SelectItem>
                    <SelectItem key={'r'} value={'radnom'}>
                        Random
                    </SelectItem>
                </Select>
                <Select onChange={ e => handleLimitChanged(e)} selectedKeys={ limitSelectedValue } className="w-[120px]" label='Limit'>
                    <SelectItem key={10} value={10}>
                        10
                    </SelectItem>
                    <SelectItem key={20} value={20}>
                        20
                    </SelectItem>
                    <SelectItem key={25} value={25}>
                        25
                    </SelectItem>
                    <SelectItem key={30} value={30}>
                        30
                    </SelectItem>
                </Select>
            </div>
            <div id={'filterChips'} className="flex flex-row justify-start items-start gap-3 flex-wrap">
                {
                    activeFilters.map( (f, i) => 
                        
                        f.values.map( (v, j) => {

                            if( f.field !== 'order' && f.field !== 'limit' && f.field !== 'search' )

                            return(

                                <Chip onClose={ e => handleRemoveFilter(i,j) } key={uuidv4()} isCloseable={true} >
                                    {`${f.field}: ${v}`}
                                </Chip>

                            )

                        })

                    )
                }
            </div>
        </div>

    )

}
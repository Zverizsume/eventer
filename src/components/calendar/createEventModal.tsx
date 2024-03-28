'use client'

import { createEvent } from "@/actions";
import { Autocomplete, AutocompleteItem, Avatar, Button, Chip, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, SelectedItems, Selection, Textarea, useDisclosure } from "@nextui-org/react";
import dayjs from "dayjs";
import { ChangeEvent, Key, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import countriesJSON from '@/utils/countries.json'
import { v4 as uuidv4 } from 'uuid'
import axios, { AxiosResponse } from "axios";
import GoogleMapObject from "../googleMap";
import RichTextEditor from "../richTextEditor";

const api_key = '65e08b0dd9937343511849zsm38e938'

interface CountriesDataObject {

    name: string,
    iso2: string

}

type Category = {

    title: string

}

export default function CreateEventModal({ isOpen, onOpen, onClose, selectedStartDate, selectedEndDate, categories } : { isOpen : boolean, onOpen : () => void, onClose : () => void, selectedStartDate : string, selectedEndDate : string, categories : { title: string }[] }) {

    const { onClose : onMapModalClose, onOpen : onMapModalOpen, isOpen : isMapModalOpen } = useDisclosure()

    const [ formState, action ] = useFormState(createEvent, {
        errors: {}
    })

    const countriesArray = countriesJSON as CountriesDataObject[]

    const countries = [...new Set(countriesArray.map(item => item.name))]

    const [ eventType, setEventType ] = useState<string[]>([])
    const [ startDate, setStartDate ] = useState(selectedStartDate)
    const [ endDate, setEndDate ] = useState(selectedEndDate)
    const [ startTime, setStartTime ] = useState('')
    const [ duration, setDuration ] = useState('')
    const [ endTime, setEndTime ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ latLngString, setLatLngString ] = useState('')
    const [ latLng, setLatLng ] = useState<google.maps.LatLngLiteral | null>(null)
    const [ locationString, setLocationString ] = useState('')
    const [ country, setCountry ] = useState<string | null>(null)

    const [ isButtonLoading, setIsButtonLoading ] = useState(false)

    const [ settingMapLocation, setSettingMapLocation ] = useState(false)

    const [value, setValue] = useState<Selection>(new Set([]));

    const handleCoutriesSelectionChange = (key : Key) => {

        key === null ? setCountry(null) : setCountry(key.toString())

    }

    useEffect(() =>{

        setStartDate(selectedStartDate)
        setEndDate(selectedEndDate)

    },[selectedEndDate, selectedStartDate])

    const handleOpenMap = ( ) => {

        setSettingMapLocation(true)
        onMapModalOpen()

    }

    const reverseGeocoding = async (lng : number, lat : number): Promise<AxiosResponse<any, any> | null> => {

        let data = null

        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`) 
        .then( res => {

            data = res

        })
        .catch( err => {

            console.log(`Error while doing reverse Geocoding from google: ${err.message}`)

        })

        return data

    }

    const handleSetEventType = ( e : ChangeEvent<HTMLSelectElement>) => {

        setEventType([e.target.value])

    }

    const handleMapModalClose = async () => {

        // console.log('Map modal is closing')

        if( latLng ) {

            // console.log('Selected Lat: ', latLng.lat)
            // console.log('Selected Lng: ', latLng.lng)

            const llString = latLng.lat.toString() + ', ' + latLng.lng.toString()

            console.log('Lat Lng as string: ', llString)

            setLatLngString(llString)

            const data = await reverseGeocoding(latLng?.lng, latLng?.lat)

            console.log('ReverseGeocoding data: ', data)

            if( data )

                if( data.data.results.length )

                    setLocationString(data.data.results[0].formatted_address)

                else {

                    const index = data.data.plus_code.compound_code.indexOf(' ')
                    const locString = data.data.plus_code.compound_code.substring(index + 1)
                    setLocationString(locString)
                }

            onMapModalClose()

        }

        onMapModalClose()

    }

    const handleFormSubmit = () => {

        setIsButtonLoading(true)

    }

    return(

        <>
            <Modal size="5xl" backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>
                        Create new Event
                    </ModalHeader>
                    <ModalBody>

                        <form onSubmit={handleFormSubmit} action={action} className="flex flex-col gap-3">
                        
                            <Select
                                name={'type'}
                                label="Type"
                                placeholder="Select event type"
                                selectedKeys={eventType}
                                onChange={handleSetEventType}
                                isRequired
                            >
                                <SelectItem
                                    key={'public'}
                                >
                                    Public
                                </SelectItem>
                                <SelectItem
                                    key={'private'}
                                >
                                    Private
                                </SelectItem>
                                <SelectItem
                                    key={'invite_only'}
                                >
                                    Invite only
                                </SelectItem>
                            </Select>

                            <Input type="text" name={'title'} label='Title' value={title} onValueChange={setTitle} placeholder={'Enter title'} isRequired isClearable/>
                            <div className="flex flex-row gap-3">
                                <Input type="date" name={'startDate'} label='Start date' value={startDate} onValueChange={ setStartDate } isRequired />
                                <Input type="date" name={'endDate'} label='End date' value={endDate} onValueChange={setEndDate} isRequired/>
                            </div>
                            <div className="flex flex-row gap-3">
                                <Input type="time" name={'startTime'} label='Start time' value={startTime} onValueChange={ setStartTime } placeholder={'Select start time'} isRequired/>
                                <Input type="time" name={'duration'} label='Duration' value={duration} onValueChange={ setDuration } placeholder={'Select duration'} />
                                <Input type="time" name={'endTime'} label='End time' value={endTime} onValueChange={setEndTime} placeholder={'Select end time'} />
                            </div>
                            <Textarea name={'description'} label={'Description'} placeholder={'Enter some description'} isRequired />
                            <div className="flex flex-row gap-3">
                            <Autocomplete
                                label="Country"
                                placeholder="Search country"
                                className="max-w-xs"
                                defaultItems={countries}
                                onSelectionChange={handleCoutriesSelectionChange}
                                selectedKey={country}
                                onKeyDown={(e:any) => e.continuePropagation()}
                                allowsCustomValue={true}
                                name={'country'}
                                isRequired

                            >
                                {
                                    countries.map( c => {

                                        return(

                                            <AutocompleteItem
                                                key={c}
                                            >
                                                {c}
                                            </AutocompleteItem>

                                        )

                                    })
                                }
                            </Autocomplete>

                            <Input hidden className="hidden" type='text' name={'latLng'} value={latLngString} />

                            <Input
                                isReadOnly
                                type="text"
                                label="Location"
                                name={'locationString'}
                                className="max-w-xs"
                                value={locationString}
                                endContent={
                                    <Button
                                        onPress={handleOpenMap}
                                    >
                                        Map
                                    </Button>
                                }
                                isRequired
                            />

                            </div>

                            <Select
                                label="Categories"
                                name='categories'
                                selectionMode="multiple"
                                placeholder="Select categories"
                                selectedKeys={value}
                                onSelectionChange={setValue}
                                renderValue={(items : SelectedItems<Category>) => {
                                    return (
                                      <div className="flex flex-wrap gap-2 py-4">
                                        {items.map((cat) => (
                                          <Chip key={cat.key} isCloseable>{cat.textValue}</Chip>
                                        ))}
                                      </div>
                                    );
                                }}
                                isRequired
                                className={'h-auto'}
                            >
                                {
                                    
                                    categories.map(cat => {

                                            return(

                                                <SelectItem key={cat.title} textValue={cat.title}>
                                                    {cat.title}
                                                </SelectItem>

                                            )

                                    })
                                } 
                            </Select>

                            {/* <RichTextEditor /> */}

                            <div className="flex flex-row gap-2 px-6 py-4 justify-end">
                                <Button color="default" variant="light" onPress={onClose}>
                                    Discard
                                </Button>
                                <Button color="success" type="submit" isLoading={isButtonLoading}>
                                    Create
                                </Button>
                            </div>

                        </form>



                    </ModalBody>

                </ModalContent>

            </Modal>

            <Modal size="full" isOpen={isMapModalOpen} onClose={handleMapModalClose}>
                <ModalContent>
                    <ModalBody className="p-0">
                        {
                            settingMapLocation ? 

                                <div>
                                    <GoogleMapObject markerLatLng={latLng} setMarkerLatLng={setLatLng} />
                                </div>

                            : null
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>

    )

}
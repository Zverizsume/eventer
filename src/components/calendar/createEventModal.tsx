'use client'

import { createEvent } from "@/actions";
import { Autocomplete, AutocompleteItem, Button, Chip, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, SelectedItems, Selection, Textarea, useDisclosure } from "@nextui-org/react";
// import dayjs from "dayjs";
import { ChangeEvent, Key, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import countriesJSON from '@/utils/countries.json'
// import { v4 as uuidv4 } from 'uuid'
import axios, { AxiosResponse } from "axios";
import GoogleMapObject from "../googleMap";
import dayjs from "dayjs";
import CoverImage from "./coverImage";
// import RichTextEditor from "../richTextEditor";

// const api_key = '65e08b0dd9937343511849zsm38e938'

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

    const [ event, setEvent ] = useState({

        type: [] as string[],
        title: '',
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        startTime: '',
        duration: '',
        endTime: '',
        eventFrequency: ['no_repeat'] as string[],
        latLngString: '',
        // latLng: null as google.maps.LatLngLiteral | null,
        locationString: '',
        country: null as string | null,
        // coverImage: '' as any
    })

    const [ selectedCategories, setSelectedCategories ] = useState<Selection>(new Set([]))
    const [ latLng, setLatLng ] = useState<google.maps.LatLngLiteral | null>(null)

    const [ coverImage, setCoverImage ] = useState<File | null>(null)
    const [ coverImageUrl, setCoverImageUrl ] = useState<string | null>(null)
    // const [ startDate, setStartDate ] = useState(selectedStartDate)
    // const [ endDate, setEndDate ] = useState(selectedEndDate)
    // const [ startTime, setStartTime ] = useState('')
    // const [ duration, setDuration ] = useState('')
    // const [ endTime, setEndTime ] = useState('')
    // const [ title, setTitle ] = useState('')
    // const [ latLngString, setLatLngString ] = useState('')
    // const [ latLng, setLatLng ] = useState<google.maps.LatLngLiteral | null>(null)
    // const [ locationString, setLocationString ] = useState('')
    // const [ country, setCountry ] = useState<string | null>(null)
    // const [ selectedCategories, setSelectedCategories ] = useState<Selection>(new Set([]));

    const [ isButtonLoading, setIsButtonLoading ] = useState(false)

    const [ settingMapLocation, setSettingMapLocation ] = useState(false)

    const handleCoutriesSelectionChange = (key : Key) => {

        key === null ? setEvent({ ...event, country: null}) : setEvent({...event, country: key.toString()})

    }

    useEffect(() =>{

        setEvent({...event, startDate: selectedStartDate, endDate: selectedEndDate})

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

    // const handleFileChange = ( e : ChangeEvent<HTMLInputElement>) => {

    //     console.log(e.target.files)

    //     if( e.target.files && e.target.files.length > 0 ) {

    //         console.log(e.target.files[0].name)

    //         setCoverImage(e.target.files[0])
    //         setCoverImageUrl(URL.createObjectURL(e.target.files[0]))

    //     }

    // }

    // const handleRemoveImage = () => {

    //     setCoverImage(null)
    //     setCoverImageUrl(null)

    // }

    const handleMapModalClose = async () => {

        if( latLng ) {

            const llString = latLng.lat.toString() + ', ' + latLng.lng.toString()

            // console.log('Lat Lng as string: ', llString)

            const data = await reverseGeocoding(latLng?.lng, latLng?.lat)

            // console.log('ReverseGeocoding data: ', data)

            if( data )

                if( data.data.results.length )

                    setEvent({...event,latLngString: llString, locationString: data.data.results[0].formatted_address})

                else {

                    const index = data.data.plus_code.compound_code.indexOf(' ')
                    const locString = data.data.plus_code.compound_code.substring(index + 1)
                    setEvent({...event,latLngString: llString, locationString: locString})
                }

            onMapModalClose()

        }

        onMapModalClose()

    }

    const handleFormChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {

        console.log("e: ", e.target.value)

        if( e.type )

            setEvent({
                ...event,
                [e.target.name]: e.target.value
            })
        
        else 

            setEvent({
                ...event,
                [e.target.name]: [e.target.value]
            })

    }

    const handleFormSubmit = () => {

        setIsButtonLoading(true)

    }

    // const handleUploadImageButtonPressed = () => {

    //     coverImageInputRef.current?.click()

    // }

    const coverImageInputRef = useRef<HTMLInputElement>(null)

    // useEffect(() => {

    //     console.log('Image changed: ', coverImage)

    // },[coverImage])

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
                                selectedKeys={event.type}
                                onChange={handleFormChange}
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

                            <Input type="text" name={'title'} label='Title' value={event.title} onChange={handleFormChange} placeholder={'Enter title'} isRequired isClearable/>
                            <div className="flex flex-row gap-3">
                                <Input type="date" name={'startDate'} label='Start date' value={event.startDate} onChange={handleFormChange} isRequired />
                                <Input type="date" name={'endDate'} label='End date' value={event.endDate} onChange={handleFormChange} isRequired/>
                            </div>
                            <div className="flex flex-row gap-3">
                                <Input type="time" name={'startTime'} label='Start time' value={event.startTime} onChange={handleFormChange} placeholder={'Select start time'} isRequired/>
                                <Input type="time" name={'duration'} label='Duration' value={event.duration} onChange={handleFormChange} placeholder={'Select duration'} />
                                <Input type="time" name={'endTime'} label='End time' value={event.endTime} onChange={handleFormChange} placeholder={'Select end time'} />
                            </div>
                            <Textarea name={'description'} label={'Description'} placeholder={'Enter some description'} isRequired />
                            <Select
                                name={'eventFrequency'}
                                label="Event frequency"
                                placeholder="Select event frequency"
                                selectedKeys={event.eventFrequency}
                                onChange={handleFormChange}
                                isRequired
                            >
                                <SelectItem
                                    key={'no_repeat'}
                                >
                                    Does not repeat
                                </SelectItem>
                                <SelectItem
                                    key={'weekly'}
                                >
                                    {`Weekly on ${dayjs(event.startDate).format('dddd')}`}
                                </SelectItem>
                                <SelectItem
                                    key={'weekly_other'}
                                >
                                    {`Every other ${dayjs(event.startDate).format('dddd')}`}
                                </SelectItem>
                                <SelectItem
                                    key={'monthly'}
                                >
                                    {`Monthly on the first ${dayjs(event.startDate).format('dddd')}`}
                                </SelectItem>
                                <SelectItem
                                    key={'annually'}
                                >
                                    {`Annualy on the ${dayjs(event.startDate).format('MMM DD')}`}
                                </SelectItem>
                                <SelectItem
                                    key={'week_days'}
                                >
                                    {`Every weekday (Mon to Fri)`}
                                </SelectItem>
                            </Select>
                            <div className="flex flex-row gap-3">
                                <Autocomplete
                                    label="Country"
                                    placeholder="Search country"
                                    className="max-w-xs"
                                    defaultItems={countries}
                                    onSelectionChange={handleCoutriesSelectionChange}
                                    selectedKey={event.country}
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

                                <Input hidden className="hidden" type='text' name={'latLng'} value={event.latLngString} />

                                <Input
                                    isReadOnly
                                    type="text"
                                    label="Location"
                                    name={'locationString'}
                                    className="max-w-xs"
                                    value={event.locationString}
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
                                selectedKeys={selectedCategories}
                                onSelectionChange={setSelectedCategories}
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

                            <CoverImage coverImage={coverImage} setCoverImage={setCoverImage} coverImageInputRef={coverImageInputRef} coverImageUrl={coverImageUrl} setCoverImageUrl={setCoverImageUrl} />

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
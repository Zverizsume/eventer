'use server'

import { createClient } from "@/utils/supabase/server"
import dayjs from "dayjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { unknown, z } from 'zod'

const minEventLength = 1 // in hours

const createEventSchema = z.object({

    title: z.string().min(3),
    startDatetime: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date",
    }).min( new Date(), { message: 'Select valid date' }),
    endDateTime: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date",
    }).min( new Date(Date.now() + minEventLength*60*60*1000), { message: 'Select valid date' }),
    location: z.string().min(2),
    category: z.string().min(2)

})

type EventObject = {

    id?: string,
    type: string,
    title: string,
    startDate: string,
    endDate: string,
    startTime: string,
    duration: string | null,
    endTime: string | null,
    country: string,
    latLng: string,
    locationString: string,
    categories: string[],
    description: string,
    user: string,
    frequency: string,
    coverImageUrl: string

}

interface CreateEventFormState {

    errors: {

        type?: string[],
        title?: string[]
        startDate?: string[],
        endDate?: string[],
        startTime?: string[],
        duration?: string[],
        endTime?: string[],
        country?: string[],
        latLng?: string[],
        locationString?: string[],
        categories?: string[],
        description?: string[],
        _form?: string[]

    }

}

//: Promise<CreateEventFormState>

const STORAGE_PATH = process.env.NEXT_PUBLIC_STORAGE_PATH
const BUCKET_NAME = 'event_cover_images/'

export async function createEvent( formState : CreateEventFormState, formData : FormData ): Promise<CreateEventFormState> {

    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()

    if( !data.user || error ) {

        return {

            errors: {

                _form: ['You must be logged in to do this!']

            }

        }

    }

    const type = formData.get('type') as string
    const title = formData.get('title') as string
    const startDate = formData.get('startDate') as string
    const endDate = formData.get('endDate') as string
    const startTime = formData.get('startTime') as string
    const duration = formData.get('duration') as string | null
    const endTime = formData.get('endTime') as string | null
    const country = formData.get('country') as string
    const latLng = formData.get('latLng') as string
    const locationString = formData.get('locationString') as string
    const categories = formData.getAll('categories') as string[]
    const description = formData.get('description') as string
    const eventFrequency = formData.get('eventFrequency') as string
    const coverImageFile = formData.get('coverImage') as File

    let newEvent : EventObject

    newEvent = {

        type: type ? type : '',
        title: title ? title : '',
        startDate: startDate ? startDate : '',
        endDate: endDate ? endDate : '',
        startTime: startTime ? startTime : '',
        duration: duration === '' ? null : duration,
        endTime: endTime === '' ? null : endTime,
        country: country ? country : '',
        latLng: latLng ? latLng : '',
        locationString: locationString ? locationString : '',
        categories: categories ? categories : [],
        description: description ? description : '',
        user: data.user.id,
        frequency: eventFrequency,
        coverImageUrl: ''

    }

    if( coverImageFile.size > 0 ) {

        const { data: uploadImageData, error: uploadImageError } = await supabase.storage.from('event_cover_images').upload(coverImageFile.name, coverImageFile)

        if( uploadImageError )
        {
            return {

                errors: {
    
                    _form: [`Error uploading image: ${uploadImageError.message}`]
    
                }
    
            }
        }

        newEvent.coverImageUrl = STORAGE_PATH + BUCKET_NAME + uploadImageData.path

    }

    console.log('New Event: ', newEvent)

    let event : EventObject
    
    const { data : insertEventData, error : insertEventError, status, statusText } = await supabase.from('event').insert(newEvent).select()

    if( insertEventError )
    {

        return{
            errors: {

                _form: [insertEventError.message]

            }
        }

    }

    event = insertEventData[0]

    revalidatePath('/events')
    redirect(`/events/${event.id}`)

}
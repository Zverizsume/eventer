export enum attendanceStatus {

    going = 'going',
    rejected = 'rejected',
    pending = 'pending'

}

export enum eventTypes {

    public = 'public',
    private = 'private',
    invite_only = 'invite_only'

}

export type EventTypeColors = {

    public: string,
    private: string,
    invite_only: string

}

export type EventObject = {

    id: string,
    type: eventTypes,
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
    frequency: string,
    coverImageUrl: string,
    user: string

}

export type SeoMetadata = {

    title: string,
    description: string,
    page_url: string,
    image_url: string

}

export type Notification = {

    id: string,
    user_id: string,
    trigger_user_id: string,
    content: string,
    link: string,
    created_at: string,
    read: boolean

}

export type Chat = {

    id?: string,
    sender_id: string,
    receiver_id: string,
    message: string,
    created_at?: string

}
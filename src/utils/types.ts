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
    user: string

}

export type SeoMetadata = {

    title: string,
    description: string,
    page_url: string,
    image_url: string

}
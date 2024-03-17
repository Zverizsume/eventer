'use client'

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import Marker from './googleMapsMarker';
import { Image } from '@nextui-org/react';

export default function GoogleMapObject({ markerLatLng, setMarkerLatLng } : { markerLatLng : google.maps.LatLngLiteral | null, setMarkerLatLng : Dispatch<SetStateAction<google.maps.LatLngLiteral | null>> }) {

    const [ centerLat, setCenterLat ] = useState<number>(43.60977778)
    const [ centerLng, setCenterLng ] = useState<number>(20.88394444)

    const [ mapRef, setMapRef ] = useState< google.maps.Map | null >(null)

    useEffect(() => {

        navigator.geolocation.getCurrentPosition( async (position) => {

            let lat = position.coords.latitude;
            let long = position.coords.longitude;
    
            setCenterLat(lat)
            setCenterLng(long)
    
        })

    },[])

    const libraries = useMemo(() => ['marker'], []);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    })

    const mapCenter = useMemo<google.maps.LatLngLiteral>(
        () => ({ lat: centerLat, lng: centerLng }),
        []
    )

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
          disableDefaultUI: true,
          clickableIcons: true,
          scrollwheel: true,
          mapId: '66fdb23e7411c22d'
        }),
        []
    )

    if (!isLoaded) {
        return <p>Loading...</p>
    }
    
    const handleMapLoad = ( e : google.maps.Map ) => {

        setMapRef(e)

    }

    const handleMapClick = ( e : google.maps.MapMouseEvent ) => {

        const lat = e.latLng?.lat()
        const lng = e.latLng?.lng()

        // console.log('Lat & lng', `${lat}   ${lng}`)

        if( lat && lng )
        {

            const latLng = {

                lat: lat,
                lng: lng

            }

            setMarkerLatLng(latLng)

        }

    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <GoogleMap
                options={mapOptions}
                zoom={13}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '100vw', height: '100vh' }}
                onLoad={handleMapLoad}
                onClick={handleMapClick}
            />
            {
                markerLatLng && mapRef ? 

                    <Marker
                        position={markerLatLng}
                        map={mapRef}
                        // icon="https://picsum.photos/64"
                    >
                        <Image src={'/icons/locationPin.png'} height={'40px'} width={'40px'}/>
                    </Marker>

                : null
            }
        </div>
    )
}
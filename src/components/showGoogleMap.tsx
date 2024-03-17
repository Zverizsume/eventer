'use client'

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import Marker from './googleMapsMarker';
import { Image } from '@nextui-org/react';
import { v4 as uuidv4 } from 'uuid'; 

export default function GoogleMapShow({ markers } : { markers : google.maps.LatLngLiteral[] | [] }) {

    const [ centerLat, setCenterLat ] = useState<number>(43.60977778)
    const [ centerLng, setCenterLng ] = useState<number>(20.88394444)

    const [ mapRef, setMapRef ] = useState< google.maps.Map | null >(null)

    useEffect(() => {

        if( markers.length > 0 ) {

            setCenterLat(markers[0].lat)
            setCenterLng(markers[0].lng)

        }

        else

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
        [centerLat,centerLng]
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

    return (
        <div className='flex justify-center items-center h-full'>
            <GoogleMap
                options={mapOptions}
                zoom={14}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                onLoad={handleMapLoad}
            />
            {

                mapRef ? markers.map( marker => {

                    return(

                        <Marker
                            key={uuidv4()}
                            position={marker}
                            map={mapRef}
                            // icon="https://picsum.photos/64"
                        >
                            <Image src={'/icons/locationPin.png'} height={'40px'} width={'40px'}/>
                        </Marker>

                        )

                })

                : null

            }
        </div>
    )
}
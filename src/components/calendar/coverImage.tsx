import { Button, Image } from "@nextui-org/react"
import { ChangeEvent, Dispatch, RefObject, SetStateAction, useRef } from "react"

export default function CoverImage({coverImage, setCoverImage, coverImageUrl, setCoverImageUrl, coverImageInputRef} : { coverImage: File | null, setCoverImage: Dispatch<SetStateAction<File | null>>, coverImageUrl: string | null, setCoverImageUrl: Dispatch<SetStateAction<string | null>>, coverImageInputRef: RefObject<HTMLInputElement>  }) {

    const imageRef = useRef<HTMLImageElement>(null)

    const handleFileChange = ( e : ChangeEvent<HTMLInputElement>) => {

        console.log(e.target.files)

        if( e.target.files && e.target.files.length > 0 ) {

            console.log(e.target.files[0].name)

            setCoverImage(e.target.files[0])
            setCoverImageUrl(URL.createObjectURL(e.target.files[0]))

        }

    }

    const handleRemoveImage = () => {

        coverImageInputRef.current?.value === null

        setCoverImage(null)
        setCoverImageUrl(null)

    }

    const handleUploadImageButtonPressed = () => {

        coverImageInputRef.current?.click()

    }

    const handleImageLoad = () => {

        if(imageRef.current) {

        const imageWidth = imageRef.current.width
        const imageHeight = imageWidth / (3/1)
        
        imageRef.current.style.width = imageWidth + 'px'
        imageRef.current.style.height = imageHeight + 'px'
        }

    }

    return(

        <div>

            <input ref={coverImageInputRef} className="hidden" accept="image/*" name={'coverImage'} type={'file'} onChange={handleFileChange} />

            {
                coverImage && coverImageUrl ? 

                <div className="flex flex-col gap-2 justify-center items-start">
                    <Image ref={imageRef} src={coverImageUrl} onLoad={handleImageLoad} className="object-cover"  />
                    <Button onPress={handleRemoveImage}>Remove image</Button>
                </div>

                :
                    <div className="flex flex-col gap-1 justify-start items-start">
                        <Button
                            onPress={handleUploadImageButtonPressed}
                        >
                            Upload cover image
                        </Button>
                        <p className="text-foreground-500">Prefered image aspect ratio 3:1</p>
                    </div>

            }

        </div>

    )

}
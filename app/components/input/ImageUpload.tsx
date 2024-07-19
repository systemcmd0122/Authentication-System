'use client'

import { useCallback } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { TbPhotoPlus } from "react-icons/tb"
import Image from 'next/image'

declare global {
    var cloudinary: any
}

type ImageUploadProps = {
    onChange: (value: string) => void
    value: string
}

type CloudinaryUploadWidgetInfo = {
    secure_url: string
}

type CloudinaryUploadWidgetResults = {
    info?: CloudinaryUploadWidgetInfo | string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback(
        (result: CloudinaryUploadWidgetResults) => {
            if (result.info && typeof result.info !== 'string' && result.info.secure_url) {
                console.log(result.info.secure_url)
                onChange(result.info.secure_url)
            }
        },
        [onChange]
    )

    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string}
            options={{
                maxFiles: 1,
                sources: ['local'],
            }}
        >
            {({ open }) => (
                <div
                    onClick={() => open?.()}
                    className="relative flex h-80 cursor-pointer flex-col items-center justify-center"
                >
                    <TbPhotoPlus size={50} />
                    <div className="text-sm font-semibold">画像をアップロード</div>
                    {value && (
                        <div className="absolute inset-0 h-full w-full">
                            <Image src={value} className="object-cover" alt="image" fill />
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default ImageUpload

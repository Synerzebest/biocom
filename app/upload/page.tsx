"use client"

import React, { ChangeEvent, useState } from "react";
import { storage } from "../../utils/firebase";
import { ref, uploadBytesResumable, UploadTaskSnapshot, getDownloadURL } from "@firebase/storage";


const ImageUpload: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange= (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if (image) {
            const storageRef = ref(storage, `images/${image.name}`);

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot: UploadTaskSnapshot) => {
                    const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes * 100);

                    console.log(`Uploading (${progress}%)`)
                }, error => {
                    console.error(error.message)
                }, async () => {
                    console.log('Upload completed')

                    try {
                        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('Download URL:', imageUrl);
                        
                        // Call API to save location with imageUrl
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                    }
                })
        }
    }

    return(
        <div>
            <input type="file" onChange={handleImageChange}></input>
            <button onClick={handleUpload} className="p-4 bg-green-500 text-white text-lg font-bold rounded-lg">Upload</button>
        </div>
    )
}

export default ImageUpload;
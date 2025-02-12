"use client"
import { BackgroundLines } from '@/components/ui/background-lines';
import { FileUpload } from '@/components/ui/file-upload';
import FileCard from '@/components/ui/fileCard';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';


const RoomIdPage = () => {

    const roomId = useParams<{roomId:string}>().roomId;
    const [files, setFiles] = useState<File []>([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
        
    useEffect(() => {
        async function fetchFiles() {
            try {
                const res = await fetch(`/api/getFiles?folder=${roomId}`);
                const data = await res.json();
                if (data.files) setUploadedFiles(data.files);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        }
        fetchFiles();
    }, [uploadedFiles]);

    const handleFileUpload = async (files: File[]) => {
        console.log("handle file triggered")
        setFiles(prevFiles => [...prevFiles, ...files]);
        console.log("this is file", files[0]);
        let i = 0;
        const formData = new FormData();
        formData.append('file', files[i])
        formData.append('roomId', roomId)

        try {
            const response = await axios.post('/api/upload', formData);
            const { uploadUrl, fileKey } = response.data;
            if (!uploadUrl) throw new Error("Failed to get upload URL");

            // await axios.put(uploadUrl, formData, {
            //     headers: { "Content-Type": "pdf" },
            //     onUploadProgress: (progressEvent) => {
            //       if (progressEvent.total) {
            //         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //         setUploadProgress(percentCompleted);
            //       }
            //     },
            //   });

            console.log('File uploaded successfully')
            const res = await fetch(`/api/getFiles?folder=${roomId}`);
                const data = await res.json();
                if (data.files) setUploadedFiles(data.files);
            i++;
        } catch (error) {
            i++;
            console.error('File upload failed')
        }
        
        // const url = await axios.get(`api/getFiles/${roomId}/${files[i].name}`)
        // const fileUrl = url.data;
        // console.log(fileUrl);
        // setDownloadUrl((prevUrl) => [...prevUrl, ...fileUrl]);
        // console.log("uploaded files", uploadedFiles);
        
      };

    return (
        <BackgroundLines className='flex h-screen items-center justify-between px-10 w-full'>
            <div className='mr-auto pl-10'>
                <FileUpload onChange={handleFileUpload} />
            </div>
            <div className='mr-auto'>
                <h1 className='pb-4 font-sans font-bold'>Room ID: {roomId}</h1>
                {uploadedFiles.map((file, index) => (
                        <div className='pb-4' key={index}><FileCard file={uploadedFiles[index]}/></div>
                    ))}
            </div>
        </BackgroundLines>
    );
}

export default RoomIdPage;



//we are not getting any url because the fileName is wrong because in fileName i also added the timestamp so the fileName changed
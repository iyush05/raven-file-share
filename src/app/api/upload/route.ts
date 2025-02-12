import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    forcePathStyle: true,
});

export async function POST(req: NextRequest) {
    try{
        const formData = await req.formData();
        const file = formData.get("file") as File || null;
        const roomId = formData.get("roomId") as string;
        console.log("roomId from upload", roomId);

        console.log("file size", file.size)
        console.log("file type", file.type)
        if(!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // const fileName = `${Date.now()}-${file.name}`;
        const fileName = file.name;
        const fileKey = `${roomId}/${fileName}`
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: buffer,
            ContentType: file.type,
        })

        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 600})   //expires in 10 minutes
        await s3Client.send(command);
        // console.log("url for upload", uploadUrl)

        //adding file in db
        // const fileData = await prisma.file.create({
        //     data: {
        //             roomId: roomId,
        //             fileName: fileName,
        //             fileSize: file.size,
        //             fileType: file.type,
        //     }
        // })
       
        return NextResponse.json({ uploadUrl, fileKey }, { status: 200 })
    }  catch (error) {
        return NextResponse.json(
            { error: "Failed to upload file", details: (error as Error).message },
            { status: 500 }
        );
    }

}
import { S3Client, ListObjectsV2Command, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

interface S3File {
  fileName: string | undefined;
  fileKey: string | undefined;
  fileSize: number | undefined;
  fileType: string | undefined;
  lastModified: Date | undefined;
  presignedUrl: string | undefined;
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const folderPath = searchParams.get("folder"); // e.g., "room123/"

        if (!folderPath) {
            return NextResponse.json({ error: "Folder path is required" }, { status: 400 });
        }

        console.log("Fetching files from:", folderPath);

        // Step 1: List all objects in the folder
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Prefix: folderPath, // List all files under this folder
        });

        const { Contents } = await s3Client.send(listCommand);

        if (!Contents || Contents.length === 0) {
            return NextResponse.json({ files: [], message: "No files found" });
        }

        // Step 2: Generate pre-signed URLs for each file
        const files: S3File[] = await Promise.all(
            Contents.map(async (file) => {

                const headCommand = new HeadObjectCommand({
                  Bucket: process.env.AWS_BUCKET_NAME!,
                  Key: file.Key!,
              });

              const headResponse = await s3Client.send(headCommand);
              const contentType = headResponse.ContentType || "unknown";


                const getObjectCommand = new GetObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Key: file.Key!,
                });

                const presignedUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 600 }); // URL expires in 10 min

                return {
                    fileName: file.Key?.split("/").pop(), // Extract only file name
                    fileKey: file.Key,
                    fileSize: file.Size,
                    lastModified: file.LastModified,
                    fileType: contentType,
                    presignedUrl,
                };
            })
        );

        return NextResponse.json({ files });
    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Failed to get files", details: (error as Error).message }, { status: 500 });
    }
}

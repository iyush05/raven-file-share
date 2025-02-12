import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try{ 
        const formData = await req.formData();
        const file = formData.get("file") as File || null;
        const roomId = formData.get("roomId") as string;

        const fileDetails = await prisma.file.create({
            data: {
                roomId: roomId,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
            }
        })
    } catch (error) {
        console.error("Failed to write file on DB", error)
    }
}
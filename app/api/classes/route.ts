

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// export async function POST(req:Request){
//     try{
//         const {userId} = auth();
//         const {title} = await req.json();
//         if(!userId){
//             return new NextResponse("Unauthorized",{status:401})
//         }
//         const course = await db.course.create({
//             data:{
//                 userId,
//                 title
//             }
//         })
//         return NextResponse.json(course)
//     }catch(error){
//         console.log("[COURSES]",error);
//         return new NextResponse("Internal Error",{status:500})
//     }
// } 

export async function GET(req:Request){
    try{
        const classes = await db.class.findMany({})
        console.log(classes)
        return NextResponse.json(classes)
    }catch(error){
        console.log("[GET_CLASSES]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}  

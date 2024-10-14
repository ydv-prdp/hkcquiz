import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{classId:string, subjectId:string, partId:string}}){
    try{
        const chapters = await db.chapter.findMany({
            where:{
                partId:params.partId
            },
            orderBy:{
                order:"asc"
            }
        })
        console.log(chapters)
        return NextResponse.json(chapters)
    }catch(error){
        console.log("[GET_PARTID]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}  

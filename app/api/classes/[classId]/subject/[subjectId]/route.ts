import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{classId:string, subjectId:string}}){
    try{
        const parts = await db.part.findMany({
            where:{
                subjectId:params.subjectId
            },
        })
        console.log(parts)
        return NextResponse.json(parts)
    }catch(error){
        console.log("[GET_SUBJECTID]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}  

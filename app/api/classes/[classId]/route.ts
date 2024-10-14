import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{classId:string}}){
    try{
        const subjects = await db.subject.findMany({
            where:{
                classId:params.classId
            }
        })
        console.log(subjects)
        return NextResponse.json(subjects)
    }catch(error){
        console.log("[GET_CLASSID]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}  

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{chapterId:string}}){
    try{
        const quizes = await db.quiz.findMany({
            where:{
                chapterId:params.chapterId
            }
        })
        console.log(quizes)
        return NextResponse.json(quizes)
    }catch(error){
        console.log("[GET_CLASSID]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}  

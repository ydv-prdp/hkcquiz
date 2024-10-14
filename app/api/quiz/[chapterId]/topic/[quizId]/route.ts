import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{chapterId:string, quizId:string}}){
    try{
        const questions = await db.question.findMany({
            where:{
                quizId:params.quizId
            },
            include:{
                options:true
            }
        })
        console.log(questions)
        return NextResponse.json(questions)
    }catch(error){
        console.log("[GET_CLASSID]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}  

'use client'
import { toast } from "@/hooks/use-toast";
import { Quiz } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuizComp from "./_components/quizcomp";



const ChapterIdQuiz = ({params}:{params:{chapterId:string}}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    async function getQuizes() {
        setLoading(true);
        try{
            const quizData = await axios.get(`/api/quiz/${params.chapterId}`);
            toast({
              variant:"success",
              title: "Success",
              description: "Event Category Updated",
            })  
           console.log(quizData)
           setQuizzes(quizData.data)
            router.refresh()
        }
        catch{
          toast({
            variant: "destructive",
            title: "Something Went Wrong",
            description: "There was a problem with your request.",
          })
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getQuizes()
    },[])
    const handleClick=(quizId:String)=>{
        router.push(`/quiz/${params.chapterId}/topic/${quizId}`)
    }
    if (loading) return <p>Loading...</p>
    if ( false) return <p>No Parts inside this class</p>
  return (
    <div className="flex p-6 gap-6">
        {quizzes.map((quiz)=>(
          <div key={quiz.id} className="border-red-500 border p-6 cursor-pointer" onClick={()=>handleClick(quiz.id)}>
            {quiz.name}
          </div>
        ))}
    </div>
  )
}

export default ChapterIdQuiz
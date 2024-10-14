'use client'

import { toast } from "@/hooks/use-toast";
import { Option, Question } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuizComp from "../../_components/quizcomp";
interface TopicQuizPageProps{
    questions:Question[] & {
        options:Option[]
    }
}

const TopicQuizPage = ({params}:{params:{chapterId:string, quizId:string}}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<TopicQuizPageProps[]>([])
    async function getQuestions() {
        setLoading(true);
        try{
            const quizData = await axios.get(`/api/quiz/${params.chapterId}/topic/${params.quizId}`);
            toast({
              variant:"success",
              title: "Success",
              description: "Event Category Updated",
            })  
           console.log(quizData)
           setQuestions(quizData.data)
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
      getQuestions()
    },[])
 
    if (loading) return <p>Loading...</p>
    if ( false) return <p>No Parts inside this class</p>
  return (
    <div>
      <QuizComp
        questions={questions}
      />
    </div>
  )
}

export default TopicQuizPage
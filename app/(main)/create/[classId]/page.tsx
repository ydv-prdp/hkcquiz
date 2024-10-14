'use client'
import { toast } from "@/hooks/use-toast";
import { db } from "@/lib/db"
import { Subject } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const ClassId = ({params}:{params:{classId:string}}) => {
    const router = useRouter();
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [loading, setLoading] = useState(false);
    
    async function getSubjects() {
        setLoading(true);
        try{
            const subjectData = await axios.get(`/api/classes/${params.classId}`);
            toast({
              variant:"success",
              title: "Success",
              description: "Event Category Updated",
            })  
            setSubjects(subjectData.data)
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
        getSubjects()
    },[params.classId])
    if (loading) return <p>Loading...</p>
    if (subjects?.length === 0) return <p>No Subjects inside this class</p>
    const onClick=(subjectId:string)=>{
        router.push(`/create/${params.classId}/subject/${subjectId}`)
    }
  return (
  <div className="flex gap-5 p-10">
    {subjects.map((subject)=>(
        <div key={subject.id} className="border-red-300 border p-6  hover:opacity-35 cursor-pointer" onClick={()=>onClick(subject.id)}>
            {subject.name}
        </div>
    ))}
  </div>
  )
}

export default ClassId
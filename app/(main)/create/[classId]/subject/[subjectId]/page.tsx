'use client'
import { toast } from "@/hooks/use-toast";
import { Part } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectId = ({params}:{params:{classId:string, subjectId:string}}) => {
    const router = useRouter();
    const [parts, setParts] = useState<Part[]>([])
    const [loading, setLoading] = useState(false);
    async function getParts() {
        setLoading(true);
        try{
            const partsData = await axios.get(`/api/classes/${params.classId}/subject/${params.subjectId}`);
            toast({
              variant:"success",
              title: "Success",
              description: "Event Category Updated",
            })  
            setParts(partsData.data)
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
        getParts()
    },[params.classId])
    if (loading) return <p>Loading...</p>
    if (parts?.length === 0) return <p>No Parts inside this class</p>
    const onClick=(subjectId:string)=>{
        router.push(`/create/${params.classId}/subject/${subjectId}`)
    }
  return (
    <div className="flex gap-5 p-10">
    {parts.map((part)=>(
        <div key={part.id} className="border-red-300 border p-6  hover:opacity-35 cursor-pointer" onClick={()=>onClick(part.id)}>
            {part.name}
        </div>
    ))}
  </div>
  )
}

export default SubjectId
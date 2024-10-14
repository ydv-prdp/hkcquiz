"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/db"

import { Combobox } from "@/components/ui/combobox"
import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import { Chapter, Class, Part, Subject } from "@prisma/client"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  classId: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  subjectId: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  partId: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  chapterId: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
})

export default function CreateForm() {
    const [value, setValue] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            classId:"",
            subjectId:"",
            partId:"",
            chapterId:""
        },
      })
      const [data, setData] = useState<Class[]>([])
      const [isLoading, setLoading] = useState(true)
      const router = useRouter()
      const [subjects, setSubjects] = useState<Subject[]>([])
      const [classId, setClassId]=useState<string>('')
      const [partId, setPartId]=useState<string>('')
      const [subjectId, setSubjectId]=useState<string>('')
      const [parts, setParts] = useState<Part[]>([])
      const [chapters, setChapters] = useState<Chapter[]>([])

      useEffect(() => {
        fetch('/api/classes')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
      }, [])

      const options = data.map((category)=>({
        label:category.name,
        value:category.id
      }));
     
      function onSubmit(values: z.infer<typeof formSchema>) {
        router.push(`/quiz/${values.chapterId}`)
      }

    
    
      
    async function getSubjects(selectedValue: string) {
      setClassId(selectedValue)
      console.log("i m classid",selectedValue)
      console.log(`Selected framework: ${selectedValue}`);
      setLoading(true);
      try{
          const subjectData = await axios.get(`/api/classes/${selectedValue}`); 
          setSubjects(subjectData.data)
          // router.refresh()
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
  const subjectsOption = subjects.map((category)=>({
    label:category.name,
    value:category.id
  }));
  async function getParts(selectedValue:string) {
    setSubjectId(selectedValue)
    console.log(`Selected subject framework: ${selectedValue}`);
    setLoading(true);
    try{
        const partsData = await axios.get(`/api/classes/${classId}/subject/${selectedValue}`);
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
const partsOption = parts.map((category)=>({
  label:category.name,
  value:category.id
}));
async function getChapters(selectedValue:string) {
  setPartId(selectedValue)
  console.log("i m partid",selectedValue)

  setLoading(true);
  try{
      const chaptersData = await axios.get(`/api/classes/${classId}/subject/${subjectId}/part/${selectedValue}`); 
      setChapters(chaptersData.data)
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
const chaptersOption = chapters.map((category)=>({
  label:`${category.order}. ${category.name}`,
  value:category.id
}));
const handleFrameworkSelect = (selectedValue: string) => {
  console.log(`Selected chapter Id: ${selectedValue}`);
  // Add your logic here
};
const isFormValid = () => {
  return (
    form.getValues().classId !== "" &&
    form.getValues().subjectId !== "" &&
    form.getValues().partId !== "" &&
    form.getValues().chapterId !== "" &&
    !form.formState.errors.classId &&
    !form.formState.errors.subjectId &&
    !form.formState.errors.partId &&
    !form.formState.errors.chapterId
  );
};
const handleCreateQuiz = async () => {
  

    // You can also redirect to the newly created quiz page
    router.push(`/quiz/create/${form.getValues().chapterId}`);
 
}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8">
         <FormField
                    control={form.control}
                    name="classId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl >
                          <Combobox 
                            options={...options}
                            {...field}
                            onSelectingValue={getSubjects}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl >
                          <Combobox 
                            options={...subjectsOption}
                            {...field}
                            // onChange={getParts}
                            onSelectingValue={getParts}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="partId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl >
                          <Combobox 
                            options={...partsOption}
                            {...field}
                            // onChange={getChapters}
                            onSelectingValue={getChapters}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <FormField
                    control={form.control}
                    name="chapterId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl >
                          <Combobox 
                            options={...chaptersOption}
                            {...field}
                            // onChange={getChapters}
                            onSelectingValue={handleFrameworkSelect}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
       
        <Button type="submit"  disabled={!isFormValid()}>Submit</Button>
        <Button type="button" onClick={handleCreateQuiz}   disabled={!isFormValid()}>Create Quiz</Button>
        
      </form> 
    </Form>
  )
}

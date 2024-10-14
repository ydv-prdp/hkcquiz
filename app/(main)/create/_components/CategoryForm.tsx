"use client"

 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { Pencil } from "lucide-react"
import { useState } from "react"

import axios from "axios"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { Combobox } from "@/components/ui/combobox"
import { useToast } from "@/hooks/use-toast"
import { Class } from "@prisma/client"
interface CategoryFormProps{
    options:{label:string;value:string}[];
}
const formSchema = z.object({
    categoryId: z.string().min(1),
  })
const CategoryForm = ({options}:CategoryFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()
    const {toast} = useToast()
    // const selectedOption = options.find((option)=>option.value === initialData?.id)
    const toggleEdit = ()=>setIsEditing((current)=>!current)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {categoryId: ""}
      })
    const {isSubmitting, isValid} = form.formState;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            await axios.patch(`/api/event/`,values);
            toast({
              variant:"success",
              title: "Success",
              description: "Event Category Updated",
            })  
            toggleEdit()
            router.refresh()
        }
        catch{
          toast({
            variant: "destructive",
            title: "Something Went Wrong",
            description: "There was a problem with your request.",
          })
        }
        console.log(values)
    }
  return (
    <div className="mt-6 border bg-slate-800 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Event Category
            <Button  onClick={toggleEdit} variant={"ghost"}>
                {isEditing ? (
                    <>Cancel</>
                ) : 
                 (
                <>  <Pencil className="h-4 w-4 mr-2" />
                    Edit Category
                </>
                )}
                
            </Button>
        </div>
        {/* {!isEditing && (
            <p className={cn("text-sm mt-2", !initialData.name && "text-slate-500 italic")}>
                {selectedOption?.label|| "No category"}
            </p>
         )} */}
         {isEditing && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Combobox
                            options={...options}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-x-2"> 
                    <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                    >   
                        Save
                    </Button>
                  </div>
                </form>
              </Form>
         )}
    </div>
  )
}

export default CategoryForm
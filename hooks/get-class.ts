import { db } from "@/lib/db";

export default async function getClasses(){
const categories = await db.class.findMany({
    orderBy:{
        name:"asc"
    }
})
return categories
}
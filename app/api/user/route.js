import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
    // coming data from front-end
    const {email,name} = await req.json();

    // get user to know if already exist or not!
    const user = await db.select().from(usersTable).where(eq(usersTable.email,email))

    // if user doesn't exist, try to add / insert it
    if(!user?.length){
        // result that refer success message about adding new user, but with returning method the result be row about new user, so the result that container all users in user table
        const result = await db.insert(usersTable).values({
            name:name,
            email:email
        }).returning(usersTable);
        
        console.log('information about user: ',result);
        return NextResponse.json(result);
    }
    
    // If user exist also that be same FirstOrDefault() Idea in asp.net, where when return result that have multi email like ahmed@gmail.com, i want just first result, [ Suppose That, i know there is no multi same emails ]
    return NextResponse.json(user[0]);
}
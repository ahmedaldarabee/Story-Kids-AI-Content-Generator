import { db } from "@/config/db";
import { storyTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// to access data as a result from this method, you needed to do fetch to this path!
export async function GET() {
    const user = await currentUser();
    
    if(!user){
        return NextResponse.json( {error:"Unauthorized"},{status:401});
    }

    const stories = await db.select().from(storyTable).where(eq(storyTable.email,user.primaryEmailAddress?.emailAddress));

    return NextResponse.json(stories);
    
    // In General, the main target from this method NextResponse.json(....), as
    // convert return value from server into json [ array of object ] to facility show it in front-screen or client side

    // and in client-side to be sure return data be as json it will use res.json() just to ensure again return data that be as json.

}
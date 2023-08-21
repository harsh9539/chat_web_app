
import { NextApiRequest,NextApiResponse } from "next";
import { getServerSession } from "next-auth";


import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function handler(request:NextApiRequest,response:NextApiResponse){
    const session = await getServerSession(request,response,authOptions);

    if(!session?.user?.email){
        return response.status(401);
    }

    
}
import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";

import Githubprovider from "next-auth/providers/github"

import {prisma} from "@/lib/index"

if(process.env.CLIENT_ID || process.env.CLIENT_SECRET){
    throw new Error('Missing github client id or client secret')
}

// NextAuth returns object

export const {handlers:{GET,POST},auth}  =   NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        Githubprovider({
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET
        })
    ],
    //whenever user will click on sign-in this callback will be called.
    callbacks:{
        async  session({user, session}) {
            if(session && user){
                session.user.id = user.id
            }
            return session;
        }
    }
})
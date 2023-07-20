import PusherSever from "pusher"
import PusherClient from "pusher-js"



export const pusherServer = new PusherSever({
    appId:process.env.PUSHER_APP_ID!,
    key:process.env.NEXT_PUBLIC_PUSHER_APP_kEY!,
    secret:process.env.PUSHER_SECRET!,
    cluster:'ap2',
    useTLS:true
})

export const pusherClient =new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_kEY!,
    {
        cluster:'ap2'
    }
)
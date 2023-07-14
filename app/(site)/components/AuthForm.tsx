'use client';


import Button from '@/app/components/Button';
import Input from '@/app/components/Inputs/Input';
import React, { useCallback, useEffect, useState } from 'react'
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import {BsGithub,BsGoogle} from 'react-icons/bs';
import axios from 'axios';
import {toast} from "react-hot-toast"
import {signIn,useSession} from "next-auth/react"
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';   

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant,setVariant] = useState<Variant>('LOGIN');
    const [isLoading,setIsLoading] = useState<boolean>(false);


    useEffect(()=>{
        if(session?.status === 'authenticated'){
            console.log("authenticatd");
            router.push("/users");
        }
    },[session?.status,router])

    const toogleVariant = useCallback(()=>{
        if(variant === 'LOGIN'){
            setVariant("REGISTER");
        }
        else{
            setVariant('LOGIN');
        }
    },[variant])

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);

        if(variant === 'REGISTER'){
            // axios register
            axios.post("/api/register",data)
            .then(()=> signIn('credentials',data))
            .catch(()=>toast.error("something went wrong!"))
            .finally(()=>setIsLoading(false));
        }

        if(variant === 'LOGIN'){
            // nextauth signin
            signIn('credentials',{
                ...data,
                redirect:false
            })
            .then((callback)=>{
                if(callback?.error){
                    toast.error("Invalid credentails")
                }
                if(callback?.ok && !callback?.error){
                    toast.success("Logged in!");
                    router.push("/users")
                }
            })
            .finally(()=>setIsLoading(false));
        }
    }

    const socialAction = (action:string)=>{
        setIsLoading(true);

        // next auth social sign in
        signIn(action,{redirect:false})
        .then((callback)=>{
            if(callback?.error){
                toast.error("Invalid credentails");
            }
            if(callback?.ok && !callback?.error){
                toast.error("Logged in!");
            }
        })
        .finally(()=>setIsLoading(false));
    }


  return ( 
    <div className=' mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='
        bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
        '>
            <form action=""
            className='space-y-6'
            onSubmit={handleSubmit(onSubmit)}
            >                {
                    variant === 'REGISTER' && (
                        <Input 
                        id='name' 
                        label="Name" 
                        register={register}
                        type='text'
                        errors={errors}
                        disabled={isLoading}
                        />
                    )
                }
                <Input 
                    id='email' 
                    label="Email address" 
                    register={register}
                    type='email'
                    errors={errors}
                    disabled={isLoading}
                />
                <Input 
                    id='password' 
                    label="Password" 
                    register={register}
                    type='password'
                    errors={errors}
                    disabled={isLoading}

                />
                <div>
                    <Button
                    disabled={isLoading}
                    fullWidth
                    type='submit'
                    >
                        {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                    </Button>
                </div>
            </form>
            <div className='mt-6'>
                <div className='relative'>
                    <div className='
                    aboslute
                    inset-0
                    flex
                    items-center
                    '>
                    <div className='w-full border-t border-gray-300'/>
                    </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='absolute top-0 bg-white px-2 text-gray-500'>
                                Or continue with
                            </span>
                        </div>
                </div>
                <div className='mt-6 flex gap-2'>
                    <AuthSocialButton icon={BsGithub} onClick={()=>socialAction("github")}/>
                    <AuthSocialButton icon={BsGoogle} onClick={()=>socialAction("google")}/>
                </div>
            </div>
            <div className='flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500
            '>
                <div>
                    {variant === 'LOGIN' ? "New to Messenger" : 'Already have an account?'}
                </div>
                <div onClick={toogleVariant} className='underline cursor-pointer'>
                {variant === 'LOGIN' ? 'Create an account' :'Login'}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthForm
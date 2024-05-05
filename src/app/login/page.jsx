'use client'
import { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Image from 'next/image'
import Logo from './../../../public/Logo.png'
import login from '@/api/login'
import roleCookies from '@/api/cookies/role'
import usernameCookies from '@/api/cookies/username'
import structureCookies from '@/api/cookies/structure'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const onClickLogin = async () =>{
        setLoading(true)
        if ( username === '' && password === ''){
            setLoading(false)
            return;
        }
        await login(username, password).then((response) => {
            if (response.status){
                roleCookies.set(response.data.type)
                usernameCookies.set(response.data.username)
                structureCookies.set(response.data.structure)
                if ( response.data.type === 'admin'){
                    router.push('/admin')
                } else {
                    router.push('/')
                }
            } else {
                alert(response.message)
            }
        })
        setLoading(false)
    }
    return (
    <div className=' flex justify-center items-center h-screen bg-background'>
        <div className=' w-[70%] min-h-[50%] flex flex-row'>
            <div className=' w-1/3 aspect-square flex justify-center items-center rounded-l-3xl bg-primary bg-opacity-60'>
                <Image
                    className='w-3/4 aspect-square'
                    alt=''
                    src={Logo}
                />
            </div>
            <div className=' w-2/3 flex flex-col gap-8 items-center justify-center bg-secondary bg-opacity-60 rounded-r-3xl'>
                <h1 className=' text-3xl font-black'>Log In</h1>
                <div className=' w-[70%] flex flex-col gap-2 text-xl font-bold'>
                    <p className=' indent-2'>Username</p>
                    <Input
                        placeholder='Username'
                        numeric={false}
                        password={false}
                        value={username}
                        setValue={setUsername}
                    />
                </div>
                <div className=' w-[70%] flex flex-col gap-2 text-xl font-bold'>
                    <p className=' indent-2'>Password</p>
                    <Input
                        placeholder='Password'
                        numeric={false}
                        password={true}
                        value={password}
                        setValue={setPassword}
                    />
                </div>
                <div className=' w-[40%] flex flex-col gap-2 text-xl font-bold'>
                    <Button
                        loading={loading}
                        text="Log In"
                        onClick={onClickLogin}
                    />
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Page
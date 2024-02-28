"use client"
import { useRouter } from 'next/navigation'

 
export default function NotFound() {
  const router = useRouter()
  const handleRoute = ():void =>{
    router.push("/")
  }
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-1 justify-center items-center">
      <h2>Not Found</h2>
      <p>Could not find requested page</p>
      <button onClick={handleRoute} className='rounded-lg hover:cursor-pointer p-3 bg-purple-700 hover:bg-purple-600'>Return To Dashboard</button>
    </div>
  )
}
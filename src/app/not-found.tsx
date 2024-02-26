import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-1 justify-center items-center">
      <h2>Not Found</h2>
      <p>Could not find requested page</p>
      <Link href="/" className='rounded-lg hover:cursor-pointer p-3 bg-purple-700 hover:bg-purple-600'>Return To Dashboard</Link>
    </div>
  )
}
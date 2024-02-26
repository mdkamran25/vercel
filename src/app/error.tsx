'use client'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button className='p-3 bg-purple-700'
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
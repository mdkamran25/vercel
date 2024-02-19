import Link from "next/link";

export default function FormAdditionalLinks(){
    return(
        <div className="mx-1 mt-2 flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm text-right">
          <Link href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Forgot your password?
          </Link>
        </div>
      </div>

    )
}
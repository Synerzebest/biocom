import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
 
export default function Page() {
  return(
  <div className="flex flex-col gap-4 items-center">
    <div className="w-screen flex justify-center my-4 relative z-10">
        <Link href="/" className="flex justify-center">
            <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-600 via-green-500 to-green-700">Local</p>
            <p className="text-7xl font-bold text-slate-700">Nest</p>
        </Link>
    </div>
    <SignIn />
  </div>
  )
}
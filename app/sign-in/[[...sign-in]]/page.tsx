import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return(
  <div className="flex flex-col gap-4">
    <div className="w-screen flex justify-center my-4 relative z-10">
        <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-600 via-green-500 to-green-700">Bio</p>
        <p className="text-7xl font-bold text-slate-700">Nest</p>
    </div>
    <SignIn />
  </div>
  )
}
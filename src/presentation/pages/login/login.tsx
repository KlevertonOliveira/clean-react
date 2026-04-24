import type { JSX } from "react/jsx-dev-runtime";
import logo4Dev from "@/presentation/assets/logo-4dev.svg";
import { Spinner } from "@/presentation/components/Spinner/spinner";

export function LoginPage(): JSX.Element {
  return (
    <div className="h-screen flex flex-col justify-between">
      
      <header 
        className="
          bg-primary border-t-40 border-solid border-primaryDark
          flex flex-col items-center
        "
      >
        <img className="mt-10" src={logo4Dev} alt="Logo 4Dev"/>

        <h1 className="text-white mt-4 mb-10 mx-0">4Dev - Surveys for programmers</h1>
      </header>

      <form 
        className="flex flex-col w-100 bg-white p-10 rounded-lg self-center shadow-black/30 shadow-xs"
      >
        <h2 className="text-primaryDark text-center uppercase text-xl">
          Login
        </h2>

        
        <div className="flex gap-4 mt-4">
          <div className="flex items-center w-full relative">
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              className="w-full"
            />
            <span 
              className="absolute right-2 w-3 h-3 rounded-full bg-red-500 cursor-help" 
            />
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <div className="flex items-center w-full relative">
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              className="w-full"
            />
            <span 
              className="absolute right-2 w-3 h-3 rounded-full bg-red-500 cursor-help" 
            />
          </div>
        </div>

        <button className="mt-8" type="submit">
            Login
        </button>

        <span className="text-center text-primary mt-4 cursor-pointer hover:underline">
          Create account
        </span>

        <div className="mt-8 mx-auto">
          <Spinner />
        </div>
          
        <span className="mt-8 mx-auto">Error</span>
      </form>

      <footer className="bg-primary h-12" />
    </div>
  )
}

import type { JSX } from "react/jsx-dev-runtime";

import { Footer, Input, Spinner } from "@/presentation/components";
import { Header } from "@/presentation/pages/login/components";
import { useState } from "react";

type FormState = {
  isLoading: boolean;
  errors: {
    form: string;
    email: string;
    password: string;
  }
}

export default function LoginPage(): JSX.Element {
  const [state] = useState<FormState>({
    isLoading: false,
    errors: {
      form: "",
      email: "Required field",
      password: "Required field",
    }
  });

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />

        <form 
          className="flex flex-col w-100 bg-white p-10 rounded-lg self-center shadow-black/30 shadow-xs"
        >
          <h2 className="text-primaryDark text-center uppercase text-xl">
            Login
          </h2>
          
          <div className="mt-4">
            <Input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              className="w-full"
              errorMessage={state.errors.email}
            />
          </div>
          
          <div className="mt-4">
            <Input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              className="w-full"
              errorMessage={state.errors.password}
            />
          </div>

          <button 
            className="mt-8"
            type="submit"
            data-testid="submit-button"
            disabled
          >
            Login
          </button>

          <span className="text-center text-primary mt-4 cursor-pointer hover:underline">
            Create account
          </span>

          {state.isLoading && (
            <div className="mt-8 mx-auto">
              <Spinner />
            </div>
          )}
          
          {state.errors.form && (
            <span className="mt-8 mx-auto" data-testid="formErrorMessage">
              {state.errors.form}
            </span>
          )}
        </form>

      <Footer />
    </div>
  )
}

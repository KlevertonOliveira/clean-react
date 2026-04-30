import type { JSX } from "react/jsx-dev-runtime";

import { Footer, Input, Spinner } from "@/presentation/components";
import { Header } from "@/presentation/pages/login/components";
import React, { useEffect, useState } from "react";
import type { Validation } from "@/presentation/protocols/validation";

type FormState = {
  isLoading: boolean;
  email: string;
  password: string;
  errors: {
    form: string;
    email: string;
    password: string;
  }
}

type Props = {
  validation: Validation;
}

export default function LoginPage({ validation }: Props): JSX.Element {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    email: "",
    password: "",
    errors: {
      form: "",
      email: "Required field",
      password: "Required field",
    }
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement, Element>): void{
    setState((prev) => ({
      ...prev, 
      [event.target.name]: event.target.value
    }))
  }

  useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])
  
  useEffect(() => {
    validation.validate({ password: state.password })
  }, [state.password])

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
              onChange={handleChange}
              errorMessage={state.errors.email}
            />
          </div>
          
          <div className="mt-4">
            <Input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              className="w-full"
              onChange={handleChange}
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

import type { JSX } from "react/jsx-dev-runtime";

import { Footer, Input, Spinner } from "@/presentation/components";
import { Header } from "@/presentation/pages/login/components";
import React, { useState } from "react";
import type { Validation } from "@/presentation/protocols/validation";
import type { Authentication } from "@/domain/usecases";
import { Link } from "@tanstack/react-router";

type FormState = {
  isLoading: boolean;
  fields: {
    email: string;
    password: string;
  },
  fieldErrors: {
    email: string;
    password: string;
  },
  formError: string;
}

type Props = {
  validation: Validation;
  authentication: Authentication;
}

export default function LoginPage({ validation, authentication }: Props): JSX.Element {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    fields: {
      email: "",
      password: "",
    },
    fieldErrors: {
      email: "Required field",
      password: "Required field",
    },
    formError: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement, Element>): void{
    const fieldName = event.target.name as keyof FormState["fields"];
    const fieldValue = event.target.value;

    setState((prev) => ({
      ...prev, 
      fields: { 
        ...prev.fields, 
        [fieldName]: fieldValue
      },
      fieldErrors: {
        ...prev.fieldErrors,
        [fieldName]: validation.validate(fieldName, fieldValue),
      },
    }))
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): Promise<void>{
    event.preventDefault();

    try {
      if(state.isLoading || state.fieldErrors.email || state.fieldErrors.password) {
        return
      };
  
      setState((prev) => ({ ...prev, isLoading: true }));
  
      const account = await authentication.auth(state.fields);
      localStorage.setItem('accessToken', account.accessToken);
    }
    catch(error) {
      setState((prev) => ({
        ...prev, formError: (error as Error).message, isLoading: false })
      );
    }
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />

        <form 
          className="flex flex-col w-100 bg-white p-10 rounded-lg self-center shadow-black/30 shadow-xs"
          onSubmit={handleSubmit}
          data-testid="login-form"
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
              errorMessage={state.fieldErrors.email}
            />
          </div>
          
          <div className="mt-4">
            <Input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              className="w-full"
              onChange={handleChange}
              errorMessage={state.fieldErrors.password}
            />
          </div>

          <button 
            className="mt-8"
            type="submit"
            data-testid="submit-button"
            disabled={Boolean(state.fieldErrors.email || state.fieldErrors.password)}
          >
            Login
          </button>

          <Link
            className="text-center text-primary mt-4 cursor-pointer hover:underline"
            data-testid='signup-link'
            to='/signup'
          >
            Create account
          </Link>

          {state.isLoading && (
            <div className="mt-8 mx-auto">
              <Spinner />
            </div>
          )}
          
          {state.formError && (
            <span className="mt-8 mx-auto" data-testid="formErrorMessage">
              {state.formError}
            </span>
          )}
        </form>

      <Footer />
    </div>
  )
}

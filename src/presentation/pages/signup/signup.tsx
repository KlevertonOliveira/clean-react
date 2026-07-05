import type { JSX } from "react/jsx-dev-runtime";

import { Footer, Input, Spinner } from "@/presentation/components";
import { Header } from "@/presentation/pages/login/components";
import { useState } from "react";
import type { Validation } from "@/presentation/protocols/validation";
import type { AddAccount, SaveAccessToken } from "@/domain/usecases";
import { Link, useNavigate } from "@tanstack/react-router";

type FormState = {
  isLoading: boolean;
  fields: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  fieldErrors: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  formError: string;
};

type Props = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
};

export default function SignUpPage({
  validation,
  addAccount,
  saveAccessToken,
}: Props): JSX.Element {
  const navigate = useNavigate();

  const [state, setState] = useState<FormState>({
    isLoading: false,
    fields: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    fieldErrors: {
      name: "Required field",
      email: "Required field",
      password: "Required field",
      confirmPassword: "Required field",
    },
    formError: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement, Element>): void {
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
        [fieldName]: validation.validate(fieldName, {
          ...state.fields,
          [fieldName]: fieldValue
        }),

        ...(fieldName === 'password' && {
          confirmPassword: validation.validate('confirmPassword', {
            ...state.fields,
            password: fieldValue,
          })
        })
      },
    }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const account = await addAccount.add(state.fields);
      await saveAccessToken.save(account.accessToken);

      navigate({ to: '/' });
    }
    catch (error) {
      setState((prev) => ({
        ...prev, isLoading: false, formError: (error as Error).message
      }));
    }
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />

      <form
        className="flex flex-col w-100 bg-white p-10 rounded-lg self-center shadow-black/30 shadow-xs"
        onSubmit={handleSubmit}
        data-testid="signup-form"
      >
        <h2 className="text-primaryDark text-center uppercase text-xl">
          Create Account
        </h2>

        <div className="mt-4">
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full"
            onChange={handleChange}
            errorMessage={state.fieldErrors.name}
          />
        </div>

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

        <div className="mt-4">
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="w-full"
            onChange={handleChange}
            errorMessage={state.fieldErrors.confirmPassword}
          />
        </div>

        <button
          className="mt-8"
          type="submit"
          data-testid="submit-button"
          disabled={state.isLoading || Boolean(
            state.fieldErrors.name
            || state.fieldErrors.email
            || state.fieldErrors.password
            || state.fieldErrors.confirmPassword
          )}
        >
          Sign Up
        </button>

        <p className="text-center text-center mt-4 text-neutral-500">
          Already have an account? {" "}
          <Link
            className="text-primary cursor-pointer hover:underline"
            to="/login"
            data-testid="login-link"
          >
            Login
          </Link>
        </p>

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
  );
}

/* eslint-disable @typescript-eslint/no-empty-function */

import type { JSX } from "react/jsx-dev-runtime";

import { Footer, Input } from "@/presentation/components";
import { Header } from "@/presentation/pages/login/components";

export default function SignUpPage(): JSX.Element {

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />

      <form
        className="flex flex-col w-100 bg-white p-10 rounded-lg self-center shadow-black/30 shadow-xs"
        onSubmit={() => { }}
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
            onChange={() => { }}
          />
        </div>

        <div className="mt-4">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full"
            onChange={() => { }}
          />
        </div>

        <div className="mt-4">
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full"
            onChange={() => { }}
          />
        </div>

        <div className="mt-4">
          <Input
            type="password"
            name="confirm-password"
            placeholder="Confirm password"
            className="w-full"
            onChange={() => { }}
          />
        </div>

        <button
          className="mt-8"
          type="submit"
          data-testid="submit-button"
        >
          Sign Up
        </button>

        <p className="text-center text-center mt-4 text-neutral-500">
          Already have an account? {" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            data-testid='login-link'
          >
            Login
          </span>
        </p>
      </form>

      <Footer />
    </div>
  );
}

import { describe, expect, test } from "vitest";
import { render, type RenderResult } from "@testing-library/react";
import LoginPage from "./login";

type SutTypes = {
  sut: RenderResult;
}

const makeSut = (): SutTypes => {
  const sut = render(<LoginPage />);
  
  return {
    sut
  }
}

describe('Login Component', () => { 
  test('Should start with initial state', () => {
    const { sut } = makeSut();

    const spinner = sut.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = sut.queryByTestId('errorMessage');
    expect(errorMessage).not.toBeInTheDocument();
    
    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeDisabled()

    const emailInputStatus = sut.getByTestId('email-status');
    expect(emailInputStatus).toBeInTheDocument();
    expect(emailInputStatus).toHaveAttribute('title', 'Required field');
    
    const passwordInputStatus = sut.getByTestId('password-status');
    expect(passwordInputStatus).toBeInTheDocument();
    expect(emailInputStatus).toHaveAttribute('title', 'Required field');
  })
 })
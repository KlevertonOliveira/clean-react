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
  test('should not render loading spinner initially', () => {
    const { sut } = makeSut();

    const spinner = sut.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();
  })

  test('should not render error message initially', () => {
    const { sut } = makeSut();

    const errorMessage = sut.queryByTestId('errorMessage');
    expect(errorMessage).not.toBeInTheDocument();
  })
  
  test('should render submit button disabled initially', () => {
    const { sut } = makeSut();

    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeDisabled()
  })
  
  test('should render submit button disabled initially', () => {
   const { sut } = makeSut();

    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeDisabled()
  })
  
  test('should render error status for email and password inputs initially', () => {
    const { sut } = makeSut();

    const emailInputStatus = sut.getByTestId('email-status');
    expect(emailInputStatus).toBeInTheDocument();
    expect(emailInputStatus).toHaveAttribute('title', 'Required field');
    
    const passwordInputStatus = sut.getByTestId('password-status');
    expect(passwordInputStatus).toBeInTheDocument();
    expect(emailInputStatus).toHaveAttribute('title', 'Required field');
  })
 })
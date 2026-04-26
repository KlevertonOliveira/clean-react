import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./login";

describe('Login Component', () => { 
  test('should not render loading spinner initially', () => {
    render(<LoginPage />);

    const spinner = screen.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();
  })

  test('should not render error message initially', () => {
    render(<LoginPage />);

    const errorMessage = screen.queryByTestId('errorMessage');
    expect(errorMessage).not.toBeInTheDocument();
  })
  
  test('should render submit button disabled initially', () => {
    render(<LoginPage />);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled()
  })
 })
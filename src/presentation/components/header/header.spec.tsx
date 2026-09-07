import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "@tanstack/react-router";
import { routeAuth } from "@/utils/route-auth";
import { generateTestRouter } from "@/utils/test/test-router-utils";
import { Header } from "@/presentation/components";
import { mockAccountModel } from "@/domain/test";

type SutTypes = {
  router: ReturnType<typeof generateTestRouter>;
};

const logoutMock = vi.fn();
const getAccountMock = vi.fn();

const makeSut = (account = mockAccountModel()): SutTypes => {
  const router = generateTestRouter({
    initialLocation: '/',
    rootRoutecomponent: <Header />,
    context: {
      routeAuth: {
        ...routeAuth,
        logout: logoutMock,
        getAccount: getAccountMock.mockReturnValue(account),
      },
    }
  });

  render(<RouterProvider router={router} />);

  return { router };
};

describe('Header Component', () => {
  test("(Logout feature) - Should call router context's logout method and redirect to login", async () => {
    const { router } = makeSut();

    await screen.findByRole("banner");

    userEvent.setup();
    await userEvent.click(screen.getByTestId("logout-button"));

    expect(logoutMock).toHaveBeenCalled();
    expect(router.state.location.pathname).toBe('/login');
  });

  test("Should render username correctly", async () => {
    const account = mockAccountModel();
    makeSut(account);

    await screen.findByRole("banner");

    expect(screen.getByTestId("username")).toHaveTextContent(account.name);
  });
});
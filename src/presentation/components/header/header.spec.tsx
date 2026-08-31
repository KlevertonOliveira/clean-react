import { render, screen } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "@tanstack/react-router";
import { routeAuth } from "@/utils/route-auth";
import { generateTestRouter } from "@/utils/test/test-router-utils";
import { Header } from "@/presentation/components";

describe('Header Component', () => {
  test("(Logout feature) - Should call router context's logout method and redirect to login", async () => {
    const logoutMock = vi.fn();

    const router = generateTestRouter({
      initialLocation: '/',
      rootRoutecomponent: <Header />,
      context: {
        routeAuth: { ...routeAuth, logout: logoutMock },
        queryClient: new QueryClient()
      }
    });

    render(<RouterProvider router={router} />);

    await screen.findByRole("banner");

    userEvent.setup();
    await userEvent.click(screen.getByTestId("logout-button"));

    expect(logoutMock).toHaveBeenCalled();
    expect(router.state.location.pathname).toBe('/login');
  });
});
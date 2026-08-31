import { Logo } from "@/presentation/components";
import { useNavigate, useRouteContext } from "@tanstack/react-router";

export default function Header() {
  const navigate = useNavigate();
  const { routeAuth } = useRouteContext({ from: "__root__" });

  const logout = () => {
    routeAuth.logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="flex justify-center bg-primary border-t-20 sm:border-t-40 border-primaryDark">
      <div className="flex justify-between max-w-200 grow py-5 px-10">
        <Logo className="w-15 self-center" />

        <div className="self-center flex flex-col justify-center items-end text-white">
          <span className="mb-2 font-medium">João</span>

          <button
            data-testid="logout-button"
            className="hover:underline"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
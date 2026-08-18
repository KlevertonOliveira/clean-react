import { Logo } from "@/presentation/components";

export default function Header() {
  return (
    <header className="flex justify-center bg-primary border-t-20 sm:border-t-40 border-primaryDark"
    >
      <div className="flex justify-between max-w-200 grow py-5 px-10">
        <Logo className="w-15 self-center" />

        <div className="self-center flex flex-col justify-center items-end text-white"
        >
          <span className="mb-2 font-medium">João</span>
          <a href="/initial" className="hover:underline">Logout</a>
        </div>
      </div>
    </header>
  );
}
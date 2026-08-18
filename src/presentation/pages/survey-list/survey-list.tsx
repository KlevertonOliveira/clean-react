{/* eslint-disable no-constant-condition */ }

import { CheckIcon, QuestionMarkIcon } from "@phosphor-icons/react";
import { Header, Footer } from "@/presentation/components";

export default function SurveyListPage() {
  return (
    <div className="flex flex-col min-h-screen h-full justify-between bg-disabled-background"
    >
      <Header />

      <div className="flex flex-col self-center max-w-200 grow w-full px-5 py-10"
      >
        <h2 className="text-primaryDark text-xl font-bold uppercase mb-6">
          Surveys
        </h2>

        <ul className="flex flex-wrap justify-between">
          <li className="h-60 bg-white flex flex-col justify-between rounded-lg basis-[48%] mb-6 shadow relative">

            <div className="flex justify-between rounded-lg grow
            bg-[linear-gradient(to_right,rgb(from_var(--color-primaryLight)_r_g_b/20%)_0_12.5%,var(--color-white)_12.5%_100%)]
            bg-no-repeat 
            bg-size-[100%_100%]"
            >
              <div className={`absolute -top-2 -right-2 text-white rounded-full 
                ${true ? "bg-red-600" : "bg-green-600"}`}
              >
                {true ? <QuestionMarkIcon size={32} /> : <CheckIcon size={32} />}
              </div>

              <time className="flex flex-col bg-primaryLight text-white rounded-lg ml-4 w-15 h-25 items-center self-center justify-center shrink-0">
                <span className="text-4xl font-bold">22</span>
                <span className="lowercase m-0 mb-1">Mar</span>
                <span className="">2020</span>
              </time>

              <p className="text-xl m-6 self-center">What&apos;s your favorite web framework?</p>
            </div>

            <footer className="bg-primary hover:bg-primaryDark text-white leading-10 lowercase text-center cursor-pointer rounded-b-lg"
            >
              See Result
            </footer>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}

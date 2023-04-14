import { signIn, useSession } from "next-auth/react";
import { Terminal } from "../../src/components/Terminal";
import { Program } from "../../src/components/Program";
import { TerminalInput } from "../../src/components/Terminal/TerminalInput";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/desktop");
    }
  }, [router, status]);

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-dark">
        <div className="m-16 flex w-full justify-center ">
          <span className="app-name_header absolute top-0 flex flex-row items-center text-[6rem]">
            glixel
          </span>
        </div>
        <div className="auth-con h-1/3 w-1/2 bg-light">
          <div className="  flex h-full w-full flex-col items-center  ">
            <h1 className="auth-con_header text-center text-4xl">LOGIN</h1>
            <div className="flex h-full w-full items-center justify-center">
              <button
                className="auth-button  h-20   w-full bg-lighter p-1 text-lg "
                onClick={() => signIn("google")}
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

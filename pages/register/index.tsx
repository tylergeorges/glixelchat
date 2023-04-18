export default function RegisterPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-dark">
      <div className="m-16 flex w-full justify-center ">
        <span className="app-name_header absolute top-0 flex flex-row items-center text-[6rem]">
          glixel
        </span>
      </div>
      <div className="auth-con h-1/3 w-1/2 bg-light">
        <div className="  flex h-full w-full flex-col items-center  ">
          <h1 className="auth-con_header text-center text-4xl">REGISTER</h1>
          <div className="flex h-full w-full items-center justify-center">
            <button
              className="auth-button  h-20   w-full bg-lighter p-1 text-lg "
              onClick={() => "google"}
            >
              Register with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

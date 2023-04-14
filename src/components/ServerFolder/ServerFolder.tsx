import { useState } from "react";
import { Program } from "../Program";
import { ProgramChildrenProps } from "../Program/program.types";
import { EarthSvg } from "../../svg/EarthSvg";

interface Server {
  id: number;
  server_name: string;
  server_owner: string;
}

export const ServerFolder = ({ zIndex, program_id }: ProgramChildrenProps) => {
  const [servers, setServer] = useState<Server[]>([
    {
      id: 0,
      server_owner: "kneadle",
      server_name: "users land",
    },
  ]);
  return (
    <Program
      bar_color="light_dark"
      program_name="servers"
      zIndex={zIndex}
      program_id={program_id}
    >
      <div className="flex w-full h-full      flex-col">
        {/* <div className="bg-light_dark  mb-[-5px] ml-[1px]  h-10 w-36 text-xl text-center folder-tab">
          servers
        </div> */}

        <div
          id="server-content"
          className="flex justify-start items-start w-full h-full bg-light mt-1 p-2"
        >
          {servers.map((server) => {
            return (
              <div className="flex flex-wrap break-words w-16 text-center justify-center" key={server.id}>
                <EarthSvg />
                <span>{server.server_name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Program>
  );
};

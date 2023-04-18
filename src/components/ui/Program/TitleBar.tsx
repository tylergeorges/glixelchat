export const TitleBar = ({
  program_name,
  bar_color,
  program_id,
}: {
  program_name: string;
  bar_color: "pink" | "dark" | "light" | "lighter";
  program_id: number;
}) => {
  return (
    <div
      id={`title-bar-program_id-${program_id}`}
      className={`title-bar title-bar-${bar_color} w-full  font-PixelBold flex h-full flex-row  items-center    p-1 text-left text-lg text-base_gray`}
    >
      {program_name}
      {/* <div className="title-bar-lines h-1/2 w-[90%] mx-3 border-t-4 border-b-4 border-lighter-200" /> */}
    </div>
  );
};

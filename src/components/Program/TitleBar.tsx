export const TitleBar = ({
  program_name,
  bar_color,
  program_id,
}: {
  program_name: string;
  bar_color: "pink" | "dark";
  program_id: number;
}) => {
  return (
    <div
      id={`title-bar-program_id-${program_id}`}
      className={`title-bar title-bar-${bar_color}   bg-${bar_color} w-full h-11 text-base_gray text-lg text-left p-1 font-PixelBold`}
    >
      {program_name}
    </div>
  );
};

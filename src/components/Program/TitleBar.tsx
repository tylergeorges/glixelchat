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
      className={`title-bar title-bar-${bar_color}  font-PixelBold h-full w-full  flex-row    p-1 text-left text-lg text-base_gray`}
    >
      {program_name}

      
    </div>
  );
};

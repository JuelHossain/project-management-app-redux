import { Option, Select } from "@material-tailwind/react";
import { colors } from "../../../../utils/colors";

export default function TeamColorPicker({ color, colorError, setColor }) {
  return (
    <div className="relative">
      <Select
        color={color?.name}
        label={colorError || "Select A Color"}
        error={!!colorError}
        menuProps={{
          className: "grid grid-cols-9 gap-2",
        }}
      >
        {Object.keys(colors).map((key) => {
          const color = {
            name: key,
            ...colors[key],
            common: {
              backgroundColor: colors[key]["100"],
              color: colors[key]["500"],
            },
          };
          return (
            <Option
              onClick={() => {
                setColor(color);
              }}
              key={key}
              value={""}
              style={{
                backgroundColor: colors[key]["500"],
              }}
              className={`text-[0.1px] hover:scale-150 rounded-full capitalize w-6 h-6 md:w-7 md:h-7 lg:h-8 lg:w-8`}
            >
              <span className="hidden">hidden</span>
            </Option>
          );
        })}
      </Select>
      {color && (
        <span
          className="absolute top-3 left-3.5 capitalize text-sm px-2 rounded z-0"
          style={color.common}
        >
          {color.name}
        </span>
      )}
    </div>
  );
}

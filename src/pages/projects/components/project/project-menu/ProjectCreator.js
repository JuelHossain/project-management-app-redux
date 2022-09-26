import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";

export default function ProjectCreator({ creatorName, color }) {
  return (
    <div
      className="flex items-center gap-2 py-0.5 px-2 rounded-md "
      style={color.common}
    >
      <p className="text-sm font-bold">{creatorName}</p>
      <IconButton className="w-6 h-6 rounded-full " color={color.name}>
        <ShieldCheckIcon className="w-5 h-5" />
      </IconButton>
    </div>
  );
}

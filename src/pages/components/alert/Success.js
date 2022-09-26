import { Typography } from "@material-tailwind/react";

export default function Success({ show, children }) {
  return (
    !!show && (
      <Typography
        variant="paragraph"
        className={`bg-green-50 text-green-500 text-center text-sm  p-2 rounded-md`}
      >
        {children}
      </Typography>
    )
  );
}

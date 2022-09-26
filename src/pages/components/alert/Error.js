import { Typography } from "@material-tailwind/react";

export default function Error({ show, children }) {
  return (
    !!show && (
      <Typography
        variant="paragraph"
        className={` bg-red-100 text-red-600 text-center text-sm  p-2 rounded-md`}
      >
        {children}
      </Typography>
    )
  );
}

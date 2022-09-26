import { CardHeader, Typography } from "@material-tailwind/react";

export default function LoginHeader() {
  return (
    <CardHeader
      variant="gradient"
      color="blue"
      className="mb-4 grid h-28 place-items-center"
    >
      <Typography variant="h3" color="white">
        Sign In
      </Typography>
    </CardHeader>
  );
}

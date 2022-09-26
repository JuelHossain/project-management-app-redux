import { Textarea } from "@material-tailwind/react";

export default function TeamAboutInput({ error, register }) {
  return (
    <Textarea
      error={!!error}
      {...register("about", {
        required: "About is required",
        minLength: {
          value: 10,
          message: "Minimum 10 Character Required",
        },
      })}
      type={"text"}
      label={error || "About"}
    />
  );
}

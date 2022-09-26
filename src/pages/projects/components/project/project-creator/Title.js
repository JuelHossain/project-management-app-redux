import { Textarea } from "@material-tailwind/react";

export default function Title({ titleError, register }) {
  return (
    <Textarea
      error={!!titleError}
      {...register("title", {
        required: "Title is required",
        minLength: {
          value: 10,
          message: "Minimum 10 Character Required",
        },
      })}
      type={"text"}
      label={titleError || "Title"}
    />
  );
}

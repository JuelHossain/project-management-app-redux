import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import moment from "moment/moment";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelector";
import { useCreateTeamMutation } from "../../../../features/team/teamApi";
import Loading from "../../../components/Loading";
import CreateActions from "../../../components/shared/CreateActions";
import PlusButton from "../../../components/shared/PlusButton";
import TeamAboutInput from "./TeamAboutInput";
import TeamColorPicker from "./TeamColorPicker";
import TeamNameInput from "./TeamNameInput";

const TeamCreator = () => {
  // logged in user
  const user = useSelector(selectUser);

  // modal opener state
  const [open, toggle] = useReducer((state) => !state, false);

  // necessary states
  const [color, setColor] = useState(null);
  const [colorError, setColorError] = useState("");

  // create team mutation
  const [
    createTeam,
    {
      isLoading: creating,
      isSuccess: created,
      error: { error: creatingError, data: creatingErrorData } = {},
    },
  ] = useCreateTeamMutation();

  // use hook form
  const {
    handleSubmit,
    register,
    reset,
    formState: {
      errors: {
        name: { message: nameError } = {},
        about: { message: aboutError } = {},
      } = {},
    },
  } = useForm();

  // creating team handler
  const createHandler = (data) => {
    if (color) {
      setColorError("");
      createTeam({
        ...data,
        color,
        members: [user],
        createdBy: user,
        createdAt: moment().format("MMM D"),
      });
    } else {
      setColorError(" Oops,Color is required too");
    }
  };

  // resetting states after team has been created
  useEffect(() => {
    if (created) {
      reset();
      setColor("");
      toggle();
    }
  }, [created, toggle, reset]);

  // resetting form on modal close
  useEffect(() => {
    if (!open) {
      setColor("");
      reset();
    }
  }, [open, reset]);

  // organized error
  const error = creatingError || creatingErrorData;

  return (
    <>
      <PlusButton onClick={toggle} />
      <Dialog
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        open={open}
        handler={toggle}
        className="min-w-[340px] max-w-md "
      >
        <Loading visible={creating} />
        <form onSubmit={handleSubmit(createHandler)}>
          <DialogHeader>Create A Team</DialogHeader>
          <DialogBody className="flex-col gap-2">
            <TeamNameInput error={nameError} register={register} />
            <TeamAboutInput error={aboutError} register={register} />
            <TeamColorPicker
              color={color}
              colorError={colorError}
              setColor={setColor}
            />
          </DialogBody>
          <CreateActions error={error} toggle={toggle} />
        </form>
      </Dialog>
    </>
  );
};

export default TeamCreator;

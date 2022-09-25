import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton, Input } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../features/auth/authApi";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../features/team/teamApi";
import isValidEmail from "../../../utils/isValidEmail";
import Loading from "../../components/Loading";

const AddMember = ({ id }) => {
  const myEmail = useSelector((state) => state.auth.user.email);
  const [userToAdd, setUserToAdd] = useState("");
  const [userData, setUserData] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const {
    data: { members, color, createdBy: { email: createdBy } } = {},
    isLoading: teamLoading,
    error: teamError,
  } = useGetTeamQuery(id);

  const {
    data: users,
    isLoading: usersLoading,
    error: gettingUserError,
  } = useGetUserQuery(userToAdd, {
    skip: !checkUser,
  });

  const [
    editTeam,
    { isLoading: adding, error: addingError, isSuccess: added, reset },
  ] = useEditTeamMutation();

  const userExist = (userEmail) => {
    const exist = members.filter((member) => member.email === userEmail);
    if (exist.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const clearInputField = () => {
    inputRef.current.children[1].value = "";
  };

  useEffect(() => {
    if (userToAdd === "") {
      setError("");
      setShowSuggestion(false);
    } else if (users?.length > 0) {
      users.forEach((user) => {
        if (user.email === myEmail) {
          if (userToAdd === myEmail) {
            setError("You are Already a member");
          } else {
            setError("");
            setShowSuggestion(false);
          }
        } else if (user.email === userToAdd) {
          setError("");
          setShowSuggestion(false);
          setSuccess(true);
          setUserData(user);
        } else {
          setError("");
          setShowSuggestion(true);
          setSuccess(false);
          setUserData(null);
          reset();
        }
      });
    } else if (isValidEmail(userToAdd)) {
      setError("User Not Found");
    } else {
      setError("");
    }
  }, [userToAdd, users, myEmail, reset]);

  useEffect(() => {
    if (myEmail !== createdBy) {
      setError("You are not authorized to make changes in this team");
    } else if (gettingUserError) {
      setError("we are having some problem, try adding a member later");
    } else if (teamError) {
      setError("Got an Error While Checking Members");
    } else if (addingError) {
      setError("Got an Error While Adding Member");
    } else {
      setError("");
    }
  }, [gettingUserError, addingError, teamError, createdBy, myEmail]);

  useEffect(() => {
    if (added) {
      setSuccess(false);
      setUserData(null);
      setUserToAdd("");
      clearInputField();
    }
  }, [added]);

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    setCheckUser(true);
    setUserToAdd(value);
  };

  const handleSearch = debounceHandler(doSearch, 200);
  const submitHandler = (e) => {
    e.preventDefault();

    const matched = members?.filter(
      (member) => member.email === userData.email
    );
    if (matched.length > 0) {
      setError("User Already a Member");
      setUserData(null);
    } else {
      editTeam({ id, data: { members: [...members, userData] } });
    }
  };

  return (
    <form onSubmit={submitHandler} className="relative">
      <Loading visible={usersLoading || teamLoading || adding} />
      <Input
        color={color?.name}
        disabled={createdBy !== myEmail}
        error={!!error}
        ref={inputRef}
        success={success}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        label={"Add Member"}
        icon={
          <IconButton
            disabled={!userData}
            variant="text"
            size="sm"
            className="-mt-[5.5px] -ml-[4px] "
            color={color?.name}
            type="submit"
          >
            <PlusCircleIcon className="w-5 h-5" />
          </IconButton>
        }
      />
      {!!error && (
        <div className="absolute w-full text-red-500 text-xs py-1 px-3 bg-red-100 rounded-md mt-1 flex justify-between items-center">
          <p>{error}</p>
          {createdBy === myEmail && (
            <IconButton
              onClick={() => {
                setError("");
                clearInputField();
                setSuccess(false);
              }}
              className="-mr-2 w-5 h-5 flex-shrink-0 "
              color="red"
              variant="text"
            >
              <XMarkIcon className="w-4 h-4" />
            </IconButton>
          )}
        </div>
      )}
      {showSuggestion && (
        <div
          style={{ borderColor: color["200"] }}
          className={`p-2 flex flex-col gap-2 max-h-28 overflow-auto absolute w-full bg-white shadow-md border rounded mt-1 z-10`}
        >
          {users?.map((user) => {
            if (user.email !== myEmail) {
              return (
                <div
                  onClick={() => {
                    inputRef.current.children[1].value = user.email;
                    setUserToAdd(user.email);
                    setShowSuggestion(false);
                  }}
                  key={user.id}
                  className={`py-1 px-3 rounded px-3cursor-pointer justify-between flex items-center border shadow-sm cursor-pointer`}
                  style={{ ...color.common, borderColor: color?.["200"] }}
                >
                  <p> {user?.email}</p>
                  {userExist(user.email) && (
                    <p
                      className={`text-[10px] rounded px-1 -mr-2 `}
                      style={{
                        backgroundColor: color?.["900"],
                        color: color?.["50"],
                      }}
                    >
                      Member
                    </p>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </form>
  );
};

export default AddMember;

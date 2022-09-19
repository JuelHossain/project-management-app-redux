import {
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../features/auth/authApi";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../features/team/teamApi";
import isValidEmail from "../../../utils/isValidEmail";
import Loading from "../../components/Loading";

const TeamMenu = ({ team }) => {
  const { id, name, color } = team ?? {};
  const myEmail = useSelector((state) => state.auth.user.email);
  const [userToAdd, setUserToAdd] = useState("");
  const [userData, setUserData] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const {
    data: users,
    isLoading: usersLoading,
    error: gettingUserError,
  } = useGetUserQuery(userToAdd, {
    skip: !checkUser,
  });
  const {
    data: { members } = {},
    isLoading: membersLoading,
    error: membersError,
  } = useGetTeamQuery(id);

  const [editTeam, { adding, error: addingError, isSuccess: added, reset }] =
    useEditTeamMutation();

  useEffect(() => {
    if (userToAdd === "") {
      setError("");
      setShowSuggestion(false);
    } else if (users?.length > 0) {
      if (users?.[0].email === myEmail) {
        if (userToAdd === myEmail) {
          setError("You are Already a member");
        } else {
          setError("");
          setShowSuggestion(false);
        }
      } else if (users?.[0].email === userToAdd) {
        setError("");
        setShowSuggestion(false);
        setSuccess(true);
        setUserData(users?.[0]);
      } else {
        setError("");
        setShowSuggestion(true);
        setSuccess(false);
        setUserData(null);
        reset();
      }
    } else if (isValidEmail(userToAdd)) {
      setError("User Not Found");
    } else {
      setError("");
    }
  }, [userToAdd, users, myEmail, reset]);

  useEffect(() => {
    if (gettingUserError) {
      setError("we are having some problem, try adding a member later");
    } else if (membersError) {
      setError("Got an Error While Checking Members");
    } else if (addingError) {
      setError("Got an Error While Adding Member");
    } else {
      setError("");
    }
  }, [gettingUserError, addingError, membersError]);

  useEffect(() => {
    if (added) {
      setSuccess(false);
      setSuccessMessage(`${userToAdd} added `);
      setUserData(null);
      inputRef.current.children[1].value = "";
    } else {
      setSuccessMessage("");
    }
  }, [userToAdd, added, reset]);

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
      setSuccessMessage("");
      setError("User Already a Member");
      setUserData(null);
    } else {
      editTeam({ id, data: [...members, userData] });
    }
  };

  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <IconButton className="w-7 h-7" variant="text">
          <svg
            className="w-3.5 h-3.5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="flex gap-2">
        <Loading visible={adding || membersLoading || usersLoading} />
        <div className="flex flex-col gap-2">
          <p className={`text-lg text-${color}-500 font-bold`}>Team {name}</p>
          <form onSubmit={submitHandler}>
            <Input
              error={!!error}
              ref={inputRef}
              success={success}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              label={"Add Member"}
              icon={
                <IconButton
                  color={color}
                  disabled={!userData}
                  variant="text"
                  size="sm"
                  className="-mt-[5.5px] -ml-[4px]"
                  type="submit"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </IconButton>
              }
            />
            {successMessage && (
              <p className="text-green-500 text-xs py-1 px-3 bg-green-100 rounded-md mt-1">
                {successMessage}
              </p>
            )}
            {!!error && (
              <p className="text-red-500 text-xs py-1 px-3 bg-red-100 rounded-md mt-1">
                {error}
              </p>
            )}
            {showSuggestion && (
              <div className="p-2 flex flex-col gap-2 max-h-32 overflow-auto">
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
                        className={`py-1 bg-${color}-100 text-${color}-500 rounded px-3 hover:bg-${color}-200 hover:text-${color}-600 cursor-pointer`}
                      >
                        {user?.email}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </form>
        </div>
        <div className={`bg-${color}-500 w-0.5`}></div>
        <ul className="flex gap-1 flex-col">
          <div className="flex gap-0.5  py-1">
            <p>Members</p>
            <p className="py-0.5 px-1.5 rounded-md text-xs bg-green-100 text-green-500">
              {members?.length}
            </p>
          </div>
          {members?.map((member) => (
            <li
              className={`py-1 px-3 bg-${color}-100 text-${color}-500 rounded-md flex justify-between gap-3`}
              key={member.id}
            >
              <p> {member.name}</p>
              <IconButton
                className={`-mr-2 w-5 h-5 bg-${color}-900 text-red-500`}
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </IconButton>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default TeamMenu;

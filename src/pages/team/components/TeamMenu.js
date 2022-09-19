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
import { useEditTeamMutation } from "../../../features/team/teamApi";
import isValidEmail from "../../../utils/isValidEmail";
import Loading from "../../components/Loading";

const TeamMenu = ({ id }) => {
  const myEmail = useSelector((state) => state.auth.user.email);
  const [userToAdd, setUserToAdd] = useState("");
  const [userData, setUserData] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const { data, error: gettingUserError } = useGetUserQuery(userToAdd, {
    skip: !checkUser,
  });
  const [editTeam, { adding, error: addingError, isSuccess: added }] =
    useEditTeamMutation();

  useEffect(() => {
    if (userToAdd === myEmail) {
      setError("You are Already a member");
    }
    if (userToAdd !== "" && userToAdd !== myEmail && isValidEmail(userToAdd)) {
      setError("User Not Found");
    }
    if (data?.length > 0 && userToAdd !== "" && userToAdd !== myEmail) {
      setError("");
      setShowSuggestion(true);
      setSuccess(false);
    } else {
      setShowSuggestion(false);
    }
    if (data?.[0]?.email === userToAdd && userToAdd !== myEmail) {
      setError("");
      setShowSuggestion(false);
      setSuccess(true);
      setUserData(data?.[0]);
    }
  }, [userToAdd, data, myEmail]);

  useEffect(() => {
    if (gettingUserError) {
      setError("we are having some problem, try adding a member later");
    } else {
      setError("");
    }
  }, [gettingUserError]);

  useEffect(() => {
    if (added) {
      setError(`${userToAdd} added `);
    }
  }, [userToAdd, added]);

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
    if (userData) {
      if (userData) {
        editTeam({ id, data: userData });
      }
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
      <PopoverContent className="flex flex-col gap-2">
        <Loading visible={adding} />
        <form className="" onSubmit={submitHandler}>
          <Input
            ref={inputRef}
            success={success}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            label={"Add Member"}
            icon={
              <IconButton
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
          {!!error && (
            <p className="text-red-500 text-xs py-1 px-3 bg-red-100 rounded-md mt-1">
              {error}
            </p>
          )}
          {showSuggestion && (
            <div className="p-2 flex flex-col gap-2 max-h-32 overflow-auto">
              {data?.map((user) => {
                if (user.email !== myEmail) {
                  return (
                    <div
                      onClick={() => {
                        inputRef.current.children[1].value = user.email;
                        setUserToAdd(user.email);
                        setShowSuggestion(false);
                      }}
                      key={user.id}
                      className="py-1 bg-blue-100 text-blue-500 rounded px-3 hover:bg-blue-200 hover:text-blue-600 cursor-pointer"
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
      </PopoverContent>
    </Popover>
  );
};

export default TeamMenu;

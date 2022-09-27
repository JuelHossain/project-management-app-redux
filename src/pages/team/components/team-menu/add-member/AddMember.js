import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../../../features/auth/authApi";
import { selectUser } from "../../../../../features/auth/authSelector";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../../../features/team/teamApi";
import { debounceHandler, isValidEmail } from "../../../../../utils/lib";
import AddInput from "./AddInput";
import Error from "./Error";
import UserSuggestions from "./UserSuggestions";

const AddMember = ({ id }) => {
  // logged in user
  const { email: myEmail } = useSelector(selectUser);

  // necessary states
  const [userToAdd, setUserToAdd] = useState("");
  const [userData, setUserData] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // setting input
  const setInput = (value) => {
    inputRef.current.children[1].value = value;
  };

  // getting team members
  const {
    data: { members, color, createdBy: { email: createdBy } } = {},
    isLoading: teamLoading,
    error: teamError,
  } = useGetTeamQuery(id);

  // getting users
  const {
    data: users,
    isLoading: usersLoading,
    error: gettingUserError,
  } = useGetUserQuery(userToAdd, {
    skip: !checkUser,
  });

  // adding members mutation
  const [
    editTeam,
    { isLoading: adding, error: addingError, isSuccess: added, reset },
  ] = useEditTeamMutation();

  // setting error or data based on user to add .
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
      setShowSuggestion(false);
      setError("User Not Found");
    } else {
      setShowSuggestion(false);
      setError("");
    }
  }, [userToAdd, users, myEmail, reset]);

  // setting error based on error;
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

  // resetting states after successfull added member
  useEffect(() => {
    if (added) {
      setSuccess(false);
      setUserData(null);
      setUserToAdd("");
      setInput("");
    }
  }, [added]);

  // searching through users
  const doSearch = (value) => {
    setCheckUser(true);
    setUserToAdd(value);
  };

  // handling debounce search
  const handleSearch = debounceHandler(doSearch, 200);

  // handling  add member
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

  // organized loading states
  const loading = usersLoading || teamLoading || adding;
  return (
    <form onSubmit={submitHandler} className="relative">
      <AddInput
        loading={loading}
        color={color}
        creatorEmail={createdBy}
        error={error}
        inputRef={inputRef}
        success={success}
        handleSearch={handleSearch}
        userData={userData}
      />
      <Error
        error={error}
        creatorEmail={createdBy}
        setError={setError}
        setInput={setInput}
        setSuccess={setSuccess}
      />
      <UserSuggestions
        color={color}
        setInput={setInput}
        setUserToAdd={setUserToAdd}
        setShowSuggestion={setShowSuggestion}
        showSuggestion={showSuggestion}
        users={users}
        members={members}
      />
    </form>
  );
};

export default AddMember;

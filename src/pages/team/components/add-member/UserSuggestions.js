import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelector";
import { isUserExist } from "../../../../utils/isUserExist";

const UserSuggestions = ({
  showSuggestion,
  color,
  setInput,
  setUserToAdd,
  setShowSuggestion,
  users,
  members,
}) => {
  const { email: myEmail } = useSelector(selectUser);

  return (
    showSuggestion && (
      <div
        style={{ borderColor: color["200"] }}
        className={`p-2 flex flex-col gap-2 max-h-28 overflow-auto absolute w-full bg-white shadow-md border rounded mt-1 z-10`}
      >
        {users?.map((user) => {
          if (user.email !== myEmail) {
            return (
              <div
                onClick={() => {
                  setInput(user.email);
                  setUserToAdd(user.email);
                  setShowSuggestion(false);
                }}
                key={user.id}
                className={`py-1 px-3 rounded px-3cursor-pointer justify-between flex items-center border shadow-sm cursor-pointer`}
                style={{ ...color.common, borderColor: color?.["200"] }}
              >
                <p> {user?.email}</p>
                {isUserExist(members, user.email) && (
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
          } else {
            return null;
          }
        })}
      </div>
    )
  );
};

export default UserSuggestions;

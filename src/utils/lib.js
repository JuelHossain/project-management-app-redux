// check email valid or not
export const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// get random user
export const randomUser = (users, admin) => {
  const onlyUsers = users?.filter((user) => (admin ? user.admin : !user.admin));
  const randomIndex = Math.floor(Math.random() * (onlyUsers?.length - 1));
  return onlyUsers?.length > 0 ? onlyUsers[randomIndex] : "User Not Found";
};

// check if user exist or not

export const isUserExist = (members, userEmail) => {
  const exist = members?.filter((member) => member.email === userEmail);
  if (exist.length > 0) {
    return true;
  } else {
    return false;
  }
};

// check if team exist or not
export const isTeamExist = (teams, name) => {
  console.log(teams);
  const team = teams?.filter(
    (team) => team.name.toLowerCase() === name?.toLowerCase()
  );
  if (team.length > 0) return true;
  else return false;
};

// get new members after deleting the member
export const getNewMembers = (members, memberId) => {
  return members.filter((existingMember) => existingMember.id !== memberId);
};

// debounce handler
export const debounceHandler = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

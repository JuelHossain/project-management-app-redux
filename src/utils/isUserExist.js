export const isUserExist = (members, userEmail) => {
  const exist = members?.filter((member) => member.email === userEmail);
  if (exist.length > 0) {
    return true;
  } else {
    return false;
  }
};

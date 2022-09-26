export const randomUser = (users, admin) => {
  const onlyUsers = users?.filter((user) => (admin ? user.admin : !user.admin));
  const randomIndex = Math.floor(Math.random() * (onlyUsers?.length - 1));
  return onlyUsers?.length > 0 ? onlyUsers[randomIndex] : "User Not Found";
};

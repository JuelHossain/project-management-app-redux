export const isTeamExist = (teams, name) => {
  const team = teams?.filter(
    (team) => team.name.toLowerCase() === name.toLowerCase()
  );
  if (team.length > 0) return true;
  else return false;
};

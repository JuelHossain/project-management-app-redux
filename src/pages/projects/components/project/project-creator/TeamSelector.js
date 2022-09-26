import { Option, Select } from "@material-tailwind/react";

export default function TeamSelector({
  teams,
  selectedTeam,
  selectedTeamError,
  setSelectedTeam,
}) {
  return (
    <div className="relative">
      {teams && (
        <Select
          color={selectedTeam?.color?.name}
          label={selectedTeamError || "Select A Team"}
          error={!!selectedTeamError}
          menuProps={{
            className: "flex flex-wrap gap-2 justify-between items-center",
          }}
        >
          {teams?.map((team) => {
            return (
              <Option
                onClick={() => {
                  setSelectedTeam(team);
                }}
                key={team.id}
                style={team.color.common}
                className={`flex-grow  text-center text-sm py-1 px-3 hover:scale-105 rounded-md capitalize border flex-shrink-0`}
              >
                <span>{team?.name}</span>
              </Option>
            );
          })}
        </Select>
      )}
      {selectedTeam && (
        <span
          className="absolute top-[10px] left-3 capitalize text-sm px-2 rounded z-0 py-0.5"
          style={selectedTeam.color.common}
        >
          {selectedTeam.name}
        </span>
      )}
    </div>
  );
}

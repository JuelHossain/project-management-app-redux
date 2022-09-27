import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelector";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../../features/team/teamApi";
import { colors } from "../../../../utils/colors";

export default function UpdateColorPicker({ id }) {
  // logged in user
  const { email: myEmail } = useSelector(selectUser);

  // getting team data
  const { data: { color, createdBy: { email: createdBy } } = {} } =
    useGetTeamQuery(id);

  // edit team mutation
  const [editTeam] = useEditTeamMutation();

  return (
    createdBy === myEmail && (
      <div
        className=" p-2 flex border rounded-md flex-wrap gap-1 justify-between"
        style={{
          borderColor: color?.["500"],
        }}
      >
        {Object.keys(colors).map((key) => {
          const color = {
            name: key,
            ...colors[key],
            common: {
              backgroundColor: colors[key]["100"],
              color: colors[key]["500"],
            },
          };
          return (
            <div
              key={key}
              onClick={() => {
                editTeam({
                  id,
                  data: {
                    color,
                  },
                });
              }}
              style={{
                backgroundColor: color?.["500"],
              }}
              className={`hover:scale-150 rounded-full capitalize  w-[18px] h-[18px] duration-200 `}
            />
          );
        })}
      </div>
    )
  );
}

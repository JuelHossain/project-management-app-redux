export default function MembersTitle({ members, color }) {
  return (
    <div className="flex gap-0.5  py-1 ">
      <p>Members</p>
      <p className={`py-0.5 px-1.5 rounded-md text-xs `} style={color.common}>
        {members?.length}
      </p>
    </div>
  );
}

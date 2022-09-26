export default function ProjectTitle({ teamName, color }) {
  return (
    <p
      className={`font-bold flex-shrink-0 py-0.5 px-2 rounded-md capitalize`}
      style={{
        backgroundColor: color["500"],
        color: color["50"],
      }}
    >
      Project Of {teamName} Team
    </p>
  );
}

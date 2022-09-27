export default function MenuHeader({ color, name, children }) {
  return (
    <div className="flex justify-between gap-2">
      <p
        className={`text-lg  font-bold`}
        style={{
          color: color?.common?.color,
        }}
      >
        Team {name}
      </p>
      {children}
    </div>
  );
}

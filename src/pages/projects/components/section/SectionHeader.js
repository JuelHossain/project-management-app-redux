import React from "react";

const SectionHeader = ({ Add, name, count }) => {
  return (
    <div className="flex items-center flex-shrink-0 h-10 px-2 justify-between">
      <div className="flex gap-2">
        <span className="block text-sm font-semibold capitalize">{name}</span>
        <span className="flex items-center justify-center w-5 h-5  text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {count}
        </span>
      </div>
      {Add && <Add />}
    </div>
  );
};

export default SectionHeader;

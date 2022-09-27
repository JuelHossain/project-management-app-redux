import ScrollBar from "react-perfect-scrollbar";

const TeamCardContainer = ({ children }) => {
  return (
    <ScrollBar>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10 my-4   gap-2 sm:gap-4 overflow-auto">
        {children}
      </div>
    </ScrollBar>
  );
};

export default TeamCardContainer;

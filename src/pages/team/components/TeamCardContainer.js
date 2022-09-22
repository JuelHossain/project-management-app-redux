import PerfectScrollbar from "react-perfect-scrollbar";

const TeamCardContainer = ({ children }) => {
  return (
    <PerfectScrollbar>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10 my-4   gap-2 sm:gap-4 overflow-auto">
        {children}
      </div>
    </PerfectScrollbar>
  );
};

export default TeamCardContainer;

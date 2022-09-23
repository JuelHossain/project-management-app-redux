import PerfectScrollbar from "react-perfect-scrollbar";

const SectionContainer = ({ children }) => {
  return (
    <PerfectScrollbar className=" flex flex-grow px-4 sm:px-10 mt-4 overflow-auto gap-4 justify-between">
      {children}
    </PerfectScrollbar>
  );
};

export default SectionContainer;

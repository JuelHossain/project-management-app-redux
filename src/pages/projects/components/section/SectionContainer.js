import PerfectScrollbar from "react-perfect-scrollbar";

const SectionContainer = ({ children }) => {
  return (
    <PerfectScrollbar className=" flex flex-grow px-10 mt-4 overflow-auto gap-4">
      {children}
    </PerfectScrollbar>
  );
};

export default SectionContainer;

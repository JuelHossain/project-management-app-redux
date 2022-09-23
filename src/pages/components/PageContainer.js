import ScrollBar from "react-perfect-scrollbar";

const PageContainer = ({ children }) => {
  return (
    <ScrollBar className="flex-1 flex flex-col h-full w-full overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 relative">
      {children}
    </ScrollBar>
  );
};

export default PageContainer;


const PageContainer = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 relative">
      {children}
    </div>
  );
};

export default PageContainer;

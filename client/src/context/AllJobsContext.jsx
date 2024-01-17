import { useContext, createContext } from "react";

const AllJobsContext = createContext();

function AllJobsCxtProvider({ children, data }) {
  return (
    <AllJobsContext.Provider value={{ data }}>
      {children}
    </AllJobsContext.Provider>
  );
}

function useAllJobsContext() {
  const context = useContext(AllJobsContext);
  if (context === undefined)
    throw new Error("AllJobsContext must be used within a AllJobsCtxProvider");
  return context;
}

export { AllJobsCxtProvider, useAllJobsContext };

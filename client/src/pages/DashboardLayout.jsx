import { Outlet, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { BigSidebar, Navbar, SmallSidebar, Loading } from "../components";
import { DashboardCtxProvider } from "../context/DashboardContext";
import customFetch from "../../utils/customFetch";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/login");
  }
};

const DashboardLayout = ({ queryClient }) => {
  const user = useQuery(userQuery)?.data;

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <DashboardCtxProvider userData={user} queryClient={queryClient}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardCtxProvider>
  );
};

export default DashboardLayout;

import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar, Loading } from "../components";
import { DashboardCtxProvider } from "../context/DashboardContext";
import customFetch from "../../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/login");
  }
};

const DashboardLayout = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <DashboardCtxProvider userData={data}>
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

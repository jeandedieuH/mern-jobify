import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="Current users"
        count={users}
        color="#e9b949"
        icon={<FaSuitcaseRolling />}
        bcg="#fcefc7"
      />
      <StatItem
        title="Total jobs"
        count={jobs}
        color="#647acb"
        icon={<FaCalendarCheck />}
        bcg="#d1e5f9"
      />
    </Wrapper>
  );
};

export default Admin;

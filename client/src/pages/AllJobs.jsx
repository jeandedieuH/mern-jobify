import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { JobsContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { AllJobsCxtProvider } from "../context/AllJobsContext";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/jobs", {
      params,
    });
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllJobs = () => {
  const { data } = useLoaderData();
  return (
    <AllJobsCxtProvider data={data}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsCxtProvider>
  );
};

export default AllJobs;

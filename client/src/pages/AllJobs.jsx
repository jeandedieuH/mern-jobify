import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { JobsContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { AllJobsCxtProvider } from "../context/AllJobsContext";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { jobStatus, jobType, sort, search, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      page ?? 1,
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      return data;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };
const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));

  return (
    <AllJobsCxtProvider data={data}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsCxtProvider>
  );
};

export default AllJobs;

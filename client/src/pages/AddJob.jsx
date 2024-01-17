import { FormRow, SubmitBtn } from "../components";
import { FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { useDashboardContext } from "../context/DashboardContext";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/jobs", data);
    toast.success("Job added successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AddJob = () => {
  const { user } = useDashboardContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;

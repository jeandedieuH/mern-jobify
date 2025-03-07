import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../utils/constants";
import { useAllJobsContext } from "../context/AllJobsContext";

const SearchContainer = () => {
  const submit = useSubmit();
  const { search, jobStatus, jobType, sort } = useAllJobsContext();

  const debounce = (onChange) => {
    let timeoutId;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onChange(form);
      }, 750);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link className="btn btn-block form-btn" to="/dashboard/all-jobs">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;

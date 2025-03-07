import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, redirect } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useDashboardContext } from "../context/DashboardContext";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("avatar");
    if (file && file.size > 500000) {
      toast.error("Image size too large");
      return null;
    }
    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully");
      return redirect("/dashboard/");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };
const Profile = () => {
  const { user } = useDashboardContext();
  const { name, email, lastName, location } = user;

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            name="name"
            defaultValue={name}
            labelText="name"
          />
          <FormRow
            type="text"
            name="lastName"
            defaultValue={lastName}
            labelText="last name"
          />
          <FormRow
            type="email"
            name="email"
            defaultValue={email}
            labelText="email"
          />
          <FormRow
            type="text"
            name="location"
            defaultValue={location}
            labelText="location"
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;

import { Form, Link, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    return err;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = { email: "test@test.com", password: "secret123" };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Access granted to test");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Don't have an account?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;

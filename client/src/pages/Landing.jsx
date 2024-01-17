import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby tumeric sus gluten-free dreamcatcher health goth gentrify
            retro, pabst artisan sriracha food truck humblebrag drinking vinegar
            snackwave. Pinterest bushwick listicle gentrify, Brooklyn freegan
            live-edge stumptown kickstarter.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn login-link">
            Login/Demo user
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

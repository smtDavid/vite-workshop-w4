import left from "../assets/img/left.png";
import logoLg from "../assets/img/logo-lg.png";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
          <div className="side">
            <a href="#">
              <img className="logoImg" src={logoLg} alt="123" />
            </a>
            <img className="d-m-n" src={left} alt="workImg" />
          </div>
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;

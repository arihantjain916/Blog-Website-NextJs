import { Login } from "../../../components/user/login";
import { Navbar } from "../../../components/Navbar";

const login = () => {
  return (
    <>
      <div>
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <Login />
      </div>
    </>
  );
};

export default login;

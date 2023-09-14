import { Register } from "../../../components/user/register";
import { Navbar } from "../../../components/Navbar";

function register() {
  return (
    <div>
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <Register />
    </div>
  );
}

export default register;

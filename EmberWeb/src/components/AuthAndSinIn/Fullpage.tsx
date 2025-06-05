import AuthPage from "./Authpage";
import Navbar from "../MenuBar/Navbar";

const Fullpage = () => {
  return (
    <div class="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-4">
      <Navbar />
      <AuthPage />
    </div>
  );
};

export default Fullpage;

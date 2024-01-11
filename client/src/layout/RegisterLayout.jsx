import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegisterLayout = () => {
  return (
    <div>
      <Navbar />
        <Outlet />
      <Footer/>
    </div>
  )
}

export default RegisterLayout;
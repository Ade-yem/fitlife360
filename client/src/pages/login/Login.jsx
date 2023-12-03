import {useState} from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import Gym from '../../assets/gym3.jpg';
import { useGlobalContext } from '../../context/context';
import toast from 'react-hot-toast';

/**
 * Login - Login page
 * @returns nothing
 */

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()
  const context = useGlobalContext()
  
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Logging in", {id: "loading"})
      await context?.login(formData);
      toast.success("Login successful", {id: "loading"})
      navigate(context?.user?.role === "member" ? "/member" : context?.user?.role === "trainer" ? "/trainer" : "/admin")
    } catch (error) {
      toast.error("Login Failed", {id: "loading"})
      console.error("Error: ", error)
    }
  };
  
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <Navbar />
      <div className='w-full min-h-[100vh] bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto flex flex-col-reverse gap-8 md:flex-row items-center'>
          <div className='w-[80%] md:w-1/2 border-2 border-primary rounded-md font-font2 p-4'>
            <h1 className='md:text-4xl sm:text-3xl text-2xl text-center font-bold py-2 font-font1 text-primary'>
              Welcome back, please login to continue
            </h1>
            <form onSubmit={handleUserSubmit}>
              <div className="relative mb-4">
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleUserChange}
                />
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleUserChange}
                />
              </div>
              <button
                type="submit"
                className="mt-2 p-3 w-full rounded-md bg-primary flex space-x-4 justify-center items-center text-white hover:bg-primary-dark"
              >Login</button>
              <p className='mt-3'>Don&apos;t have an account? <Link to={'/register'} className=' text-primary underline'>Register</Link></p>
            </form>
          </div>
          <img className='hidden md:block w-[500px] h-[400px] mx-auto my-4 ' src={Gym} alt='/' />
        </div>
       
      </div>
      <Footer />
    </>
  )
}

export default Login;
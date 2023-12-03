import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Gym from '../../assets/gym1.jpg';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import { useGlobalContext } from '../../context/context';
import { toast } from "react-hot-toast";

/**
 * RegisterUser - usser signup page
 * @returns nothing
 */


const RegisterUser = () => {
  const initialState = {
    name: '',
    email: '',
    gender: '',
    phone: '',
    password: '',
    confPassword: '',
    picture: null,
  }
  const context = useGlobalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confPassword) {
    formData.gender.toLowerCase()
    try {
      toast.loading('Signing you up', {id: "signup"})
      const res = await context?.signup(formData)
      toast.success(`${res.message}`, {id: "signup"});
      setFormData(initialState);
      navigate('/register/role');
    } catch (error) {
      console.error("Error " + error);
      toast.error(`${error}`, {id: 'signup'});
    }
    } else {
       toast.error('Passwords do not match', {id: 'signup'});
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        picture: file, // Store the image data
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto flex flex-col gap-8 md:flex-row md:items-center'>
          <div className='hidden md:block md:w-1/2'>
            <img className='w-[400px] h-[400px] mx-auto my-4 rounded-lg shadow-lg' src={Gym} alt='Gym' />
          </div>
          <div className='md:w-1/2 border-2 border-primary rounded-md font-font2 p-4'>
            <div>
            
            </div>
            <h1 className='md:text-4xl sm:text-3xl text-2xl text-center font-bold py-2 font-font1 text-primary'>
              Registration
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative mb-4">
                <label htmlFor="picture">Profile picture</label>
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="file"
                  accept="image/*" // Accept only image files
                  name="picture"
                  required
                  onChange={handlePictureChange}
                />
              </div>
              <div className="relative mb-4">
                <AiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="password"
                  name="confPassword"
                  placeholder="Confirm Password"
                  value={formData.confPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="mt-2 p-3 w-full rounded-md bg-primary flex space-x-4 justify-center items-center text-white hover:bg-primary-dark"
              >Register</button>
              <p className='mt-3'>Already have an account? <Link to={'/login'} className=' text-primary underline'>Login</Link></p>
            </form>
           
          </div>
          
        </div>
      </div>
    </>
  );
};

export default RegisterUser;

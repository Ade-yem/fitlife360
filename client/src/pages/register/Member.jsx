import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Gym from '../../assets/gym1.jpg';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../../context/context';

const MemberProfile = () => {
  const navigate = useNavigate();
  const context = useGlobalContext()
  // Initialize form state with default values
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      toast.loading('Signing you up', {id: "signing"})
      const res = await context.registerMember(formData)
      toast.success(`${res}`, {id: "signing"});
      setFormData({
        weight: '',
        height: '',
        age: '',
      })
      navigate('/member');
    } catch(error) {
      console.error('Error:', error);
      toast.error(error, {id: "signing"});
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
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-8 md:flex-row md:items-center">
          <div className="hidden md:block md:w-1/2">
            <img
              className="w-[400px] h-[400px] mx-auto my-4 rounded-lg shadow-lg"
              src={Gym}
              alt="Gym"
            />
          </div>
          <div className="md:w-1/2 border-2 border-primary rounded-md font-font2 p-4">
            <div>
            </div>
            <h1 className="md:text-4xl sm:text-3xl text-2xl text-center font-bold py-2 font-font1 text-primary">
              Member Registration
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="number"
                  name="weight"
                  placeholder="Input your weight in Kilograms"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="number"
                  name="height"
                  placeholder="Input your height in meters"
                  value={formData.height}
                  onChange={handleChange}
                />
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative mb-4">
                <AiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="number"
                  name="age"
                  placeholder="Input your age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="mt-2 p-3 w-full rounded-md bg-primary flex space-x-4 justify-center items-center text-white hover:bg-primary-dark"
              >Create Profile</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberProfile;

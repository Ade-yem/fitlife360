import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { FaTrashAlt } from 'react-icons/fa';
import { LiaTimesSolid } from 'react-icons/lia';
import axios from 'axios';
import Gym from '../../assets/gym1.jpg';

const TrainerProfile = ({ setTrainer, setLogin, token }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    picture: null,
    weight: '',
    height: '',
    age: '',
    bio: '',
    specializations: [],
    experience: '',
  });

  const [approaches, setApproaches] = useState(['']); // Initialize with one approach input

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const url = import.meta.env.VITE_BACKEND_URL;

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({
          ...formData,
          picture: reader.result, // Store the base64-encoded image data
        });
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleApproachChange = (index, value) => {
    const updatedApproaches = [...approaches];
    updatedApproaches[index] = value;
    setApproaches(updatedApproaches);
  };

  const addApproachInput = () => {
    setApproaches([...approaches, '']); // Add a new empty approach input
  };

  const removeApproachInput = (index) => {
    const updatedApproaches = [...approaches];
    if (updatedApproaches.length > 1) {
    updatedApproaches.splice(index, 1); // Remove the approach input at the specified index
    setApproaches(updatedApproaches);
    }
  };

  const handleAddSpecialization = () => {
    // Add the specialization to the array and clear the input field
    if (formData.specializations) {
      setFormData({
        ...formData,
        specializations: [...formData.specializations, formData.specialization],
        specialization: '', // Clear the input field
      });
    } else {
      setFormData({
        ...formData,
        specializations: [formData.specialization],
        specialization: '', // Clear the input field
      });
    }
  };
 
  const handleRemoveSpecialization = (index) => {
    // Remove the specialization at the given index
    const updatedSpecializations = [...formData.specializations];
    updatedSpecializations.splice(index, 1);
    setFormData({
      ...formData,
      specializations: updatedSpecializations,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      picture: formData.picture,
      age: formData.age,
      bio: formData.bio,
      specializations: formData.specializations.join(', '),
      approaches: approaches.filter((approach) => approach.trim() !== ''), // Remove empty approaches
      experience: formData.experience,
    };
    console.log(requestData);
    await axios
      .post(`${url}/api/trainer/create_profile`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage(response.data.message);
        setLogin(true);
        setFormData({
          picture: null,
          age: '',
          bio: '',
          specializations: [],
          experience: '',
        });
        setApproaches(['']); // Reset to one empty approach input
        navigate('/trainer');
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <>
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-8 md:flex-row md:items-center">
          <div className="hidden md:block md:w-1/2">
            <img
                className="w-full h-full mx-auto my-4"
                src={Gym}
                alt="Gym"
              />
          </div>
          <div className="md:w-1/2 border-2 border-primary rounded-md font-font2 p-4">
            {/* Your form */}
            <h1 className='text-center text-2xl font-bold m-5'>Create your Trainer&apos;s profile</h1>
            <form onSubmit={handleSubmit}>
              {/* Other inputs */}
              <div className="relative mb-4">
                <label htmlFor="picture">Profile picture</label>
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="file"
                  accept="image/*" // Accept only image files
                  name="picture"
                  onChange={handlePictureChange}
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="bio">Bio (Max 300 characters)</label>
                <textarea
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="bio"
                  placeholder="Input your bio"
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={300} // Set maximum length for bio
                />
              </div>
              <div className="relative mb-4">
                <label>Specializations</label>
                <div className="flex flex-wrap">
                  {formData.specializations.map((specialization, index) => (
                    <div
                      key={index}
                      className="bg-blue-200 rounded-md p-1 m-1 flex items-center"
                    >
                      {specialization}
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialization(index)}
                        className="ml-2 p-1 rounded-full bg-red-500 text-white"
                      >
                        <LiaTimesSolid className='text-white'/>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                    type="text"
                    name="specialization"
                    placeholder="Enter specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="mt-1 ml-2 rounded-md p-2 hover:-translate-y-1 hover:bg-opacity-30 bg-green-500 text-white"
                    onClick={handleAddSpecialization}
                  >
                    <GrAdd className='text-white'/>
                  </button>
                </div>
              </div>
              <div className="relative mb-4">
                <label>Approaches</label>
                {approaches.map((approach, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      className="pl-10 p-3 flex-1 rounded-md text-black border-2 border-primary"
                      type="text"
                      placeholder={`Enter approach #${index + 1}`}
                      value={approach}
                      onChange={(e) => handleApproachChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="mt-1 ml-2 rounded-md p-2 hover:-translate-y-1 hover:bg-opacity-30 bg-red-500 text-white"
                      onClick={() => removeApproachInput(index)}
                    >
                      <FaTrashAlt/>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 p-2 rounded-full bg-green-500 text-white"
                  onClick={addApproachInput}
                >
                  Add Approach
                </button>
              </div>
              {/* Other inputs */}
              <button
                type="submit"
                className="mt-2 p-3 w-full rounded-md bg-primary text-white hover:bg-primary-dark"
              >
                Register
              </button>
            </form>
          </div>
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TrainerProfile;

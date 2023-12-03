import { useNavigate } from 'react-router-dom';
import trainer from '../../assets/trainer.jpg';
import trainee from '../../assets/trainee.jpg';
import { useGlobalContext } from '../../context/context';
import toast from 'react-hot-toast';


const RegisterRole = () => {
  const navigate = useNavigate()
  const context = useGlobalContext()
  const apply = async (role) => {
    try {
      toast.loading(`applying as ${role}`, {id: "role"})
      const res = await context.select(role)
      toast.success(`${res.message}`, {id: "role"})
      const route = context.user.role === "trainer" ? "trainer" : "member"
      navigate(`/register/${route}`, {replace: true})
    } catch(err) {
      toast.error(`applying as ${role} failed`, {id: "role", duration: 5000})
      console.error(err);
    }
  }

  return (
    <>
    <div className='w-full bg-white py-16 px-4 flex flex-col justify-center text-center'>
      <h2 className='text-2xl font-bold mt-5 mb-2 text-secondary'>Welcome {context.user.name}</h2>
      <p className='text-lg font-medium m-3 text-footer'>Thank you for creating an account with us</p>
      <p className='text-lg font-medium m-3 text-footer'>Do you want to register as?</p>
      <div className="max-w-[1240px] mx-auto flex space-x-4 justify-around items-center">
      <div className="">
        <img className='w-[500px] mx-auto my-4 rounded-lg shadow-lg' src={trainer} alt='/' />
        <button onClick={apply("trainer")} className='bg-primary text-white w-full rounded-md font-medium my-6 mx-auto md:mx-0 py-3 font-font2'>Trainer</button>
      </div>
      
      <div className='flex items-center justify-center mx-3 text-lg text-primary h-full'>
        OR
      </div>
      
      <div className=''>
        <img className='w-[500px] mx-auto my-4 rounded-lg shadow-lg' src={trainee} alt='/' />
        <button onClick={apply("member")} className='bg-primary text-white w-full rounded-md font-medium my-6 mx-auto md:mx-0 py-3 font-font2'>Trainee</button>
      </div>
    </div>


    </div>
    
  </>
  )
}

export default RegisterRole
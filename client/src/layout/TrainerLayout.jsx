import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';


const TrainerLayout = () => {

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 h-screen overflow-y-auto'>
      <Outlet />
      </div>
    </div>
  )
}

export default TrainerLayout

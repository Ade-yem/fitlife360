import { Outlet } from "react-router-dom";
import Sidenav from '../components/Sidenav';

const MemberLayout = () => {
  
 
  return (
    <div className='flex h-screen'>
      <Sidenav />
      
      <div className='flex-1 h-screen overflow-y-auto'>
      <Outlet />
      </div>
    </div>
  )
}

export default MemberLayout;
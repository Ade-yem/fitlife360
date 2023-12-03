import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/login/Login';
import NotFound from './pages/NotFound';
import Classes from './pages/Classes';
// register
import RegisterLayout from './layout/RegisterLayout';
import RegisterRole from './pages/register/Role';
import RegisterUser from './pages/register/UserRegister';
import TrainerProfile from './pages/register/Trainer';
import MemberProfile from './pages/register/Member';
// trainer profile
import WelcomeTrainer from './pages/trainer/Welcome';
import Profile from './pages/trainer/Profile';
import Message from './pages/trainer/Message';
import Schedule from './pages/trainer/Schedule';
import Clients from './pages/trainer/Clients';
import Layout from "./layout/TrainerLayout";
// member profile
import MemberLayout from './layout/MemberLayout';
import Dashboard from './pages/member/Dashboard';
import WelcomeMember from './pages/member/Welcome';
import MemberMessages from './pages/member/Messages';
import MemberClasses from './pages/member/Classes';
import Progress from './pages/member/Progress';
import MemberWorkouts from './pages/member/Workout';
import Trainers from './pages/Trainers';
import { useGlobalContext } from './context/context';

/**
 * App - the App
 * @returns nothing
 */

function App() {
  const context = useGlobalContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<RegisterLayout />} >
          <Route index element={<RegisterUser />} />
          <Route path='role' element={<RegisterRole />} />
          <Route path="member" element={<MemberProfile />} />
          <Route path="trainer" element={<TrainerProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route> 

        {context?.isLoggedIn &&(
          <Route path="/trainer" element={<Layout />}>
            <Route index element={<WelcomeTrainer />} />
            <Route path="profile" element={<Profile />} />
            <Route path="messages" element={<Message />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="clients" element={<Clients />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
        {context?.isLoggedIn &&(
          <Route path="/member" element={<MemberLayout />} >
            <Route index element={<WelcomeMember />} />
            <Route path="profile" element={<Dashboard />} />
            <Route path="messages" element={<MemberMessages />} />
            <Route path="workouts" element={<MemberWorkouts />} />
            <Route path="classes" element={<MemberClasses />} />
            <Route path="progress" element={<Progress />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

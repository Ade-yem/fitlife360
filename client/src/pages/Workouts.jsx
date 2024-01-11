import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { getExercises } from "../api/workouts";
import ExerciseCard from "../components/ExerciseCard";
import ExercisePage from "../components/ExercisePage";
import Nothing from "../components/Nothing";

const Workouts = () => {
  const type = [
    'cardio', 'olympic_weightlifting', 'plyometrics', 'powerlifting',
    'strength', 'stretching',' strongman'
  ]
  const muscle = [
    'abdominals', 'abductors', 'adductors', 'biceps', 'calves',
    'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back',
    'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'
  ]
  const difficulty = [
    'beginner', 'intermediate', 'expert'
  ]
  const [params, setParams] = useState({})
  const [name, setName] = useState('')
  const [exercises, setExercises] = useState([])
  const [modal, setModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const updateParams = (filterType, value) => {
    if (params[filterType] === value) {
      const data = {...params}
      delete(data[[filterType]])
      setParams(data)  
    }
    else setParams((prevParams) => ({...prevParams, [filterType]: value}))
    console.log(params)
  }
  const handleNameChange = (event) => {
    const value = event.target.value;
    updateParams('name', value);
  };
  const handleClick = (exercise) => {
    setSelectedItem(exercise)
    setModal(true)
  }
  
 
  useEffect(() => {
    async function fetchData () {
      try {
        toast.loading('Loading Exercises', {id: 'loading'})
        const data = await getExercises(params)
        toast.success('Loading Exercises Successful', {id: 'loading'})
        setExercises(data)
      } catch (error) {
        console.log(error)
        toast.loading('Loading Exercises Failed', {id: 'loading'})
      }
    }
    fetchData()
  }, [params])
  

  return (
    <>
    <header>< Navbar/></header>
    <main className="flex m-2">
      <div className="min-w-[200px] border-r">
        <div className="m-2 mb-4 relative z-0">
          <input 
            type="text" name="name" id="name"
            value={name} 
            onBlur={handleNameChange}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-0 py-2 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" "
          />
          <label htmlFor="name" className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
        </div>
        <div><Filter type={'type'} items={type} updateParams={updateParams} /></div>
        <div><Filter type={'muscle'} items={muscle} updateParams={updateParams} /></div>
        <div><Filter type={'difficulty'} items={difficulty} updateParams={updateParams} /></div>
      </div>
      { exercises.length === 0 ? <Nothing /> : (
        <div className="relative z-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
            {
              exercises.map((exercise, index) => (
                <div key={index} onClick={() => handleClick(exercise)}><ExerciseCard  exercise={exercise} /></div>
              ))
            }
          </div>
            {
              modal && selectedItem && (
                <ExercisePage exercise={selectedItem} setModal={setModal}/>
              )
            }
        </div>)
      }
    </main>
    <footer><Footer /></footer>
    </>
  );
}
 
export default Workouts;
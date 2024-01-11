import axios from "axios";

export const getExercises = async (params={}) => {
  const options = {
    method: 'GET',
    url: import.meta.env.VITE_EXERCISE_URL,
    params,
    headers: {
      'X-Api-Key': import.meta.env.VITE_X_Api_Key,
    },
    withCredentials: false
  };

  try {
    const response = await axios.request(options);
    const data = await response.data;
    return data
  } catch (error) {
    console.error(error);
  }
}

export const planWorkout = async (params) => {
  if (!params) throw new Error('no parameter added')
  const options = {
    method: 'GET',
    url: 'https://workout-planner1.p.rapidapi.com/',
    params: {
      time: '30',
      muscle: 'biceps',
      location: 'gym',
      equipment: 'dumbbells'
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_X_RapidAPI_Key,
      'X-RapidAPI-Host': 'workout-planner1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const data = await response.data;
    return data
  } catch (error) {
    console.error(error);
  }
}
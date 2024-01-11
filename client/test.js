import { getExercises } from "./src/api/workouts.js";

const res = await getExercises()
console.log(res)
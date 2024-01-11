// ExerciseCard.jsx

import PropTypes from 'prop-types'

const ExerciseCard = ({ exercise }) => {
  const { name, type, muscle, equipment, difficulty } = exercise;
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-5 m-4 cursor-pointer hover:bg-primary/20">
      <div className="flex justify-between">
        <span className="text-gray-600 capitalize">{type.split('_').join(' ')}</span>
        <span className={`${difficulty === 'beginner' ? 'bg-green-500' : difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'} text-white py-1 px-3 rounded-full text-xs uppercase`}>
          {difficulty}
        </span>
      </div>
      <h2 className="text-xl font-semibold mt-4 border-b-2 pb-4">{name}</h2>
      <div className='border-b-2 pt-4'>
        <span className='text-sm text-gray-400'>Muscle</span>
      <p className="text-gray-500 capitalize">{muscle.split('_').join(' ')}</p>
    </div>
    <div className='border-b-2 pt-4'>
      <span className='text-sm text-gray-400'>Equipment</span>
      <p className="text-gray-500">{equipment}</p>
    </div>
    </div>
  );
};

ExerciseCard.propTypes = {
    exercise: PropTypes.object.isRequired
}

export default ExerciseCard;

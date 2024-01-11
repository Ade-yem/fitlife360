// ExercisePage.jsx

import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react';
import { FaHeart, FaTimes } from 'react-icons/fa';

const ExercisePage = ({ exercise, setModal }) => {
  const { name, type, muscle, equipment, difficulty, instructions } = exercise;
  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModal(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setModal]);
  return (
    <div className="bg-white rounded-lg overflow-auto flex flex-col shadow-md p-6 m-4 z-10 transition-all duration-200 fixed bottom-0 h-[90%] page" ref={modalRef}>
        <div className='flex justify-end my-4 space-x-3 cursor-pointer'>
            <FaHeart size={25} className='text-primary hover:text-opacity-60' />
            <FaTimes size={25} className='text-primary' onClick={() => setModal(false)} />
        </div>
        
      <div className="flex justify-between">
        <span className="text-gray-600 capitalize">{type.split('_').join(' ')}</span>
        <span className={`${difficulty === 'beginner' ? 'bg-green-500' : difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'} text-white py-1 px-3 rounded-full text-xs uppercase`}>
          {difficulty}
        </span>
      </div>
      <h2 className="text-xl font-semibold mt-4 border-b-2 pb-4">{name}</h2>
      <div className='flex space-x-5 border-b-2'>
      <div className='pt-4'>
        <span className='text-sm text-gray-400'>Muscle</span>
      <p className="text-gray-500 capitalize">{muscle.split('_').join(' ')}</p>
      </div>
      <div className='pt-4'>
        <span className='text-sm text-gray-400'>Equipment</span>
        <p className="text-gray-500">{equipment}</p>
      </div>
      </div>
      <h3 className="text-lg font-semibold mb-2 mt-4">Instructions:</h3>
      <div className="bg-gray-100 p-4 rounded-md border-b-2">
          {
          instructions.trim().split('.').map(instruction => (
          <p className="text-gray-700 leading-relaxed" key={instruction}>{instruction}.</p>
          ))}
      </div>
    </div>
  );
};
ExercisePage.propTypes = {
    exercise: PropTypes.object.isRequired,
    setModal: PropTypes.func
}

export default ExercisePage;
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import {setNrOfPeople, setTime} from '../features/inputs/inputSlice'
import { useNavigate } from 'react-router-dom';

const Start: React.FC = () => {

  const dispatch: AppDispatch = useDispatch()
  const nrOfPeople = useSelector((state: RootState) => state.input.nrOfPeople)
  const time = useSelector((state: RootState) => state.input.time)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleNrOfPeopleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNrOfPeople(Number((event.target.value))))
  }
  
  const handleTimeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTime(event.target.value))
  }

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!nrOfPeople || !time){
          setError('Please fill all fields')
        }else{
          console.log('Nr of people:', nrOfPeople);
          console.log('Time:', time);
          navigate('/questions')
        }
      };

  return (
  
    <section className='container'>
    <motion.section
    className='start'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    >

<div className='header'>
            <img src="images/popcorn.png" alt="" className="logo" />
            <h1 className="start__title">MovieMate</h1>
        </div>
       
<section className='content'>
<form className="start__form" onSubmit={handleSubmit}>
  <label className='label' htmlFor="nrOfPeople">How many people? (Write only a number)</label>
        <div className='start__form-group'>
            <input
            type="number"
            id="nrOfPeople"
            name="nrOfPeople"
            value={nrOfPeople}
            onChange={handleNrOfPeopleChange}
            placeholder='How many people?'
            className='start__input'
            min="1"
            step="1"
            onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                e.preventDefault();
              }
            }}
            />
        </div>
        <div>
        <label className='label' htmlFor="time">How much time do you have?</label>
            <input
            type="text"
            id="time"
            name="time"
            value={time}
            onChange={handleTimeChange}
            placeholder='2 hours'
            className='start__input'
            />
        </div>
        {error && (
  <motion.p
    className="error-message"
    initial={{ scale: 1, opacity: 1 }}
    animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
    transition={{
      duration: 1,
      repeat: Infinity,
      repeatType: "loop"
    }}
  >
    {error}
  </motion.p>
)}
        <button className='submit-button' type="submit">Start</button>
        </form>
        </section>

    </motion.section>
       
</section>
        
 
    

  )
}

export default Start
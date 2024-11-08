import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import {setfavouriteMovies, toggleGenre, setActors, setSelectedGenres, resetCheckboxes} from '../features/inputs/inputSlice'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Questions: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [favouriteMovie, setfavouriteMovie] = useState('')
    const [favouriteActor, setfavouriteActor] = useState('')

    const nrOfPeople = useSelector((state: RootState) => state.input.nrOfPeople)
    const [currentCountPerson, setCurrentCountPerson] = useState(1)

    const favouriteMovies = useSelector((state: RootState) => state.input.favouriteMovies)
    
    const genre = useSelector((state: RootState) => state.input.genre)
    const actors = useSelector((state: RootState) => state.input.actors)
    const selectedGenre = useSelector((state: RootState) => state.input.selectedGenres)

    const [error, setError] = useState('')

    function personNrCount(){
        if(currentCountPerson < nrOfPeople){
            setCurrentCountPerson((prev) => prev +1)
        }
        
    }

    const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target
        dispatch(toggleGenre({ name: name as keyof typeof genre, checked }));
    }

    const handleFavouriteMovieChange= (e:React.ChangeEvent<HTMLTextAreaElement>)=> {
        setfavouriteMovie(e.target.value)
        
    }
    
    const handleFavouriteActorChange= (e:React.ChangeEvent<HTMLTextAreaElement>)=> {
        setfavouriteActor(e.target.value)
        
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        personNrCount()

        if(!favouriteMovie || !selectedGenre || !favouriteActor){
            setError('Please fill all fields')
        

        }else{
            if(currentCountPerson >= nrOfPeople){

                const selectedGenres = Object.keys(genre).filter(
                    (key) => genre[key as keyof typeof genre] === true
                );
        
                dispatch(setSelectedGenres(selectedGenres));
                dispatch(setfavouriteMovies(favouriteMovie))
                dispatch(setActors(favouriteActor))
                navigate('/result')
    
            }else{
    
                const selectedGenres = Object.keys(genre).filter(
                    (key) => genre[key as keyof typeof genre] === true
                );
            
        
                dispatch(setSelectedGenres(selectedGenres));
                dispatch(setfavouriteMovies(favouriteMovie))
                dispatch(setActors(favouriteActor))
                dispatch(resetCheckboxes())
                setfavouriteMovie('')
                setfavouriteActor('')
            
    
            }
        }

        
        
      };

      useEffect(() => {
        console.log('Favourite movie:', JSON.parse(JSON.stringify(favouriteMovies)));
        console.log('Favourite Actor:', JSON.parse(JSON.stringify(actors)));
        console.log('Genres:', JSON.parse(JSON.stringify(genre)));
        console.log('Selected Genre:', JSON.parse(JSON.stringify(selectedGenre)));
    }, [favouriteMovies, actors, genre]);

  return (
    <section className="container questions">
        <motion.section 
        className="questions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <div className='header'>
            <img src="images/popcorn.png" alt="" 
            className="logo" />
            <h1 className="start__title">Person nr: {currentCountPerson}</h1>
        </div>

        <section className="content">
        
        <form onSubmit={handleSubmit} className="questions__form">
            <p className="questions__text">What’s your favorite movie and why?</p>
            <textarea 
            name="favouriteMovie" 
            id="favouriteMovie"
            value={favouriteMovie}
            onChange={handleFavouriteMovieChange} 
            className="questions__textarea"
            placeholder='...write something'
            >
                
            </textarea>
            <p className="questions__text">Are you in the mood for something
            new or a classic?</p>
            
            <input 
            type="checkbox"
            name="new"
            id="new"
            checked={genre.new}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label className="questions__checkbox-label" htmlFor="new">
                New
            </label>
            
            
            
            <input 
            type="checkbox"
            name="classic"
            id="classic"
            checked={genre.classic}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label className="questions__checkbox-label" htmlFor="classic">
                Classic
            </label>

            <p className="questions__text">What are you in the mood for?</p>

            
            <input 
            type="checkbox"
            name="fun"
            id="fun"
            checked={genre.fun}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label className="questions__checkbox-label" htmlFor="fun">
                Fun
            </label>
            
            
            <input 
            type="checkbox"
            name="serious"
            id="serious"
            checked={genre.serious}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label className="questions__checkbox-label" htmlFor="serious">
                Serious
            </label>
            
            
            <input 
            type="checkbox"
            name="inspiring"
            id="inspiring"
            checked={genre.inspiring}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label htmlFor="inspiring" className="questions__checkbox-label" >
                Inspiring
            </label>
            
            
            
            <input 
            type="checkbox"
            name="scary"
            id="scary"
            checked={genre.scary}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label htmlFor="scary" className="questions__checkbox-label">
            Scary
            </label>
            
            <input 
            type="checkbox"
            name="psychological"
            id="psychological"
            checked={genre.psychological}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label htmlFor="psychological" className="questions__checkbox-label">
            Psychological
            </label>
            
            <input 
            type="checkbox"
            name="christmas"
            id="christmas"
            checked={genre.christmas}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label htmlFor="christmas" className="questions__checkbox-label">
            Christmas🎄
            </label>
            
            <input 
            type="checkbox"
            name="action"
            id="action"
            checked={genre.action}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label htmlFor="action" className="questions__checkbox-label">
            Action
            </label>
            
            <input 
            type="checkbox"
            name="thriller"
            id="thriller"
            checked={genre.thriller}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label htmlFor="thriller" className="questions__checkbox-label">
            Thriller
            </label>
            
            <input 
            type="checkbox"
            name="animated"
            id="animated"
            checked={genre.animated}
            onChange={handleCheckboxChange} 
            className="questions__checkbox" 
            />
            <label htmlFor="animated" className="questions__checkbox-label">
            Animated
            </label>
            

            <p className="questions__text">Who's your favorite movie character or actor, and why?</p>
            <textarea 
            name="favouriteActor" 
            id="favouriteActor"
            value={favouriteActor}
            onChange={handleFavouriteActorChange} 
            className="questions__textarea"
            placeholder='...write something'
            >
            </textarea>
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

export default Questions
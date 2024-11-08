import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckboxState{
    new: boolean;
    classic: boolean;
    fun: boolean;
    serious: boolean;
    inspiring: boolean;
    scary: boolean;
    psychological: boolean;
    christmas: boolean;
    action: boolean;
    thriller: boolean;
    animated: boolean;
}  

interface InputState {
    nrOfPeople: number;
    time: string;
    favouriteMovies: string[];
    genre: CheckboxState;
    selectedGenres: string[]; 
    actors: string[];
  }



const initialState: InputState = {
    nrOfPeople: 1,
    time: '',
    favouriteMovies: [],
    genre: {
        new: false,
        classic: false,
        fun: false,
        serious: false,
        inspiring: false,
        scary: false,
        psychological: false,
        christmas: false,
        action: false,
        thriller: false,
        animated: false,
    },
    selectedGenres: [],
    actors: [],
}

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers:{
        setNrOfPeople: (state, action:
            PayloadAction<number>) => {
                state.nrOfPeople = action.payload
                console.log("nr of people", state.nrOfPeople)
            },
        setTime: (state, action:
            PayloadAction<string>) => {
                state.time = action.payload
                console.log("time", state.time)
            },
        setfavouriteMovies:(state, action: PayloadAction<string>) => {
            state.favouriteMovies.push(action.payload) 
        },       
        toggleGenre:(state, action: PayloadAction<{name: keyof CheckboxState; checked: boolean}>) => {
            const {name, checked} = action.payload
            state.genre[name] = checked
        },
        setSelectedGenres: (state, action: PayloadAction<string[]>) => {
            const newGenres = action.payload.filter(
                (genre) => !state.selectedGenres.includes(genre)
            )
            state.selectedGenres.push(...newGenres)
        }, 

        setActors:(state, action: PayloadAction<string>) => {
            state.actors.push(action.payload)
        },
        
        resetCheckboxes:(state) => {
            for(let key in state.genre){
                state.genre[key as keyof CheckboxState] = false
            }
        },
               
    }
})

export const {setNrOfPeople, setTime, setfavouriteMovies, toggleGenre, setSelectedGenres, setActors, resetCheckboxes} = inputSlice.actions
export default inputSlice.reducer
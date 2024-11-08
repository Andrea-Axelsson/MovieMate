
import React, { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { openai, supabase, tmdbApiKey } from '../../config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

type MatchData = {content: string}

const Result = () => {


  const navigate = useNavigate()
  const nrOfPeople = useSelector((state: RootState) => state.input.nrOfPeople)
  const time = useSelector((state: RootState) => state.input.time)
  const favouriteMovies = useSelector((state: RootState) => state.input.favouriteMovies)
  const genre = useSelector((state: RootState) => state.input.genre)
  const actors = useSelector((state: RootState) => state.input.actors)
  const selectedGenre = useSelector((state: RootState) => state.input.selectedGenres)
  
  

  useEffect(() => {
    console.log('Favourite movie:', JSON.parse(JSON.stringify(favouriteMovies)));
    console.log('Favourite Actor:', JSON.parse(JSON.stringify(actors)));
    console.log('Genres:', JSON.parse(JSON.stringify(genre)));
    console.log('Selected Genre:', JSON.parse(JSON.stringify(selectedGenre)));
  }, [favouriteMovies, actors, genre]);


/* Creating Database--------------------------------*/  

/* Split movies.txt into text chunks.
Return LangChain's "output" – the array of Document objects. */


/* async function splitDocument(document:any){
  const response = await fetch(document)
  const text = await response.text()
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,
    chunkOverlap: 35,
  })

  const output = await splitter.createDocuments([text])
  return output
} */

/* Create an embedding from each text chunk.
Store all embeddings and corresponding text in Supabase. */

/* useEffect(() => {
  async function createAndStoreEmbeddings() {
    const chunkData = await splitDocument("/src/movies.txt");
    const data = await Promise.all(
      chunkData.map(async (chunk) => {
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: chunk.pageContent
        });
        return { 
          content: chunk.pageContent, 
          embedding: embeddingResponse.data[0].embedding 
        }
      })
    );
    await supabase.from('movies').insert(data);
    console.log('SUCCESS!');
  }
  createAndStoreEmbeddings()
}, []) */



/* --------------------------------------------------- */

const query = nrOfPeople <= 1
    ? `I have ${time} to see a movie. My favourite movie is ${favouriteMovies}. I am in the mood for something ${selectedGenre}. My favourite actor or movie character is ${actors}.`
    : `We are ${nrOfPeople} people, we have ${time} to see a movie. Our favourite movies are ${favouriteMovies}. We are in the mood for something ${selectedGenre}. Our favourite actors or movie characters are ${actors}.`;

const [reply, setReply] = useState<string>("")
const [error, setError] = useState("")
const [movieTitle, setMovieTitle] = useState("");
const [moviePoster, setMoviePoster] = useState<string | null> (null);

useEffect(() => {

  async function fetchMovieIdAndPoster(){
    try{
      const searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieTitle)}`)
      if (!searchResponse.ok) throw new Error("Failed to search for movie.")
  
      const searchData = await searchResponse.json()
      const movie = searchData.results[0]// Ta första matchande filmen
  
      if (movie) {
        const movieId = movie.id
  
        // Andra anropet för att hämta detaljerna för filmen med hjälp av ID:t
        const detailResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`)
        if (!detailResponse.ok) throw new Error("Failed to fetch movie details.")
  
        const detailData = await detailResponse.json();
        const posterPath = detailData.poster_path;
        const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
  
        setMoviePoster(imageUrl)
      } else {
        console.warn("Movie not found.")
        setMoviePoster(null)
      }
  
    }catch (error){
      console.error("Error fetching movie poster:", error)
      setMoviePoster(null)
  
    }
  }
  fetchMovieIdAndPoster()

}, [movieTitle])





useEffect(() => {

  async function main(input:string) {

    try{
      const embedding = await createEmbedding(input);
      const match = await findNearestMatch(embedding);
      await getChatCompletion(match, input);
  
    }catch(error:any){
      console.error('Error in main function', error.message)
      setError('Sorry, something went wrong. Please try again')
    }
  }
  main(query)
}, [query])



// Create an embedding vector representing the query
async function createEmbedding(input:string) {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input
  });
  return embeddingResponse.data[0].embedding;
}

// Query Supabase and return a semantically matching text chunk
async function findNearestMatch(embedding: number[]) {
  const { data } = await supabase.rpc('match_movies', {
    query_embedding: embedding,
    match_threshold: 0.50,
    match_count: 1
  });

  return data[0].content;
}


async function getChatCompletion(text:string, query:string) {

  const chatMessages: Message[] = [
    {
      role: 'system',
      content: `You are an enthusiastic movie expert who loves recommending movies to people. You will be given two pieces of information - some context about movies and a question. Your main job is to first write the title of the movie with quotation marks and after the title formulate a short answer to the question using the provided context. All in the same message. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.`
    },
    {
      role: 'user',
      content: `Context: ${text} Question: ${query}`
    }
  ]

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chatMessages,
      temperature: 0.5,
      frequency_penalty: 0.5
    });
    
    const content = response.choices[0].message.content ?? "No response availible"
    const { title, remainingText } = extractTitle(content);

    setMovieTitle(title);
    setReply(remainingText);

    console.log("Movie title:", title);
    console.log("Movie content:", remainingText);
  }


function extractTitle(text:string) {
  const match = text.match(/"([^"]+)"/); // Antar titeln inom citationstecken
  
  const title = match ? match[1] : text.split(' ')[0]; // Försök annars ta första ordet
  const remainingText = match ? text.replace(match[0], "").trim() : text;

  return { title, remainingText };
}


function startOver(){
  navigate("/")
  window.location.reload()
}


  return (
    <>
    <section className="container result">
        
          {movieTitle && reply ? (
            <motion.section
            className="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            >
          <h1 className="result__movie-title">{movieTitle}</h1>
          <img src={moviePoster || ''} alt="Movie poster" className="result__img" />
          <p className="result__movie-desc">
          {reply}
          </p>

          <button className='submit-button' onClick={() => startOver()}>START OVER</button>

          
          </motion.section>
          ): (
            <motion.div 
            className="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img src="images/popcorn.gif" alt="Loading..." />
            </motion.div>
          ) 
          }
        
        
    </section>
    </>
  )
}

export default Result
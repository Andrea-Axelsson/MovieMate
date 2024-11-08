import Questions from './pages/Questions';
import Result from './pages/Result';
import Start from './pages/Start'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="questions" element={<Questions/>}/>
        <Route path="result" element={<Result/>}/>
      </Routes>
    </Router>
      
   
  )
}

export default App



/* 

1: Få in datan från mina input fields
  -How many people
  -How much time
  -Favourite movie (dessa behöver sättas ihop till en array. .map?)
  -new or classic  (dessa behöver sättas ihop till en array. .map?)
                   (denna array behöver ta bort dubbletter)
                   (.join med &) 

  -mood            (dessa behöver sättas ihop till en array. .map?)
                   (denna array behöver ta bort dubbletter)

  -Favourite actor (dessa behöver sättas ihop till en array. .map?)

2: Sätt ihop all data till en sträng som blir min query.

Fler personer:
  -We are ${nrOfPeople} people, we have ${time} to see a movie. Our favourite movies are ${favouriteMovies}. We want something ${newClassic}. We are in the mood for something ${mood}. Our favourite actors or movie characters are ${actors}.
 
En person:

if($nrOfPeople <= 1)

-I have ${time} to see a movie. my favourite movies is ${favouriteMovies}. I want something ${newClassic}. I am in the mood for something ${mood}. My favourite actor or movie character is ${actors}.

3:

Skapa databas och text chunks med tillhörande vectors.
(behöver jag tillhörande vaecors eller räcker det med chunks för att det skall matcha?)

4: 

En main funktion som kallar på:
  createEmbedding
  findNearestMatch
  getChatCompletions

Kalla på main när man skickar in formuläret.

Funktioner:

createEmbedding(input) ta input som  parameter
Med denna input så skapas en embedding vector som representerar min input.

findNearestMatch(embedding) ta embedding som parameter.
-returnerar alla textchunks i databasen som matchar med min embedding  från min query.
-returnera flera matchar

const chatMessage
getChatCompletion(text, query)
Ger chat GPT svar som presenteras som resultat sen.
text = mina textchunks
query = min input svar.

5:
Rendera svaret i /result
Rendera APi genererad movie poster


6:
Finjusteringar:
Fixa synligt error meddelande i front end om något gåt fel.
Smooth overgångar.
*/
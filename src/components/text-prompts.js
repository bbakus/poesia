import {useState, useEffect} from 'react'

function Texts({onSubmitTextPrompt, onPromptSwitch, setUsedTextPrompts, usedTextPrompts}){
  const [word, setWord] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [prompts, setPrompts] = useState([])
  
  


  const textPrompts = [
    "what is or was the color of your mother's eyes.",
    "how are you feeling?",
    "a sound you love",
    "tired of ______",
    "waiting for _____",
    "the texture you last touched",
    "a nostalgic scent",
    "a quiet place",
    "the last thing that hurt you",
    "a month you wish could last forever",
    "what home feels like",
    "underwater",
    "kept in a cage",
    "something empty",
    "something terrifying",
    "something that melts",
    "something sacred",
    "your last nightmare",
    "something underground",
    "a tree you are fond of",
    "a celestial object",
    "a body of water",
    "an art form",
    "the color of bliss",
    "a place for solitude",
    "a precious metal or gem",
    "your birthstone",
    "something in a box",
    "a fear",
    "a piece of clothing",
    "a weakness of yours",
    "something in summer",
    "field of ______",
    "something in winter",
    "the color of you hair",
    "something you cherish",
    "a type of fabric",
    "what brings you peace",
    "something sharp",
    "in the desert",
    "a memorable dream",
    "what's inside your mouth",
    "underneath the _____",
    "above the ______",
    "something that describes your father",
    "you're crying, why?",
    "a flower you love",
    "an activity you do alone",
    "the weather outside",
    "a bird you saw recently",
    "organic things to collect",
    "your favorite time of day",
    "something elemental",
    "I can't _____",
    "a fruit that you like",
    "a taste you love",
    "the color of darkness",
    "the color of your shirt",
    "I need _____",
    "a terrain",
    "something in a garden",
    "a body of water",
  ]
  
  
  
  useEffect(() => {
    setPrompts(textPrompts)
  }, []);


  useEffect(() => {
    
    const filteredPrompts = prompts.filter(prompt => !usedTextPrompts.includes(prompt));

    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    const randomPrompt = filteredPrompts[randomIndex];
    
    setCurrentPrompt(randomPrompt);
    
   
  }, [prompts]);



  function handleSubmit(e) {
    e.preventDefault();
    onSubmitTextPrompt(word);
    setWord('');
    onPromptSwitch(true);
    setUsedTextPrompts([...usedTextPrompts, currentPrompt])
    
  }

 

  
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.keyCode === 32) {
      e.preventDefault();
    }
  };
  
  return (
    <div className="text-prompt-container">
      <div className="text-prompt">
        <h3>{currentPrompt}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="input"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter one word"
            required
          />
        </div>
        <button className="continue-button" type="submit">continue</button>
      </form>
    </div>
  );
}

export default Texts
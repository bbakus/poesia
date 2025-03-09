import {useState, useEffect, useRef} from 'react'

function Texts({onSubmitTextPrompt, onPromptSwitch, promptNumber=1}){
  const [word, setWord] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState("")
  const shuffledSequenceRef = useRef(null);


  const textPrompts = [
    "what are or were the color of your mother's eyes.",
    "leave the ______",
    "you ______ me",
    "tired of ______",
    "waiting for _____",
    "the texture you last touched",
    "a nostalgic scent",
    "a bright place",
    "the last thing that hurt you",
    "_____ in here",
    "what home feels like",
    "I'm just a ______",
    "kept in a cage",
    "a _____ cloud",
    "what melts",
    "something sacred",
    "your last nightmare",
    "a _____ storm",
    "arms",
    "tall",
    "crawl into _____",
    "a celestial object",
    "like a panther",
    "a _____ look",
    "the color of bliss",
    "a place for solitude",
    "a precious metal",
    "your birthstone",
    "something in a box",
    "heartache",
    "a fear",
    "dressed in _____",
    "a weakness of yours",
    "winter is _____",
    "field of ______",
    "snowy mountains",
    "something you cherish",
    "a type of fabric",
    "within _____, interlinked",
    "a structure",
    "something sharp",
    "what happens when you panic",
    "a memorable dream",
    "when you think of someone who wronged you",
    "underneath the _____",
    "above the ______",
    "something that describes your father",
    "you're crying, why?",
    "the streets are _____ right now"
  ]
  
  

// Shuffle function (Fisher-Yates algorithm)
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Create and store shuffled sequence on first render
  useEffect(() => {
    if (!shuffledSequenceRef.current) {
      // Create array of indices [0, 1, 2, ..., length-1]
      const indices = Array.from({ length: textPrompts.length }, (_, i) => i);
      // Shuffle the indices
      shuffledSequenceRef.current = shuffleArray(indices);
      console.log("Created shuffled sequence:", shuffledSequenceRef.current);
    }
  }, []);
  
  // Select prompt based on promptNumber
  useEffect(() => {
    if (shuffledSequenceRef.current) {
      // Get index from our shuffled sequence
      const index = (promptNumber - 1) % textPrompts.length;
      const selectedIndex = shuffledSequenceRef.current[index];
      const selectedPrompt = textPrompts[selectedIndex];
      
      console.log(`Text prompt #${promptNumber}, using shuffled index ${selectedIndex}: "${selectedPrompt}"`);
      setCurrentPrompt(selectedPrompt);
    }
  }, [promptNumber]);


  function handleSubmit(e) {
    e.preventDefault();
    onSubmitTextPrompt(word);
    setWord('');
    onPromptSwitch(true);
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
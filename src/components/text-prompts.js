import {useState, useEffect} from 'react'



function Texts({onSubmitTextPrompt, onPromptSwitch}){


    const [word, setWord] = useState('')

    const [currentPrompt, setCurrentPrompt] = useState("")
    const [usedPrompts, setUsedPrompts] = useState([])


    function selectNewPrompt(){
        const prompt = getRandomItem(textPrompts, usedPrompts)
        if(prompt){
            setCurrentPrompt(prompt)
            setUsedPrompts([...usedPrompts, prompt])
        }
    }


    const getRandomItem = (array, excludeItems = []) => {
        // Filter out items that have been used already
        const availableItems = array.filter(item => !excludeItems.includes(item));
        
        // If all items have been used, you could either reset or return null
        if (availableItems.length === 0) {
          // Optional: reset the exclusion list if all items have been used
          return array[Math.floor(Math.random() * array.length)];
        }
    }


    function handleSubmit(){

        onPromptSwitch(true)
        selectNewPrompt()
        onSubmitTextPrompt(word)

    }

    const textPrompts = [
        "what are or were the color of your mother's eyes.", 
        "bless the ______",
        "you ______ me",
        "tired of ______",
        "can't wait for",
        "the texture of your last meal",
        "a nostalgic scent",
        "how you feel when you wake up",
        "the last thing that hurt you",
        "_____ in here",
        "what home feels like",
        "I've always _____ you",
        "Kept in a cage",
        "a _____ cloud",
        "what does a shower feel like",
        "where do you keep something sacred",
        "your last nightmare",
        "this _____ storm",
        "arms",
        "the last word you heard",
        "crawl into _____",
        "a celestial object",
        "what feels far away",
        "a ripe tangerine",
        "don't _____ me",
        "a place for solitude",
        "a precious metal",
        "your birthstone",
        "something in a box",
        "heartache",
        "a fear",
        "dressed in _____",
        "expensive",
        "cheap",


    ]

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * textPrompts.length)
        setCurrentPrompt(textPrompts[randomIndex])
    },[])


    const handleKeyDown = (e) => {
        // Check if the key pressed is a space
        if (e.key === ' ' || e.keyCode === 32) {
          e.preventDefault(); // This prevents the space from being entered
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
                type="text" 
                value={word}
                onChange={(e) => setWord(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter one word"
                required
              />
            </div>
            
            <button type="submit">continue</button>
          </form>
        </div>
      );
}


export default Texts
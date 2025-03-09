import { useState, useEffect } from "react";
import imageData from "../data/db.json";

function Images({ onSubmitImagePrompt, onPromptSwitch }) {
  const [pictures, setPictures] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [noun, setNoun] = useState('');
  const [adjective, setAdjective] = useState('');
  const [connector, setConnector] = useState('');
  const [usedImages, setUsedImages] = useState([])

  

    function selectNewImage(){
        const newImage = getRandomItem(pictures, usedImages)
        if (newImage){
            setCurrentImage(newImage)
            setUsedImages([...usedImages, newImage])
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



  useEffect(() => {
    setPictures(imageData);
    // Select a random image when the component loads
    if (imageData.length > 0) {
      const randomIndex = Math.floor(Math.random() * imageData.length);
      setCurrentImage(imageData[randomIndex]);
      
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPromptSwitch(false)
    
    selectNewImage()


    onSubmitImagePrompt({
      noun: noun,
      adjective: adjective,
      connector: connector
    });
    
    // Clear the inputs
    setNoun('');
    setAdjective('');
    setConnector('');
    
    // Get next random image
    const randomIndex = Math.floor(Math.random() * pictures.length);
    setCurrentImage(pictures[randomIndex]);
  };


  const handleKeyDown = (e) => {
    // Check if the key pressed is a space
    if (e.key === ' ' || e.keyCode === 32) {
      e.preventDefault(); // This prevents the space from being entered
    }
  };

  return (
    <div className="rorschach-container">
      <div className="rorschach-image">
        <img src={currentImage} alt="Rorschach inkblot" />
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>what do you see?</label>
          <input 
            type="text" 
            value={noun}
            onChange={(e) => setNoun(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="enter a noun"
            required
          />
        </div>
        
        <div className="form-group">
          <label>describe it.</label>
          <input 
            type="text" 
            value={adjective}
            onChange={(e) => setAdjective(e.target.value)}
            placeholder="enter an adjective"
            required
          />
        </div>
        
        <div className="form-group">
          <label>a feeling</label>
          <input 
            type="text" 
            value={connector}
            onChange={(e) => setConnector(e.target.value)}
            placeholder="is, was, with, all, told, held..."
            required
          />
        </div>
        
        <button type="submit">continue</button>
      </form>
    </div>
  );
}

export default Images;
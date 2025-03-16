import { useState, useEffect } from "react";
import imageData from "../data/db.json";

function Images({ onSubmitImagePrompt, onPromptSwitch, setUsedImagePrompts, usedImagePrompts}) {
  const [pictures, setPictures] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [noun, setNoun] = useState('');
  const [adjective, setAdjective] = useState('');
  const [verb, setVerb] = useState('');

  // Helper function to ensure image paths work in both development and production
  const getImagePath = (path) => {
    // If the path already includes the /poesia prefix or we're in development, use it as is
    return path;
  };

  useEffect(() => {
    setPictures(imageData);
  }, []);

  useEffect(() => {
    
    const filteredPrompts = pictures.filter(prompt => !usedImagePrompts.includes(prompt))
    
    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    const image = filteredPrompts[randomIndex];
    setCurrentImage(image);
    

  }, [pictures]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmitImagePrompt({
      noun: noun,
      adjective: adjective,
      verb: verb
    });
    
    
    setNoun('');
    setAdjective('');
    setVerb('');
    
    onPromptSwitch(false);

    setUsedImagePrompts([...usedImagePrompts, currentImage])

  };



  
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.keyCode === 32) {
      e.preventDefault();
    }
  };
  
  return (
    <div className="rorschach-container">
      <div className="rorschach-image">
        <img src={getImagePath(currentImage)} alt="Rorschach inkblot" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>what do you see?</label>
          <input
            className="input"
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
            className="input"
            type="text"
            value={adjective}
            onKeyDown={handleKeyDown}
            onChange={(e) => setAdjective(e.target.value)}
            placeholder="enter an adjective"
            required
          />
        </div>
        <div className="form-group">
          <label>a verb or adverb</label>
          <input
            className="input"
            type="text"
            value={verb}
            onKeyDown={handleKeyDown}
            onChange={(e) => setVerb(e.target.value)}
            placeholder="enter a verb"
            required
          />
        </div>
        <button className="continue-button" type="submit">continue</button>
      </form>
    </div>
  );
}

export default Images;
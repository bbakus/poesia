import { useState, useEffect } from "react";
import imageData from "../data/db.json";

function Images({ onSubmitImagePrompt, onPromptSwitch, promptNumber }) {
  const [pictures, setPictures] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [noun, setNoun] = useState('');
  const [adjective, setAdjective] = useState('');
  const [connector, setConnector] = useState('');

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Load and shuffle images on component mount
  useEffect(() => {
    const shuffledImages = shuffleArray(imageData);
    setPictures(shuffledImages);
    
    // Use promptNumber to determine which image to show
    // promptNumber starts at 1, so subtract 1 for zero-based index
    const imageIndex = (promptNumber - 1) % shuffledImages.length;
    setCurrentImage(shuffledImages[imageIndex]);
    
    console.log(`Showing image ${imageIndex + 1} of ${shuffledImages.length}`);
  }, [promptNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmitImagePrompt({
      noun: noun,
      adjective: adjective,
      connector: connector
    });
    
    setNoun('');
    setAdjective('');
    setConnector('');
    
    onPromptSwitch(false);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.keyCode === 32) {
      e.preventDefault();
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
            value={connector}
            onKeyDown={handleKeyDown}
            onChange={(e) => setConnector(e.target.value)}
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
import { useState, useEffect } from "react";
import Images from "./image-slideshow";
import Texts from "./text-prompts";
import Template from "./poem-template";

function Prompt() {
  const [submitImagePrompt, setSubmitImagePrompt] = useState({});
  const [promptSwitch, setPromptSwitch] = useState(false);
  const [submitTextPrompt, setSubmitTextPrompt] = useState('');
  const [allTextPrompts, setAllTextPrompts] = useState([]);
  const [allImagePrompts, setAllImagePrompts] = useState([]);
  const [promptCount, setPromptCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const TOTAL_PROMPTS = 20; 

  // Handle text prompt submissions
  useEffect(() => {
    if (submitTextPrompt) {
      setAllTextPrompts(prev => [...prev, submitTextPrompt]);
      incrementPromptCount();
    }
  }, [submitTextPrompt]);

  // Handle image prompt submissions
  useEffect(() => {
    if (Object.keys(submitImagePrompt).length > 0) {
      setAllImagePrompts(prev => [...prev, submitImagePrompt]);
      incrementPromptCount();
    }
  }, [submitImagePrompt]);

  // Common logic for incrementing count and checking completion
  const incrementPromptCount = () => {
    setPromptCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= TOTAL_PROMPTS) {
        setIsComplete(true);
      }
      return newCount;
    });
  };

  // Reset the component for a new poem
  const handleReset = () => {
    setAllTextPrompts([]);
    setAllImagePrompts([]);
    setPromptCount(0);
    setIsComplete(false);
    setPromptSwitch(false); // Start with text prompt
  };

  return(
    <div>
      <h2>poesia</h2>
      
      <div>
        {!isComplete ? (
          promptSwitch ? 
            <Images 
              onSubmitImagePrompt={setSubmitImagePrompt} 
              onPromptSwitch={setPromptSwitch}
              promptNumber={Math.ceil(allImagePrompts.length) + 1}
              remainingPrompts={TOTAL_PROMPTS - promptCount}
            /> 
          :
            <Texts 
              onSubmitTextPrompt={setSubmitTextPrompt} 
              onPromptSwitch={setPromptSwitch}
              promptNumber={Math.ceil(allTextPrompts.length) + 1}
              remainingPrompts={TOTAL_PROMPTS - promptCount}
            />
        ) : (
          <div className="completion-message">
            <button onClick={handleReset}>create another poem</button>
          </div>
        )}
      </div>
      
      {/* Only show the poem when complete */}
      {isComplete && (
        <div className="final-poem">
          <Template 
            allImagePrompts={allImagePrompts} 
            allTextPrompts={allTextPrompts}
          />
        </div>
      )}
    </div>
  );
}

export default Prompt;
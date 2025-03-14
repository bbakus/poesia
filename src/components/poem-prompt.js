import { useState, useEffect, use } from "react";
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
  const [usedTextPrompts, setUsedTextPrompts] = useState([])
  const [usedImagePrompts, setUsedImagePrompts] = useState([])
  
  const TOTAL_PROMPTS = 20; 

 
useEffect(() => {
  
  if (submitTextPrompt) {
    setAllTextPrompts([...allTextPrompts, submitTextPrompt]);
    incrementPromptCount();
  }
}, [submitTextPrompt]);

useEffect(() => {
  
  if (submitImagePrompt && Object.keys(submitImagePrompt).length > 0) {
    setAllImagePrompts([...allImagePrompts, submitImagePrompt]);
    
    incrementPromptCount();
  }
}, [submitImagePrompt]);

  
  const incrementPromptCount = () => {
    setPromptCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= TOTAL_PROMPTS) {
        setIsComplete(true);
      }
      return newCount;
    });
  };

 
  const handleReset = () => {
    setAllTextPrompts([]);
    setAllImagePrompts([]);
    setPromptCount(0);
    setIsComplete(false);
    setPromptSwitch(false); // Start with text prompt
    setUsedTextPrompts([])
    setUsedImagePrompts([])

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
              setUsedImagePrompts={setUsedImagePrompts}
              usedImagePrompts={usedImagePrompts}
            /> 
          :
            <Texts 
              onSubmitTextPrompt={setSubmitTextPrompt} 
              onPromptSwitch={setPromptSwitch}
              promptNumber={Math.ceil(allTextPrompts.length) + 1}
              remainingPrompts={TOTAL_PROMPTS - promptCount}
              setUsedTextPrompts={setUsedTextPrompts}
              usedTextPrompts={usedTextPrompts}
            />
        ) : (
          <div className="completion-message">
            <button className="create-new-button" onClick={handleReset}>create another poem</button>
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
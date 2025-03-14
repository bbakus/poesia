import React, { useState, useEffect, useRef } from 'react';

function Template({ allImagePrompts, allTextPrompts }) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullTextRef = useRef('');
  const typingSpeedRef = useRef(30); // milliseconds per character
  
  const generatePoem = () => {
    if (allImagePrompts.length === 0 && allTextPrompts.length === 0) {
      return '';
    }
    
    let poemTemplate = `
    [IMAGE_ADJ_5] [IMAGE_NOUN_6]
    [CONNECTOR_2] [IMAGE_NOUN_3] [IMAGE_ADJ_1]
    [CONNECTOR_3] [IMAGE_VERB_4] [TEXT_PROMPT_5]

    [TEXT_PROMPT_2] [IMAGE_NOUN_8]
    [CONNECTOR_4] [IMAGE_NOUN_5] [IMAGE_ADJ_3]
    [CONNECTOR_5] [IMAGE_VERB_2] [TEXT_PROMPT_7]

    [TEXT_PROMPT_1] 
    [CONNECTOR_7] [IMAGE_ADJ_2] [TEXT_PROMPT_4]
    [TEXT_PROMPT_3] [IMAGE_ADJ_6]

    [TEXT_PROMPT_6] [IMAGE_NOUN_2]
    [IMAGE_NOUN_1] [CONNECTOR_8] [IMAGE_VERB_3] [IMAGE_NOUN_4] 
    [CONNECTOR_9] [IMAGE_NOUN_10] [IMAGE_VERB_1]

    [IMAGE_VERB_5] [IMAGE_ADJ_8] [TEXT_PROMPT_8]
    [CONNECTOR_10] [TEXT_PROMPT_9] [IMAGE_ADJ_7]
    [CONNECTOR_12] [IMAGE_VERB_6] [IMAGE_NOUN_7]
    
    [IMAGE_VERB_8]
    [IMAGE_VERB_7] [TEXT_PROMPT_10]
    [CONNECTOR_13] [IMAGE_ADJ_9] [IMAGE_NOUN_9].
    `;

    allImagePrompts.forEach((prompt, index) => {
      const placeholderNum = index + 1;
      poemTemplate = poemTemplate.replace(`[IMAGE_NOUN_${placeholderNum}]`, prompt.noun || `NOUN_${placeholderNum}`);
      poemTemplate = poemTemplate.replace(`[IMAGE_ADJ_${placeholderNum}]`, prompt.adjective || `ADJECTIVE_${placeholderNum}`);
      poemTemplate = poemTemplate.replace(`[IMAGE_VERB_${placeholderNum}]`, prompt.verb || `VERB_${placeholderNum}`);
    });
    
    allTextPrompts.forEach((prompt, index) => {
      const placeholderNum = index + 1;
      poemTemplate = poemTemplate.replace(`[TEXT_PROMPT_${placeholderNum}]`, prompt || "");
    });

    const connectingWords = ['and', 'or', 'like', 'but', 'so', 'since', 'unless', 'while', 'the', 'in', 'for', 'of', 'with', 'on', 'at', 'by', 'from', 'into', 'under', 'between', 'through', 'after', 'below', 'amid'] 
    function getRandomWord(words) {
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    }
    
    function shuffleArray(array) {
      const shuffled = [...array];
      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    const shuffledWords = shuffleArray(connectingWords);
    shuffledWords.forEach((word, index) => {
      const placeholderNum = index + 1;
      poemTemplate = poemTemplate.replace(`[CONNECTOR_${placeholderNum}]`, word || "");
    });

    return poemTemplate;
  };

  // Set up the typewriter effect
  useEffect(() => {
    const fullPoem = generatePoem();
    fullTextRef.current = fullPoem;
    
    // Reset and start the animation when the poem changes
    setDisplayText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullTextRef.current.length) {
        setDisplayText(fullTextRef.current.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, typingSpeedRef.current);
    
    // Cleanup interval on component unmount or when poem changes
    return () => clearInterval(typingInterval);
  }, [allImagePrompts, allTextPrompts]); // Re-run when poem inputs change
  
  return (
    <div className="poem-container">
      <div className="poem-text">
        <pre>
          {displayText}
          {isTyping && <span className="cursor">|</span>}
        </pre>
      </div>
    </div>
  );
}

export default Template;
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

    // Categorize connecting words by function
    const connectingWords = {
      conjunction: ['and', 'or', 'but', 'so', 'yet', 'for', 'nor'],
      preposition: ['in', 'on', 'at', 'by', 'with', 'from', 'under', 'over', 'through', 'between', 'among', 'into'],
      subordinating: ['while', 'although', 'since', 'unless', 'if', 'when', 'where', 'as'],
      // Split articles into singular and plural for better control
      singularArticles: ['the', 'this', 'my', 'your', 'his', 'her'],
      pluralArticles: ['the', 'these', 'those', 'my', 'your', 'his', 'her', 'our', 'their'],
      comparison: ['like', 'as', 'than'],
      transitional: ['under', 'inside', 'above', 'below', 'within', 'without', 'despite', 'until', 'still', 'yet', 'now', 'then', 'here', 'what']
    };

    // Choose connecting words based on context
    const selectConnector = (position) => {
      // Analyze surrounding template to make contextual decisions
      const linePosition = getLinePosition(poemTemplate, position);
      const surroundingContext = getSurroundingContext(poemTemplate, position);
      
      // Check if we're connecting to plural nouns
      const isPluralContext = surroundingContext.includes('NOUN') && checkForPlurality(surroundingContext);
      
      // Start of line typically needs articles or transitional words
      if (linePosition === 'start') {
        // Choose between singular and plural articles based on context
        if (isPluralContext) {
          return randomFromArray([...connectingWords.pluralArticles, ...connectingWords.transitional]);
        } else {
          return randomFromArray([...connectingWords.singularArticles, ...connectingWords.transitional]);
        }
      }
      
      // Middle of stanza often uses conjunctions
      if (linePosition === 'middle') {
        return randomFromArray(connectingWords.conjunction);
      }
      
      // If we have verbs nearby, prepositions often work well
      if (surroundingContext.includes('VERB')) {
        return randomFromArray(connectingWords.preposition);
      }
      
      // If we have adjectives nearby, comparison words might be appropriate
      if (surroundingContext.includes('ADJ')) {
        // For adjectives referring to plural nouns, make sure to use appropriate connectors
        if (isPluralContext && surroundingContext.includes('NOUN')) {
          // When connecting plural adjectives and nouns, avoid singular demonstratives
          const appropriateWords = [...connectingWords.comparison, ...connectingWords.subordinating]
            .filter(word => !['this', 'that'].includes(word));
          return randomFromArray(appropriateWords);
        }
        return randomFromArray([...connectingWords.comparison, ...connectingWords.subordinating]);
      }
      
      // If we're dealing with plural nouns but not at start of line
      if (isPluralContext) {
        // Special handling for demonstratives in the middle of text
        if (Math.random() < 0.3) { // 30% chance to use a demonstrative
          return randomFromArray(connectingWords.pluralArticles.filter(word => ['these', 'those'].includes(word)));
        }
        // Otherwise use prepositions or conjunctions that work with plurals
        return randomFromArray([...connectingWords.conjunction, ...connectingWords.preposition]);
      } else {
        // For singular contexts, occasionally use singular demonstratives
        if (Math.random() < 0.3) { // 30% chance to use a demonstrative
          return randomFromArray(connectingWords.singularArticles.filter(word => ['this', 'that'].includes(word)));
        }
      }
      
      // Default to a random category, but respecting plurality
      const categories = isPluralContext ? 
        ['conjunction', 'preposition', 'subordinating', 'pluralArticles', 'comparison', 'transitional'] :
        ['conjunction', 'preposition', 'subordinating', 'singularArticles', 'comparison', 'transitional'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      return randomFromArray(connectingWords[randomCategory]);
    };
    
    // Helper function to get surrounding context
    const getSurroundingContext = (template, position) => {
      const lines = template.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(position)) {
          return lines[i];
        }
      }
      return '';
    };
    
    // Helper function to check if context suggests plural nouns
    const checkForPlurality = (context) => {
      // Check if we can determine plurality from actual filled values
      for (let i = 1; i <= allImagePrompts.length; i++) {
        if (context.includes(`[IMAGE_NOUN_${i}]`) && allImagePrompts[i-1]?.noun) {
          const noun = allImagePrompts[i-1].noun;
          // Simple plurality check - can be expanded for more complex rules
          if (noun.endsWith('s') && !noun.endsWith('ss') && !noun.endsWith('us')) {
            return true;
          }
        }
      }
      
      // Check for plural text prompts (more challenging, simple heuristic)
      for (let i = 1; i <= allTextPrompts.length; i++) {
        if (context.includes(`[TEXT_PROMPT_${i}]`) && allTextPrompts[i-1]) {
          const words = allTextPrompts[i-1].split(' ');
          // Check last word for potential plurality
          const lastWord = words[words.length - 1];
          if (lastWord && lastWord.length > 2 && lastWord.endsWith('s') && 
              !lastWord.endsWith('ss') && !lastWord.endsWith('us')) {
            return true;  
          }
        }
      }
      
      return false;
    };
    
    // Helper function to get position in line/stanza
    const getLinePosition = (template, connectorPosition) => {
      const lines = template.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(connectorPosition)) {
          if (lines[i].trim().startsWith(connectorPosition)) {
            return 'start';
          } else if (i % 3 === 1) { // Middle line of 3-line stanza
            return 'middle';
          }
          return 'end';
        }
      }
      return 'unknown';
    };
    
    // Helper function to select random item from array
    const randomFromArray = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };
    
    // Replace connector placeholders with contextually appropriate words
    for (let i = 1; i <= 15; i++) {
      const connectorPlaceholder = `[CONNECTOR_${i}]`;
      if (poemTemplate.includes(connectorPlaceholder)) {
        poemTemplate = poemTemplate.replace(connectorPlaceholder, selectConnector(connectorPlaceholder));
      }
    }

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




function Template({allImagePrompts, allTextPrompts}){


    
    
    const generatePoem = () => {
        
        if (allImagePrompts.length === 0 && allTextPrompts.length === 0) {
            return
        }
    
        
        let poemTemplate = `
        in [IMAGE_ADJ_5] [IMAGE_NOUN_6] 
        I see [IMAGE_NOUN_3] [IMAGE_ADJ_1]
        [IMAGE_CONNECTOR_4] within [TEXT_PROMPT_5]
        
        [TEXT_PROMPT_2] resonates [IMAGE_NOUN_8]
        like [IMAGE_NOUN_5] [IMAGE_ADJ_3] and
        [IMAGE_CONNECTOR_2] across [TEXT_PROMPT_7]
        
        [TEXT_PROMPT_1] here
        this [IMAGE_ADJ_2] [TEXT_PROMPT_4]
        so [TEXT_PROMPT_3] and [IMAGE_ADJ_6]

        [TEXT_PROMPT_6] in [IMAGE_NOUN_2]
        [IMAGE_NOUN_1] and [IMAGE_NOUN_4] [IMAGE_CONNECTOR_3]
        this [IMAGE_NOUN_10] [IMAGE_CONNECTOR_1]

        [IMAGE_CONNECTOR_5] [IMAGE_ADJ_8] [TEXT_PROMPT_8]
        down [TEXT_PROMPT_9] with [IMAGE_ADJ_7]
        [IMAGE_CONNECTOR_6] [IMAGE_NOUN_7]

        [IMAGE_CONNECTOR_8]
        [IMAGE_CONNECTOR_7] [TEXT_PROMPT_10]
        [IMAGE_ADJ_9] [IMAGE_NOUN_9].
        
        `;
    
        
        allImagePrompts.forEach((prompt, index) => {
        const placeholderNum = index + 1;
        poemTemplate = poemTemplate.replace(`[IMAGE_NOUN_${placeholderNum}]`, prompt.noun || "");
        poemTemplate = poemTemplate.replace(`[IMAGE_ADJ_${placeholderNum}]`, prompt.adjective || "");
        poemTemplate = poemTemplate.replace(`[IMAGE_CONNECTOR_${placeholderNum}]`, prompt.connector || "");
        });
    
       
        allTextPrompts.forEach((prompt, index) => {
        const placeholderNum = index + 1;
        poemTemplate = poemTemplate.replace(`[TEXT_PROMPT_${placeholderNum}]`, prompt || "");
        });
    
    
        return poemTemplate;
    };
    
    return (
        <div className="poem-container">
        <div className="poem-text">
            
            <pre>{generatePoem()}</pre>
        </div>
        </div>
    );
    }
    
    export default Template;
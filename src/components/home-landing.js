import { useState } from "react"



function Home({setPageChange}){

    
    function handlePageChange(){
        setPageChange(false)
    }

    return (
        <div>
            <h2>poesia</h2>
            <div className="body-text">
                <p>poems are about love. they echo your heart and soul. poesia helps translate your memories and senses into something evocative.
                before you begin, consider the words you choose. they will be a representation of you. think carefully, and take your time.
                </p>
            
                
            </div>
            <div>
                <button onClick={handlePageChange} className="begin-button">begin</button>
            </div>
        </div>
        
    )
}


export default Home
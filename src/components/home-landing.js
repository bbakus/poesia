import { useState } from "react"



function Home({setPageChange}){

    
    function handlePageChange(){
        setPageChange(false)
    }

    return (
        <div>
            <h2>poesia</h2>
            <div className="body-text">
                <p>poems are about truth. your truth, a truth you've seen, a truth you don't quite understand, any truth. poesia teaches you that creating poetry is not difficult, and that you are able to translate your thoughts, feelings, into something evocative.</p>
            </div>
            <div>
                <button onClick={handlePageChange} className="begin-button">begin</button>
            </div>
        </div>
        
    )
}


export default Home
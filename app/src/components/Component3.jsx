import React from "react"

export default function foo(props){
    function handleRefresh() {
        window.location.reload();
    }
      
    return(
        <div className="message--container">
            <button onClick={handleRefresh} className="message--btn">Restart</button>
            <div className="message">
                {props.foundWinner  && <p className="message--win">AI Bot wins!</p>} 
                {props.gameTie && <p className="message--tie">Game tied!</p>}  
            </div>
        </div>
        
    )
}
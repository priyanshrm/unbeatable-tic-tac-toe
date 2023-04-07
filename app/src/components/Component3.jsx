import React from "react"

export default function foo(props){
    
      
    return(
        <div className="message--container">
            <div className="message">
                {props.foundWinner  && <p className="message--win">AI Bot wins!</p>} 
                {!props.foundWinner && props.gameTie && <p className="message--tie">Game tied!</p>}  
                {!props.gameStart && <p className="message--start">Please choose one of the following:</p>}
            </div>
        </div>
        
    )
}
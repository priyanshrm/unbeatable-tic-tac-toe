import React from "react"
import Box from "./Component1"
import user from "../assets/o.png"
import bot from "../assets/x.png"
import boxes from "../data/boxes"
import Message from "./Component3"

export default function foo(props){
    const [squares, setSquares] = React.useState(boxes)
    const [foundWinner, setFoundWinner] = React.useState(false)
    const [gameTie, setGameTie] = React.useState(false)
    const [gameStart, setGameStart] = React.useState(false)
    
    let userIDs = props.userIDs
    let botIDs = props.botIDs
    let obj = props.obj
    
    function userPlay(userID) {
        let newSquares = []
        for (let i = 0; i < squares.length; i++) {
            let square = {...squares[i]}
            if (square.id === userID) {
                square = {...square, url:user}
                obj[userID.toString()] = "u"
                userIDs.push(userID)
            } 
            newSquares.push(square)
        }
        return newSquares
    }

    function botPlay(newSquares) {
        fetch("http://13.232.239.195/process_data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
            })
            .then((response) => response.json())
            .then((result) => {
                let newSquares2 = []
                for (let i = 0; i < newSquares.length; i++) {
                    let square = {...newSquares[i]}
                    if (square.id === result.ideal_move) {
                        square = {...square, url:bot}
                        obj[result.ideal_move.toString()] = "b"
                        botIDs.push(result.ideal_move)
                    }
                    newSquares2.push(square)
                }
                setSquares(newSquares2)
                let combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
                for (let i = 0; i < combinations.length; i++) {
                    let c = combinations[i];
                    let commonElements = botIDs.filter(element => c.includes(element));
                    if (commonElements.length === 3) {
                        setFoundWinner(true)
                    }
                }
                if(userIDs.length + botIDs.length >= 8){
                    setGameTie(true)
                }

            })
            .catch((error) => console.error(error)) 
    }

    function handleBotFirstMove() {
        setGameStart(true)
        botPlay(squares)
    }

    function toggle(id) {
        if (!gameStart){
            return
        }
        if (foundWinner || gameTie){
            return
        }

        for (let i = 0; i < squares.length; i++) {
            let element = squares[i];
            if(element.id === id) {
                if (element.url !== "") {
                    return
                }
            }
        }
        botPlay(userPlay(id))
    }

    const squareElements = squares.map(square => (
        <Box 
            key={square.id}
            text={square.url}
            toggle={()=>toggle(square.id)}
        />
    ))

    function handleRefresh() {
        window.location.reload();
    }

    console.log(userIDs, botIDs)


    return (
        <main>
            <div className="grid">
                {squareElements}
            </div>
            <Message 
                gameTie={gameTie}
                foundWinner={foundWinner}
            />
            
            {!gameStart && <button className="btn bot-btn" onClick={handleBotFirstMove}>AI Make First Move</button>}
            {!gameStart && <button className="btn user-btn" onClick={()=>setGameStart(true)}>I Make First Move</button>}
            {gameStart && <button className="btn restart-btn" onClick={handleRefresh} > Restart</button>}
        </main>
        
    )
}
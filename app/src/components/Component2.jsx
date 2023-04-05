import React from "react"
import Box from "./Component1"
import user from "../assets/o.png"
import bot from "../assets/x.png"
import boxes from "../data/boxes"

export default function foo(props){
    const [squares, setSquares] = React.useState(boxes)
    // const [idealMove, setIdealMove] = React.useState(-1)
    
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
            } 
            newSquares.push(square)
        }
        // setSquares(newSquares)
        return newSquares
    }

    function botPlay(newSquares) {
        console.log(newSquares)
        fetch("http://localhost:8000/process_data", {
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
                        console.log(result.ideal_move)
                    }
                    newSquares2.push(square)
                }
                console.log(newSquares2)
                setSquares(newSquares2)
                
            })
            .catch((error) => console.error(error)) 
    }

    function toggle(id) {
        if(userIDs.length + botIDs.length == 9){
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
        userIDs.push(id)
        botPlay(userPlay(id))
    }

    const squareElements = squares.map(square => (
        <Box 
            key={square.id}
            text={square.url}
            toggle={()=>toggle(square.id)}
        />
    ))

    return (
        <div className="grid">
            {squareElements}
        </div>
    )
}
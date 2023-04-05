import React from "react"

export default function foo(props){
    let board = {
        "0":"u",
        "1":"",
        "2":"",
        "3":"",
        "4":"",
        "5":"",
        "6":"",
        "7":"",
        "8":""
    }
    for (let i = 0; i < props.userIds.length; i++) {
        board[props.userIds[i]] = "u" 
    }
    for (let i = 0; i < props.botIds.length; i++) {
        board[props.botIds[i]] = "b" 
    } 
      
    function isWinner(player) {
        const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [
            0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        for (let i = 0; i < combinations.length; i++) {
            const c = combinations[i]
            if (board[c[0]] == player && board[c[1]] == board[c[2]] && board[c[2]] == player) {
                return true
            }
        }
        return false
    }
    

    return(
        <></>
    )
}
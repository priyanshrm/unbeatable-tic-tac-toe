import React from "react"

export default function foo(props){
    return (
        <div 
            className="box"
            onClick={props.toggle}
        >
            <img 
                className="box--img" 
                src={props.text} 
            />
        </div>
    )
}
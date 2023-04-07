import React from "react"

export default function foo(props){

    return (
        <div 
            className="box"
            onClick={props.toggle}
            style={{ color: props.text ? 'blue' : 'red' }}
        >
            <img 
                className="box--img" 
                src={props.text} 
            />
        </div>
    )
}
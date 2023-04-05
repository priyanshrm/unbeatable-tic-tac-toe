import React from 'react'
import Grid from './components/Component2'
import './App.css'

function App() {
  let obj = {
      "0":"",
      "1":"",
      "2":"",
      "3":"",
      "4":"",
      "5":"",
      "6":"",
      "7":"",
      "8":""
  }

  return (
    <Grid 
      userIDs = {[]}
      botIDs = {[]}
      obj = {obj}
    />
  )
}

export default App

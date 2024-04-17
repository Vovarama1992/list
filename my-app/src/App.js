import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const itemsLeft = list.filter(l => (!l.isChecked)).length

  function  onInput(e) {
    setText(e.target.value);
  }
  
  
  function changeList(e) {
    e.preventDefault();
    const obj = {value: text, isChecked: false, hidden: false};
    
    const newList = [...list, obj];
    setList(newList);
    setText("");

    
  }
  function checkChange(index) {
    setList(list.map((l,i) => {
      if (i == index) {
        return {...l, isChecked: !l.isChecked}
      } else return l
    }));
    
  }

  function buttonClick(move) {
    if (move === "completed") {
      setList(list.map((l) => {
        if (!l.isChecked) {
          return { ...l, hidden: true };
        } else {
          return { ...l, hidden: false };
        }
      }));
    } else if (move === "active") {
      setList(list.map((l) => {
        if (l.isChecked) {
          return { ...l, hidden: true };
        } else {
          return { ...l, hidden: false };
        }
      }));
    } else if (move === "all") {
      setList(list.map((l) => ({ ...l, hidden: false })));
    }
  
  }

  function clear() {
    setList(list.filter((l) => (!l.isChecked)))
  }

  
  return (
    <div className="container">
      <div className="todo">
        Todos
      </div>
      <form onSubmit={changeList} className="needs"><input onChange={onInput} type="text" 
      placeholder="▼  What needs to be done" value={text}></input></form>
      {list.map((l, index) => {
        return (<div key={index}>
           <Input  list={list} index={index} func={checkChange} value={l.value}/>
        
        </div>)
      })}
      <Inform num={itemsLeft} clear={clear} buttonClick={buttonClick}/>
      
    </div>
  );
}

function Input({index, value, func, list}) {
  return (
    <div className="checker" hidden={list[index].hidden}><input type="checkbox" onChange={() => func(index)}  id={index}></input>
<label htmlFor={index}>{`     ${value}`}</label></div>
  )
}

function Inform({ num, buttonClick, clear }) {
  return (
    <div className="inform">
      {num}  Items left    <button onClick={() => buttonClick("all")}>All</button>         
      <button onClick={() => buttonClick("active")}>Active</button>
             <button onClick={() => buttonClick("completed")}>Completed</button>       
               <button onClick={clear}>Clear Completed</button>

    </div>
  )
}

export default App;

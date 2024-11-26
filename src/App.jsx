import {useState , useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos]= useState([])
  const [todoValue, setTodoValue] = useState('')


  function persistsData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos,newTodo]
    persistsData(newTodoList)
    setTodos(newTodoList)

  }



  function handleDeleteTodo(index){
      const newTodoList = todos.filter((todo, todoIndex)=>
      {
        return todoIndex !== index
      })
      persistsData(newTodoList)
      setTodos(newTodoList)

    }

    function handleEditTodo(index){

      const valueToBeEdited = todos[index];
      setTodoValue(valueToBeEdited);
      handleDeleteTodo(index)


    }
    useEffect(()=>{
      if(!localStorage){
        return
      }
      let localTodos = localStorage.getItem('todos')
      if(!localTodos){
        return
      }
      console.log(localTodos)
      localTodos = JSON.parse(localTodos).todos
      setTodos(localTodos)
    })

  return (
    <>
      <TodoInput handleAddTodos = {handleAddTodos}   todoValue ={todoValue} setTodoValue = {setTodoValue}/>
      <TodoList handleEditTodo = {handleEditTodo} handleDeleteTodo ={handleDeleteTodo} todos ={todos} todoValue={todoValue} setTodoValue ={setTodoValue}/>
    </>
  );
}

export default App;

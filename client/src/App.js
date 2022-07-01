import React, { useEffect, useState } from "react"
import styles from "./App.module.css"
import Main from "./components/DragAndDrop/Main";
import Login from "./components/Login/Login";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllTodos();

  }, [])

  const getAllTodos = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMAIN}api/task-list/`);
    const todos = await response.json();
    console.log(todos);
    setData(todos);
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>ToDo App</div>
      {isLogged ?
        <Main data={data} />
        :
        <Login setIsLogged={setIsLogged} />}
    </div>
  );
}

export default App;

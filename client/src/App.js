import React, { useState } from "react"
import styles from "./App.module.css"
import Main from "./components/DragAndDrop/Main";
import Login from "./components/Login/Login";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>ToDo App</div>
      {isLogged ?
        <Main />
        :
        <Login setIsLogged={setIsLogged} />}
    </div>
  );
}

export default App;

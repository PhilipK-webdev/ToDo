import React, { useState } from 'react'
import styles from "../../App.module.css"
import Input from './components/Input'
function Main({ data }) {
    const [item, setItem] = useState("");

    const handlerAddTodo = (e) => {
        setItem(e.target.value);
    }
    const submitTodo = async (e) => {
        e.preventDefault();
        let idToAdd = 0;
        let todo = {};
        if (data.length) {
            idToAdd = data[0].id + 1;
        } else {
            idToAdd = 0;
        }
        todo = {
            id: idToAdd,
            item,
            completed: false
        }
        console.log(todo);
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}api/task-create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });

    }

    return (
        <div>
            <div className={styles.container__addItem}>
                <Input handlerAddTodo={handlerAddTodo} item={item}
                    submitTodo={submitTodo} />
            </div>
            <div className={styles.container__main}>
                <div className={styles.container__dropZone}>HELLO</div>
                <div className={styles.container__deleteZone}>HELLO2</div>
                <div className={styles.container__dragZone}>HELLO3</div>
            </div>
        </div>
    )
}

export default Main
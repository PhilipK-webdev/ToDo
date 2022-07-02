import React, { useState, useEffect, useRef } from 'react'
import styles from "../../App.module.css"
import Container from './components/Container';
import Input from './components/Input'
import StaticContainer from './components/StaticContainer';
function Main() {
    const [item, setItem] = useState("");
    const [textarea, setTextarea] = useState("");
    const [data, setData] = useState([]);
    const [completedArray, setCompletedArray] = useState([]);
    const [isEdit, setIsEdit] = useState([]);
    const [isUpdateDB, setIsUpdateDB] = useState(false)
    const dragItem = useRef();
    const dragOverItem = useRef();
    useEffect(() => {
        getAllTodos();
    }, [isUpdateDB])

    const getAllTodos = async () => {
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}api/task-list/`);
        const todos = await response.json();
        setData(todos.sort((a, b) => b.id - a.id));
        setIsEdit(Array(todos.length).fill(false));
        const completed = todos.map(task => task.completed);
        setCompletedArray([...completed]);
    }

    const handlerAddTodo = (e) => {
        setItem(e.target.value);
    }
    const submitTodo = async (e) => {
        e.preventDefault();
        let idToAdd = 0;
        if (data.length) {
            idToAdd = data[0].id + 1;
        } else {
            idToAdd = 0;
        }

        let todo = {
            id: idToAdd,
            item: item,
        }
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}api/task-create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });
        if (response.ok) {
            setIsUpdateDB(true);

            setData([...data, todo].sort((a, b) => b.id - a.id));
            const completed = data.map(task => task.completed);
            setCompletedArray([...completed]);
            setItem("");
        }
        else console.log("error")
    }

    const editTodo = (id) => {
        const isEditCopy = [...isEdit];
        isEditCopy[id] = true;
        setIsEdit([...isEditCopy]);
    }
    const cancelEditTodo = (id) => {
        const isEditCopy = [...isEdit];
        isEditCopy[id] = false;
        const completed = data.map(task => task.completed);
        setCompletedArray(completed);
        setIsEdit([...isEditCopy]);

    }
    const edtiCompleteTask = (id, bool) => {
        const dataCopy = data;
        dataCopy.forEach((task, index) => {
            if (task.id === id) {
                completedArray[index] = bool;
            }
        });
        setTextarea("");
        setData([...dataCopy]);
    }
    const submitToDo = async (id) => {
        let todo = {}
        data.forEach((task, index) => {
            if (task.id === id) {
                task.item = textarea ? textarea : task.item;
                task.completed = completedArray[index];
                todo["id"] = id;
                todo["item"] = textarea ? textarea : task.item;
                todo["completed"] = completedArray[index];
            }
        });
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}api/task-update/${id}/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });
        if (response.ok) {
            setData([...data].sort((a, b) => b.id - a.id));
            const isEditCopy = [...isEdit];
            isEditCopy[id] = false;
            const completed = data.map(task => task.completed);
            setCompletedArray([...completed]);
            setTextarea("");
            setIsEdit([...isEditCopy]);
        }
        else console.log("error")
    }

    const deleteItem = async (id) => {
        const dataCopy = data;
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}api/task-delete/${id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const indexToDelete = dataCopy.findIndex(task => task.id === id);
            dataCopy.splice(indexToDelete, 1);
            setData([...dataCopy].sort((a, b) => b.id - a.id));
        }
        else console.log("error")
    }

    const dragStart = (e, position) => {
        dragItem.current = position
    }
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };
    const onDrop = (e) => {
        const copyListItems = [...data];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        const completed = copyListItems.map(task => task.completed);
        setCompletedArray([...completed]);
        setData(copyListItems);
    };
    return (
        <div>
            <div className={styles.container__addItem}>
                <Input
                    handlerAddTodo={handlerAddTodo}
                    item={item}
                    submitTodo={submitTodo} />
            </div>
            <div className={styles.container__main}>
                <Container />
                <StaticContainer
                    dragEnter={dragEnter}
                    onDrop={onDrop}
                    dragStart={dragStart}
                    deleteItem={deleteItem}
                    completedArray={completedArray}
                    edtiCompleteTask={edtiCompleteTask}
                    submitToDo={submitToDo}
                    data={data}
                    isEdit={isEdit}
                    editTodo={editTodo}
                    cancelEditTodo={cancelEditTodo}
                    textarea={textarea}
                    setTextarea={setTextarea} />
                <Container />
            </div>
        </div>
    )
}

export default Main
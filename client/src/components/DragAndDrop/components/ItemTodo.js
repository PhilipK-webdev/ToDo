import React from 'react'
import styles from "../../../App.module.css"
function ItemTodo({

    deleteItem,
    dragStart,
    onDrop,
    dragEnter,
    task,
    editTodo,
    completedArray,
    index
}) {
    return (
        <div
            onDrop={(ev) => onDrop(ev)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragStart={(ev) => dragStart(ev, index)}
            onDragOver={(e) => e.preventDefault()}
            draggable
            className={styles.container__maintodo__card__body}>
            <div className={styles.container__maintodo__card__body__task}
                style={{
                    textDecoration: completedArray[index] ? "line-through" : "none", textDecorationColor: completedArray[index] ? "red" : "none"
                }}
            >{task.item}</div>
            <div className={styles.container__maintodo__buttons}>
                <button className={styles.container__maintodo__editBtn}
                    onClick={() => editTodo(task.id)}>edit</button>
                <button className={styles.container__maintodo__deleteBtn}
                    onClick={() => deleteItem(task.id)}>delete</button>
            </div>
        </div>
    )
}

export default ItemTodo
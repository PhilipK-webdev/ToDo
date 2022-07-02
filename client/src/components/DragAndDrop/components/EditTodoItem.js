import React from 'react'
import styles from "../../../App.module.css"
function EditTodoItem({
    cancelEditTodo,
    textarea,
    submitToDo,
    edtiCompleteTask,
    completedArray,
    task,
    setTextarea,
    index,
}) {
    return (
        <div
            className={styles.container__maintodo__card__body}
        >
            <div className={styles.container__maintodo__edit}>
                <textarea
                    placeholder={task.item}
                    value={textarea}
                    className={styles.container__maintodo__card__body__textearea}
                    onChange={(e) => setTextarea(e.target.value)} />
                <div className={styles.container__maintodo__edit__icon}
                    onClick={() => edtiCompleteTask(task.id, !completedArray[index])}>
                    {completedArray[index] ? <span style={{ color: "green" }}>✔</span> : <span>❌</span>}
                </div>
            </div>
            <div className={styles.container__maintodo__buttons}>
                <button className={styles.container__maintodo__submitBtn}
                    onClick={() => submitToDo(task.id)}>submit</button>
                <button className={styles.container__maintodo__cancelBtn}
                    onClick={() => cancelEditTodo(task.id)}>cancel</button>
            </div>
        </div>
    )
}

export default EditTodoItem
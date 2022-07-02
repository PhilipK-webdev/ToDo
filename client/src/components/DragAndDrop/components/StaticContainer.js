import React from 'react'
import styles from "../../../App.module.css"
import EditTodoItem from './EditTodoItem'
import ItemTodo from './ItemTodo'
function StaticContainer({ data,
    isEdit,
    editTodo,
    cancelEditTodo,
    textarea,
    setTextarea,
    submitToDo,
    edtiCompleteTask,
    completedArray,
    deleteItem,
    dragStart,
    onDrop,
    dragEnter
}) {
    return (
        <div className={styles.container__maintodo}>
            <div className={styles.container__maintodo__card}>
                {data.map((task, index) => {
                    return isEdit[task.id] ?
                        <EditTodoItem
                            key={task.id}
                            task={task}
                            textarea={textarea}
                            setTextarea={setTextarea}
                            edtiCompleteTask={edtiCompleteTask}
                            completedArray={completedArray}
                            index={index}
                            submitToDo={submitToDo}
                            cancelEditTodo={cancelEditTodo}
                        />
                        :
                        <ItemTodo
                            key={task.id}
                            deleteItem={deleteItem}
                            dragStart={dragStart}
                            onDrop={onDrop}
                            dragEnter={dragEnter}
                            task={task}
                            editTodo={editTodo}
                            completedArray={completedArray}
                            index={index} />
                })}
            </div>
        </div>
    )
}

export default StaticContainer
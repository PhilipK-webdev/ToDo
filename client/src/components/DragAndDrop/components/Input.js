import React from 'react'
function Input({ item, handlerAddTodo, submitTodo }) {
    return (
        <React.Fragment>
            <label htmlFor="add">Create new Task</label>
            <input
                name="add"
                type="text" placeholder="Add new task"
                value={item}
                onChange={handlerAddTodo} />
            <div onClick={(e) => submitTodo(e)}>submit</div>
        </React.Fragment>
    )
}

export default Input
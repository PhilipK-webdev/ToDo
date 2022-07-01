import React from 'react'
function Input({ item, handlerAddTodo, submitTodo }) {
    return (
        <React.Fragment>
            <label htmlFor="add">Create new ToDo</label>
            <input
                name="add"
                type="text" placeholder="Add new todo"
                value={item}
                onChange={handlerAddTodo} />
            <div onClick={(e) => submitTodo(e)}>submit</div>
        </React.Fragment>
    )
}

export default Input
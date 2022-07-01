import React from 'react'
import styles from "../../Login/Login.module.css";
function Form({ username, password, onChangeHandler, handleClick }) {
    return (
        <div className={styles.form}>
            <div className={styles.form__body}>
                <input
                    type="text"
                    className={styles.input_username}
                    value={username}
                    placeholder='username'
                    name="username"
                    onChange={(e) => onChangeHandler(e)} />
                <input type="password"
                    className={styles.input_password}
                    value={password}
                    placeholder='password'
                    name="password"
                    onChange={(e) => onChangeHandler(e)} />
                <button
                    className={styles.submit}
                    onClick={() => handleClick()}>
                    Enter
                </button>
            </div>
        </div>
    )
}

export default Form
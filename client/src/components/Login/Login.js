import React, { useEffect, useState } from 'react'
import styles from "../Login/Login.module.css";
import Form from './Form/Form';
function Login({ setIsLogged }) {
    const [usernameInput, setUsername] = useState("")
    const [passwordInput, setPassword] = useState("")
    const [user, setUser] = useState([]);
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}api/user/`);
        const user = await response.json();
        setUser(user);
    }


    const handleClick = () => {
        if (usernameInput && passwordInput) {
            const { fullname, password } = user[0];
            if (fullname.toLowerCase() === usernameInput.toLowerCase() &&
                parseInt(password) === parseInt(passwordInput)) setIsLogged(true);
            else setIsLogged(false);
            setPassword("");
            setUsername("");
        }
    }
    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        name === "password" ? setPassword(value) : setUsername(value)
    }

    return (
        <div className={styles.container}>
            <Form
                handleClick={handleClick}
                onChangeHandler={onChangeHandler}
                username={usernameInput}
                password={passwordInput} />
            {/* {this.state.errorMessage &&
                    <div className='error_form'>
                        {this.state.errorMessage}
                    </div>} */}

        </div>
    )
}

export default Login
import React, {useState} from "react";
import PropTypes from 'prop-types';
import logoImg from "../img/Pakworld.png";
import {Card, Logo, Form, Input, Button, Error} from '../components/style/auth-form';
import axios from "axios";

export default function LoginPage({ setToken, setUser }) {
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function loginUser() {
        axios.post("https://pakworldbackend.herokuapp.com/auth/login", {
            userName,
            password
        }).then(result => {
            if (result.status === 200) {
                setToken(result.data);
                setUser(result.data.user)
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    return (
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input
                    type="username"
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                    placeholder="username"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
                <Button onClick={loginUser}>Sign In</Button>
            </Form>
            <a href="/signup">Don't have an account?</a>
            { isError &&<Error>The username or password provided were incorrect!</Error> }
        </Card>
    );
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}
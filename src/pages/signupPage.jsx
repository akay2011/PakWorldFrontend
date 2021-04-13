import React, {useState, useEffect} from "react";
import logoImg from "../img/Pakworld.png";
import { Card, Logo, Form, Input, Button, Error } from '../components/style/auth-form';
import axios from "axios";

function SignupPage() {
    const [isError, setIsError] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function registerUser() {
        axios.post("https://pakworldbackend.herokuapp.com/auth/register", {
            userName,
            password
        }).then(result => {
            if (result.status === 200) {
                setRegistered(true)
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }


    useEffect(()=> {
        if(registered){
            window.location.href = "https://pakworldfrontend.herokuapp.com/"
        }
    }, [registered])


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
                <Button onClick={() => registerUser()}>Sign Up</Button>
            </Form>
            <a href="/">Already have an account?</a>
            { isError &&<Error>Something went wrong</Error> }
        </Card>
    );
}

export default SignupPage;

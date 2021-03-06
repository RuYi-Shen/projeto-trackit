import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Form from '../components/Form';
import logo from '../assets/logo.png';
import axios from 'axios';

export default function Register() {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if(Object.keys(userInfo).length !== 0){
            setDisabled(true);
            axios.post(URL, userInfo)
            .then((response) => {
                navigate("/");
            })
            .catch(error => {
                console.log(error);
                if(error.response.status === 409){
                    alert("Usuário já cadastrado!");
                }
                else alert("Erro ao cadastrar usuário!");
                setDisabled(false);
            });
        }
    }, [userInfo, navigate]);

    return (
        <Main>
            <img src={logo} alt="trackIt" />
            <Form type="register" setUserInfo={setUserInfo} disabled={disabled}/>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </Main>
    )
}


/**************************** css ****************************/

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 36px;
    background-color: var(--white);

    img {
        width: 180px;
        max-width: 100vw;
        max-height: 180px;
        margin-bottom: 40px;
    }

    form {
        max-width: 430px;
    }

    a {
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;

        margin-top: 25px;

        color: var(--blue);
    }
`

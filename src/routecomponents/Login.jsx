import styled from 'styled-components';
import Form from '../components/Form';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from "react";

import UserContext from "../contexts/UserContext";

export default function Login() {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    
    const [userInfo, setUserInfo] = useState({});
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const { setImage } = useContext(UserContext).image;


    useEffect(() => {
        if(Object.keys(userInfo).length !== 0){
            setDisabled(true);
            axios.post(URL, userInfo)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                setImage(response.data.image);
                navigate("/habitos");
            })
            .catch(error => {
                console.log(error);
                if(error.response.status === 401){
                    alert("Usuário ou senha incorretos!");
                }
                else alert("Erro ao fazer login");
                setDisabled(false);
            });
        }
    }, [userInfo, setImage, navigate]);

    return (
        <Main>
            <img src={logo} alt="trackIt" />
            <Form type="login" setUserInfo={setUserInfo} disabled={disabled}/>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Main>
    )
}


const Main = styled.main`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 36px;
    background-color: #fff;

    z-index: 1;

    img {
        width: 180px;
        max-width: 100vw;
        max-height: 180px;
        margin-bottom: 40px;
    }

    form {
        max-width: 640px;
    }

    a {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;

        margin-top: 25px;

        color: #52B6FF;
    }
`
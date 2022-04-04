import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";

import styled from 'styled-components';
import Form from '../components/Form';
import logo from '../assets/logo.png';
import axios from 'axios';


export default function Login() {
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [disabled, setDisabled] = useState(false);
    const { setUserData } = useContext(UserContext).userData;    

    useEffect(() => {
        if (localStorage.getItem('userData') !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')));
            navigate("/hoje");
        }
        if(Object.keys(userInfo).length !== 0){
            setDisabled(true);
            axios.post(URL, userInfo)
            .then((response) => {
                localStorage.setItem('userData', JSON.stringify(response.data));
                setUserData(response.data);
                navigate("/hoje");
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
    }, [userInfo, setUserData, navigate]);

    return (
        <Main>
            <img src={logo} alt="trackIt" />
            <Form type="login" setUserInfo={setUserInfo} disabled={disabled}/>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
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
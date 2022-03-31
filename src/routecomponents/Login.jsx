import styled from 'styled-components';
import Form from '../components/Form';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const [userInfo, setUserInfo] = useState({});

    return (
        <Main>
            <img src={logo} alt="trackIt" />
            <Form type="login" setUserInfo={setUserInfo}/>
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
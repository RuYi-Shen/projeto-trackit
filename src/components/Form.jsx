import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Form({type, setUserInfo}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const regEx = {
        email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", 
        password: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$", 
        name: "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$", 
        image: `(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        type === "register" ? setUserInfo({email, password, name, image}) : setUserInfo({email, password});
        console.log(email, password, name, image);
    }

    return (
        <Forms onSubmit={handleSubmit}>
            <input type="email" id="email" pattern={regEx.email} placeholder="email" required value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" id="password" pattern={regEx.password} placeholder="senha" required value={password} onChange={e => setPassword(e.target.value)} />
            {type === "register" ?
                <>
                <input type="text" id="name" pattern={regEx.name} placeholder="nome" required value={name} onChange={e => setName(e.target.value)} />
                <input type="url" id="image" pattern={regEx.image} placeholder="foto" required value={image} onChange={e => setImage(e.target.value)} />
                </>
            : null}   
            <button type="submit">{type === "register" ? "Cadastrar" : "Entrar"}</button>
        </Forms>
    )
}


const Forms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    input {
        width: 100%;
        height: 45px;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 0 11px;
        margin-bottom: 6px;
        
        &::placeholder {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;

            color: #DBDBDB;
        }
    }

    button {
        width: 100%;
        height: 45px;
        border: none;
        background-color: #52B6FF;
        border-radius: 5px;

        color: #FFF;

        &:hover {
            cursor: pointer;
        }
    }

`

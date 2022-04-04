import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";

import styled from "styled-components";

export default function Header() {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext).userData;
    const { image, name, email } = userData;
    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected(!selected);
    }

    function logout() {
        if (window.confirm("Deseja realmente sair?")) {
            localStorage.removeItem("userData");
            setUserData({});
            setSelected(false);
            navigate("/");
        }
    }

    return (
        <>
        <Title>
            <h1>TrackIt</h1>
            <img src={image} alt="profile" onClick={()=>handleClick()}/>
        </Title>
        <Profile selected={selected}>
            <img src={image} alt="profile" />
            <p>{name}</p>
            <p>{email}</p>
            <div className="buttons">
                <button onClick={()=>handleClick()}>Fechar</button>
                <button onClick={()=>logout()}>Sair</button>
            </div>
        </Profile>
        </>
    );
}


/**************************** css ****************************/

const Title = styled.header`

    position: fixed;
    width: 100vw;
    height: 70px;
    left: 0px;
    top: 0px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;

    background: var(--nightblue);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    z-index: 1;
    
    h1 {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 39px;
        line-height: 49px;

        color: var(--white);
    }

    img {
        width: 51px;
        height: 51px;
        left: 306px;
        top: 9px;

        background: url(image.png);
        border-radius: 50%;

        :hover {
            cursor: pointer;
        }
    }
`;

const Profile = styled.div`
    display: ${(props => props.selected ? 'flex' : 'none')};
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    z-index: 2;
    background-color:rgba(0,0,0,0.75);
    flex-direction: column;
    align-items: center;

    img {
        width: 100px;
        height: 100px;

        background: url(image.png);
        border-radius: 50%;
        margin-top: 20%;
    }

    p {
        margin-top: 20px;
        font-weight: bold;
        font-size: 20px;
        line-height: 22px;

        color: #999999;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        width: 250px;
        margin-top: 40px;
        
        button {
            height: 35px;
            padding: 0;
            background: none;
            border: none;
            color: #999999;
        }
    }
`
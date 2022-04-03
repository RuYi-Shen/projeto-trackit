import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";


export default function Nav() {
   
    const { progress } = useContext(UserContext).progress;

    return (
        <Navbar>
            <Link to="/habitos">Hábitos</Link>
            <Link to="/hoje">
                <CircularProgressbar
                    className="progress-circle"
                    value={progress}
                    text="Hoje"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "#52B6FF",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                    })}
                />
            </Link>
            <Link to="/historico">Histórico</Link>
        </Navbar>
    )
}


/**************************** css ****************************/

const Navbar = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 70px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;

    z-index: 1;

    a {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;

        color: var(--blue);

        .progress-circle {
            position: absolute;
            bottom: 10px;
            left: calc((100vw - 91px)/2);
            width: 91px;
            height: 91px;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
    }
`;

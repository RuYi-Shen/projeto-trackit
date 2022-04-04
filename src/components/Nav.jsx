import { useContext } from "react";
import { Link } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import styled from "styled-components";

export default function Nav() {

    const { progress } = useContext(UserContext).progress;

    return (
        <Navbar>
            <Link to="/habitos">Hábitos</Link>
            <Link to="/hoje">
                <CircularProgressbar
                    className="progress-circle"
                    value={progress}
                    maxValue={100}
                    text={<tspan dx={-22} dy={5}>Hoje</tspan>}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "var(--blue)",
                    textSize: "22px",
                    trailColor: "transparent",
                    textColor: "#FFF",
                    pathColor: "#FFF",
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
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: space-around;

    z-index: 1;

    a {
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

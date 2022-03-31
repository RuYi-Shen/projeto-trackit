import styled from "styled-components";
import { useContext } from "react";

import UserContext from "../contexts/UserContext";

export default function Header() {

    const { image } = useContext(UserContext).image;

    return (
        <Title>
            <h1>TrackIt</h1>
            <img src={image} alt="profile" />
        </Title>
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

    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    z-index: -1;
    
    h1 {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 39px;
        line-height: 49px;

        color: #FFFFFF;
    }

    img {
        width: 51px;
        height: 51px;
        left: 306px;
        top: 9px;

        background: url(image.png);
        border-radius: 98.5px;
    }
`;
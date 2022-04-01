import styled from 'styled-components';
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Today() {

    const { progress, setProgress } = useContext(UserContext).progress;

    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    const today = new Date();
    const day = weekdays[today.getDay()];
    const date = `${today.getDate()}`.padStart(2, "0");
    const month = `${today.getMonth()}`.padStart(2, "0");

    return (
        <Main>
            <h2>{day}, {date}/{month}</h2>
            {progress === 0 ? 
            <p>Nenhum hábito concluído ainda</p>:
            <p>{progress}% dos hábitos concluídos</p>}
        </Main>
    );
}

const Main = styled.main`
    
    height: 800px;
    margin: 98px 0;
    background-color: #F2F2F2;

`
/* 
switch(dayOfWeekNumber){
    case 0: 
        nameOfDay = 'Domingo';
        break;
    case 1:
        nameOfDay = 'Segunda';
        break;
    case 2:
        nameOfDay = 'Terça';
        break;
    case 3:
        nameOfDay = 'Quarta';
        break;
    case 4:
        nameOfDay = 'Quinta';
        break;
    case 5:
        nameOfDay = 'Sexta';
        break;
    case 6:
        nameOfDay = 'Sábado';
        break;

} */
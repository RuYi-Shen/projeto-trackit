import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import Daily from '../components/Daily';

export default function Today() {
    const URL ="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const HabitURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/";

    const { progress, setProgress } = useContext(UserContext).progress;
    const { token } = useContext(UserContext).userData.userData;
    const [config] = useState({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const [dailys, setDailys] = useState([]);
    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    const today = new Date();
    const day = weekdays[today.getDay()];
    const date = `${today.getDate()}`.padStart(2, "0");
    const month = `${today.getMonth()+1}`.padStart(2, "0");
    console.log(token)
    function getDailys () {
        axios.get(URL, config)
        .then((response) => {
            setDailys(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    function calculateProgress() {
        let doneHabits = 0;
        if(dailys.lenght > 0) {
            dailys.forEach(daily => {if(daily.done) doneHabits++}); 
            setProgress(Math.round(doneHabits*100/dailys.length));
        }
    }

    function checkDaily(id) {
        console.log(id);
        axios.post(`${HabitURL}${id}/check'`, config)
        .then((response) => {
            getDailys();
        })
        .catch(error => {
            console.log(error);
        });
    }

    function uncheckDaily(id) {
        axios.post(`${HabitURL}${id}/uncheck`, config)
        .then((response) => {
            getDailys();
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getDailys(); // eslint-disable-next-line
    }, []);

    useEffect(() =>{
        calculateProgress(); // eslint-disable-next-line
    }, [progress]); 

    return (
        <Main progress={progress > 0}>
            <h2>{day}, {date}/{month}</h2>
            {progress === 0 ? 
                <p>Nenhum hábito concluído ainda</p>
                :
                <p><span>{progress}% dos hábitos concluídos</span></p>
            }
            <section className="dailys">
                {dailys.length === 0 ?
                    <p>Você não tem nenhum hábito para hoje</p>
                    :
                    dailys.map((daily) => {
                        return <Daily key={daily.id} daily={daily} checkDaily={checkDaily} uncheckDaily={uncheckDaily}/>
                    })
                }
            </section>
        </Main>
    );
}

const Main = styled.main`
    min-height: 100vh;
    padding: 98px calc((100vw - 340px)/2);
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        width: 100%;
        font-size: 23px;
        line-height: 29px;

        color: #126BA5;
    }

    > p {
        width: 100%;
        font-size: 18px;
        line-height: 22px;

        color: #BABABA;

        span {
            color: ${(props => props.progress ? 'var(--green)' : '#EBEBEB')};
        }
    }

    .dailys {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 28px;
    }
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
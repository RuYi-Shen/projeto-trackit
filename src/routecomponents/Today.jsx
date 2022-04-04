import { useState, useEffect, useContext } from 'react';
import UserContext from "../contexts/UserContext";

import styled from 'styled-components';
import Header from "../components/Header";
import Daily from '../components/Daily';
import Nav from "../components/Nav";
import axios from 'axios';

export default function Today() {
    const URL ="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const HabitURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/";

    const { progress, setProgress } = useContext(UserContext).progress;
    const { token } = useContext(UserContext).userData.userData;
    const [dailys, setDailys] = useState([]);
    const [config] = useState({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    const today = new Date();
    const day = weekdays[today.getDay()];
    const date = `${today.getDate()}`.padStart(2, "0");
    const month = `${today.getMonth()+1}`.padStart(2, "0");

    function calculateProgress() {
        let doneHabits = 0;
        if(dailys.length > 0) {
            dailys.forEach(daily => {if(daily.done) doneHabits++}); 
            setProgress(Math.round(doneHabits*100/dailys.length));
        }
    }

    function getDailys () {
        axios.get(URL, config)
        .then((response) => {
            setDailys(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    function checkDaily(id) {
        axios.post(`${HabitURL}${id}/check`, {}, config)
        .then((response) => {
            getDailys();
        })
        .catch(error => {
            console.log(error);
        });
    }

    function uncheckDaily(id) {
        axios.post(`${HabitURL}${id}/uncheck`, {}, config)
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
    }, [dailys]); 


    return (
        <>
        <Header />
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
        <Nav />
        </>
    );
}

const Main = styled.main`
    min-height: 100vh;
    padding: 98px calc((100vw - 340px)/2);
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        width: 100%;
        font-size: 23px;
        line-height: 29px;

        color: var(--nightblue);
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

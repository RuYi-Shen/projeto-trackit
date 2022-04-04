import styled from 'styled-components';
import Calendar from 'react-calendar';  
import 'react-calendar/dist/Calendar.css';

export default function History() {
    return (
        <Main>
            <h2>Histórico</h2>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Calendar className="calendar" calendarType="US"/>
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

    p {
        width: 100%;
        font-size: 18px;
        line-height: 22px;
        margin: 17px 0;

        color: var(--grey);
    }

    .calendar {
        border-radius: 10px;
        border: none;
    }
`
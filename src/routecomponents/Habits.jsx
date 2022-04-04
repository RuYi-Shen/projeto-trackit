import { useState, useEffect, useContext } from 'react';
import UserContext from "../contexts/UserContext";

import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner'
import Habit from '../components/Habit';
import Header from "../components/Header";
import Nav from "../components/Nav";
import axios from 'axios';

export default function Habits() {
    const URL ="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    
    const [habits, setHabits] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [habitDesription, setHabitDesription] = useState('');
    const [selectedDays, setSelectedDays] = useState(new Map());
    const { token } = useContext(UserContext).userData.userData;
    const [config] = useState({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];    

    function resetForm () {
        setHabitDesription('');
        setSelectedDays(new Map());
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (selectedDays.size === 0) {
            alert("Selecione pelo menos um dia da semana!");
        }
        else createHabit();
    }

    function handleClick(index) {
        if (!disabled) {
            (selectedDays.has(index) ? 
            selectedDays.delete(index) 
            : 
            selectedDays.set(index))
            setSelectedDays(new Map(selectedDays));
        }
    }

    function getHabits () {
        axios.get(URL, config)
        .then((response) => {
            setHabits(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    function createHabit() {
        setDisabled(true);
        const data = {
            name: habitDesription,
            days: [...selectedDays.keys()]
        }
        axios.post(URL, data, config)
        .then((response) => {
            setDisabled(false);
            setCreateMode(false);
            resetForm();
            getHabits();
        })
        .catch(error => {
            setDisabled(false);
            console.log(error);
        });
    }

    function deleteHabit(id) {
        axios.delete(`${URL}/${id}`, config)
        .then((response) => {
            getHabits();
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => { 
        getHabits(); // eslint-disable-next-line
    }, []);

    return (
        <>
        <Header />
        <Main disabled={disabled}>
            <div className="header">
                <h2>Meus hábitos</h2>
                <button onClick={()=>setCreateMode(true)}>+</button>
            </div>
            {createMode ? 
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={disabled}>
                        <input type="text" placeholder="nome do hábito" value={habitDesription} onChange={e => setHabitDesription(e.target.value)} required/>
                        <div className="weekdays">
                            {weekdays.map((day,index) => {
                                return <Div key={index} selected={selectedDays.has(index)} onClick={()=>handleClick(index)}>{day}</Div>
                            })}
                        </div>
                        <div className="buttons">
                            <p onClick={()=>setCreateMode(false)}>Cancelar</p>
                            <button type="submit">{disabled ? <ThreeDots color="#FFF" height={30} width={60} /> : "Salvar"}</button>
                        </div>
                    </fieldset>
                </form>
                :
                null
            }
            <section className="habits">
                {habits.length === 0 ?
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    :
                    habits.map(({id, name, days}) => {
                        return <Habit key={id} id={id} description={name} selected={days} deleteHabit={deleteHabit}/>
                    })
                }
            </section>
        </Main>
        <Nav />
        </>
    );
}


/**************************** css ****************************/

const Main = styled.main`
    min-height: 100vh;
    padding: 98px calc((100vw - 340px)/2);
    background-color: var(--background);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;

        h2 {
            
            font-size: 23px;
            line-height: 29px;

            color: var(--nightblue);
        }

        > button {
            width: 40px;
            height: 35px;
            padding: 0;

            background: var(--blue);
            border-radius: 4.6px;
            border: none;

            font-size: 27px;
            display: flex;
            justify-content: center;

            color: #FFFFFF;
        }
    }

    form {
        width: 100%;
        height: 180px;

        background: #FFFFFF;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 18px;
        margin-top: 20px;
        position: relative;

        fieldset {
            width: 100%;
            margin: 0;
            padding: 0;
            border: none;

            input {
                width: 100%;
                height: 45px;

                border: 1px solid var(--border);
                border-radius: 5px;
                padding: 11px;
                background-color: ${(props => props.disabled ? 'var(--background)' : '#FFFFFF')};
                color: ${(props => props.disabled ? '#B3B3B3' : 'var(--grey)')};

                ::placeholder {
                    font-size: 20px;
                    line-height: 25px;

                    color: var(--lightgrey);
                }
            }
            
            .weekdays {
                display: flex;
                justify-content: start;
                width: 100%;
                margin-top: 8px;
                
                div {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 4px;

                    border: 1px solid var(--border);
                    box-sizing: border-box;
                    border-radius: 5px;

                    font-size: 20px;
                    line-height: 25px;

                }
            }

            .buttons {
                width: 180px;
                position: absolute;
                bottom: 18px;
                right: 18px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-size: 16px;
                    line-height: 20px;
                    text-align: center;

                    color: var(--blue);

                    :hover {
                        cursor: pointer;
                    }
                }

                button {
                    width: 84px;
                    height: 35px;

                    background: var(--blue);
                    border-radius: 4.63636px;
                    border: none;

                    font-size: 15.976px;
                    line-height: 20px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    color: #FFFFFF;
                }
            }
        }
    }
    .habits {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 28px;

        p {
            width: 101%;
            font-size: 18px;
            line-height: 22px;

            color: var(--grey);
        }
    }
`

const Div = styled.div`
    background-color: ${(props => props.selected ? 'var(--lightgrey)' : '#FFFFFF')};
    color: ${(props => props.selected ? '#FFFFFF' : 'var(--lightgrey)')};

    :hover {
        cursor: pointer;
    }
`;
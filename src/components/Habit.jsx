import styled from 'styled-components';
import icon from '../assets/delete-icon.png';

export default function Habit({id, description, selected, deleteHabit}) {
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];   

    function handleDelete() {
        const sure = window.confirm(`Realmente deseja excluir o hábito "${description}" ?`);
        if(sure) deleteHabit(id);
    }

    return (
        <MyHabit>
            <p>{description}</p>
            <img src={icon} alt="delete-icon" onClick={()=>handleDelete()}/>
            <div className="weekdays">
                {weekdays.map((day,index) => {
                    return <Div key={index} selected={selected.includes(index)} >{day}</Div>
                })}
            </div>
        </MyHabit>
    );
}

const MyHabit = styled.div`
    width: 100%;
    height: 91px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: start;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    position: relative;
    margin-bottom: 10px;

    p {
        font-size: 20px;
        line-height: 25px;

        color: #666666;
    }

    img {
        width: 15px;
        height: 16px;
        position: absolute;
        top: 13px;
        right: 15px;

        :hover {
            cursor: pointer;
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

            border: 1px solid #D5D5D5;
            box-sizing: border-box;
            border-radius: 5px;

            font-size: 20px;
            line-height: 25px;

        }
    }
`

const Div = styled.div`
    background-color: ${(props => props.selected ? '#DBDBDB' : '#FFFFFF')};
    color: ${(props => props.selected ? '#FFFFFF' : '#DBDBDB')};

    :hover {
        cursor: pointer;
    }
`;
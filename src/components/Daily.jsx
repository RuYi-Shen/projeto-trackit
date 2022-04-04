import styled from 'styled-components';
import check from '../assets/check.png';

export default function Daily({daily, checkDaily, uncheckDaily}) {
    const { id, name, done, currentSequence, highestSequence } = daily;

    function handleClick() {
        done ? uncheckDaily(id) : checkDaily(id);
    }

    return (
        <Div done={done} equal={currentSequence === highestSequence && currentSequence !== 0}>
            <h3>{name}</h3>
            <p>Sequência atual: <span className="current">{currentSequence} dias</span></p>
            <p>Seu recorde: <span className="highest">{highestSequence} dias</span></p>
            <div className="checkbox" onClick={handleClick}>
                <img src={check} alt="check" />
            </div>
        </Div>
    );
}


/**************************** css ****************************/

const Div = styled.div`
    width: 100%;
    min-height: 94px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: start;
    background: var(--white);
    border-radius: 5px;
    padding: 15px;
    position: relative;
    margin-bottom: 10px;

    h3 {
        font-size: 20px;
        line-height: 25px;
        margin-bottom: 5px;

        color: var(--grey);
    }

    p {
        font-size: 13px;
        line-height: 16px;

        color: var(--grey);

        .current{
            color: ${(props => props.done ? 'var(--green)' : 'var(--grey)')};
        }

        .highest {
            color: ${(props => props.equal ? 'var(--green)' : 'var(--grey)')};
        }
    }

    .checkbox {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 69px;
        height: 69px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props => props.done ? 'var(--green)' : '#EBEBEB')};
        border: 1px solid #E7E7E7;
        box-sizing: border-box;
        border-radius: 5px;

        img {
            width: 70px;
            height: 70px;
        }
    }
`
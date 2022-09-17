import React, { Dispatch, SetStateAction } from "react"
import styled from "styled-components"

interface Props {
    label: string
    color: string
    length?: string
    textColor?: string
    onClick?: () => void
    display: Dispatch<SetStateAction<string>>,
    type?: string,
    setCurrentOperation?: Dispatch<SetStateAction<string>>,
    currentOperation: string,
    setSecondState: Dispatch<SetStateAction<string>>
}
interface styledProps {
    color: string
    length?: string
    textColor?: string
}

const Button = styled.button<styledProps>`
    all: unset;
    margin: 5px;
    font-size: 20px;
    text-align: ${props => props.length === 'medium' ? 'left' : 'center'};
    padding-left: ${props => props.length === 'medium' && '20px'} ;
    height: var(--button-size);
    border-radius: var(--button-size);
    cursor: pointer;
    color: ${props => props.textColor || 'white'};
    width: ${props => props.length === 'medium' ? '90px' : 'var(--button-size)'};
    border-color: ${props => {
        switch (props.color) {
            case 'dark':
                return 'var(--dark-color)'
            case 'light':
                return 'var(--light-color)'
            case 'highlight':
                return 'var(--highlight-color)'
            default:
                return 'var(--dark-color)'
        }
    }};
    background-color: ${props => {
        switch (props.color) {
            case 'dark':
                return 'var(--dark-color)'
            case 'light':
                return 'var(--light-color)'
            case 'highlight':
                return 'var(--highlight-color)'
            default:
                return 'var(--dark-color)'
        }
    }};
`

const BasicButton: React.FC<Props> = ({ currentOperation, setSecondState, label, color, length, textColor, setCurrentOperation, onClick, display, type }) => {
    const handleClick = () => {
        if (!type) {
            if (currentOperation !== '') {
                setSecondState((state) => {
                    if (state.length === 9) return state
                    return state === '0' ? label : state.concat(label)
                })
                return
            }
            display((state) => {
                if (state.length === 9) return state
                return state === '0' ? label : state.concat(label)
            })
        }
        if (type === 'operation' && setCurrentOperation && label !== '=') {
            setCurrentOperation(label)
        }
        onClick && onClick();
    }
    return (
        <Button color={color} length={length} textColor={textColor} onClick={handleClick}>
            {label}
        </Button>
    )
}

export default BasicButton
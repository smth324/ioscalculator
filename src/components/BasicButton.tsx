import React, { Dispatch, SetStateAction } from "react"
import styled from "styled-components"

interface Props {
    label: string
    color: string
    length?: string
    textColor?: string
    onClick?: () => void
    display: Dispatch<SetStateAction<string>>
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
    color: ${props => {
        switch (props.textColor) {
            case 'white':
                return 'white'
            case 'black':
                return 'black'
            default:
                return 'white'
        }
    }};
    width: ${props => {
        switch (props.length) {
            case 'small':
                return 'var(--button-size)'
            case 'medium':
                return '90px'
            default:
                return 'var(--button-size)'
        }
    }};
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

const BasicButton: React.FC<Props> = ({ label, color, length, textColor, onClick, display }) => {
    const handleClick = () => {
        onClick && onClick();
        (label === 'AC' || label === 'C') || display((state) => (state === '0' || state === 'C') ? label : state.concat(label))
    }
    return (
        <Button color={color} length={length} textColor={textColor} onClick={handleClick}>
            {label}
        </Button>
    )
}

export default BasicButton
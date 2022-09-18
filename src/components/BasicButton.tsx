import React from "react"
import styled from "styled-components"

interface Props {
    label: string
    color: string
    length?: string
    textColor?: string
    onClick?: (label: string) => void
    currentOperation: string,
}
interface styledProps {
    color: string
    selected: boolean
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
    color: ${props => props.selected ? 'var(--highlight-color)' : (props.textColor || 'white')};
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
        if (props.selected) return 'white'
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

const BasicButton: React.FC<Props> = ({ currentOperation, label, color, length, textColor, onClick, }) => {
    const handleClick = () => {
        onClick && onClick(label)
    }
    return (
        <Button color={color} length={length} textColor={textColor} onClick={handleClick} selected={label === currentOperation}>
            {label}
        </Button>
    )
}

export default BasicButton
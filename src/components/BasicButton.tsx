import React from "react"
import styled from "styled-components"

interface Props {
    label: string
    color: string
}

const Button = styled.button`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    width: var(--button-size);
    height: var(--button-size);
    border-radius: 50%;
    background-color: ${props => {
        switch (props.color) {
            case 'black':
                return 'black'
        }
    }};
`

const BasicButton: React.FC<Props> = ({ label, color }) => {
    return (
        <Button color={color}>
            {label}
        </Button>
    )
}

export default BasicButton
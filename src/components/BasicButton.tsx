import React from "react"
import styled from "styled-components"

interface Props {
    label: string
}

const Button = styled.button`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    width: var(--button-size);
    height: var(--button-size);
    border-radius: 50%;
`

const BasicButton: React.FC<Props> = ({ label }) => {
    return (
        <Button>
            {label}
        </Button>
    )
}

export default BasicButton
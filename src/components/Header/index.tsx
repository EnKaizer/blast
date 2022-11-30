import React from 'react'
import { HeaderContainer } from './HeaderContainer'

type HeaderProps = {
    matchName: string;
}

export const Header = ({matchName}: HeaderProps) => {
    return (
        <HeaderContainer>
            <img src="https://chewedup.blast.tv/images/blast-logo.svg" alt='blast_logo'/>
            <h2>Blast.Tv CODE CHALLENGE</h2>
            <h2>{matchName}</h2>
        </HeaderContainer>
    )
}
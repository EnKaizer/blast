import styled from 'styled-components'

interface Props {
    side: string
}

export const ScoreBoardHeaderTeams = styled.div<Props>`
    width: 100%;
    height: 25px;
    margin: 6px 0;
    display: grid;
    grid-template-columns: 6fr repeat(4, 1fr);
    background: ${(props) => props.side === 'CT' ? 'rgba(41,144,216,.4)' : 'rgba(240,180,18,.4)'};
`

export const ScoreBoardPlayersRow = styled.div<Props>`
    width: 100%;
    height: 25px;
    margin: 4px 0;
    display: grid;
    grid-template-columns: 6fr repeat(4, 1fr);
    background: ${(props) => props.side === 'CT' ? 'rgba(41,144,216,.2)' : 'rgba(240,180,18,.2)'};
`
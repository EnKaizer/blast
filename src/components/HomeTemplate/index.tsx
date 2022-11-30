
import React from 'react';
import { Header } from '../Header';
import { MatchStatus, RoundsInfoType } from '../MatchStatus';
import { ScoreBoard, TeamsType } from '../ScoreBoard';
import { HomeTemplateContainer } from './HomeTemplateContainer';
import { InfoBlock } from './InfoBlock';


type HomeTemplateProps = {
    matchName: string;
    mapPlayed: string;
    teamCT: TeamsType;
    teamT: TeamsType;
    roundsInfo: RoundsInfoType
}

export const HomeTemplate = ({matchName, teamCT, teamT, roundsInfo, mapPlayed}: HomeTemplateProps) => {
    return(
        <HomeTemplateContainer>
            <InfoBlock>
                <Header matchName={matchName}/>
                <MatchStatus mapPlayed={mapPlayed} roundsInfo={roundsInfo}/>
                <ScoreBoard CT={teamCT} T={teamT} totalRounds={roundsInfo.rounds_played}/>
            </InfoBlock>
            <img style={{zIndex: -1, position: 'absolute', top: 0, height: '100%', width: '90%'}} alt="background_map" src='https://images.prismic.io/rivalryglhf/20c6ecd3965464a23ce1669a6d20620b3c49fe20_csgo-nuke.jpg?auto=compress,format'/>
            <img style={{zIndex: -1, position: 'absolute', top: 0, height: '100%', width: '90%'}} alt="background_blast" src='https://chewedup.blast.tv/images/header.png'/>
        </HomeTemplateContainer>
    )
}
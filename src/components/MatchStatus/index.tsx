import React from "react";
import { MatchStatusContainer } from "./MatchStatusContainer";



export type RoundsInfoType = {
    score_CT: number,
    score_T: number,
    rounds_played: number,
    total_time: string
}

type MatchStatusProps = {
    roundsInfo: RoundsInfoType;
    mapPlayed: string;
}

export const MatchStatus = ({roundsInfo, mapPlayed}: MatchStatusProps) => {
    return (
        <>
            <MatchStatusContainer style={{ width: '100%' }}>
                <h2 style={{width: 220}}>Map: {mapPlayed}</h2>
                <h2 style={{width: 220}}>Total Rounds: {roundsInfo.rounds_played}</h2>
                <h2 style={{width: 220}}>Estimated time of match: {roundsInfo.total_time}</h2>
            </MatchStatusContainer>
            <MatchStatusContainer>
                <h2 style={{color: 'rgb(41,144,216)'}}>{roundsInfo.score_CT}</h2>
                <h2 style={{letterSpacing: 2, marginLeft: 4}}>:</h2>
                <h2 style={{color: 'rgb(240,180,18)'}}>{roundsInfo.score_T}</h2>
            </MatchStatusContainer>
        </>
    )
}
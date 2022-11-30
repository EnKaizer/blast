import React from 'react';
import { ScoreBoardContainer } from './ScoreBoardContainer';
import { ScoreBoardHeaderTeams, ScoreBoardPlayersRow } from './ScoreBoardRows';


type PlayerStats = {
    steam_id: string,
    name: string,
    deaths: number,
    kills: number,
    assist: number
  }
  
export type TeamsType = {
    [key: string]: PlayerStats;
};

type ScoreBoardProps = {
    T: TeamsType,
    CT: TeamsType,
    totalRounds: number
}

export const ScoreBoard = ({T, CT, totalRounds}: ScoreBoardProps) => {

    const sortRank = (a: PlayerStats , b: PlayerStats) =>{
        if(a.kills > b.kills) return -1;
        if(a.kills < b.kills) return 1;
        return 0
    }
    return(
        <ScoreBoardContainer>
            <div>
                <ScoreBoardHeaderTeams side="CT">
                    <label style={{marginLeft: 6}}>
                        <img style={{marginRight: 6}} width={18} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Natus_Vincere_logo.png/640px-Natus_Vincere_logo.png'}/>
                        Name
                    </label>
                    <label>K</label>
                    <label>A</label>
                    <label>D</label>
                    <label>KDR</label>
                </ScoreBoardHeaderTeams>
                {Object.values(CT).sort(sortRank).map(({name, kills, assist, deaths, steam_id}) => {
                    return (
                        <ScoreBoardPlayersRow key={steam_id} side="CT">
                            <label style={{marginLeft: 6}}>{name}</label>
                            <label>{kills}</label>
                            <label>{assist}</label>
                            <label>{deaths}</label>
                            <label>{(kills/totalRounds).toFixed(2)}</label>
                        </ScoreBoardPlayersRow>
                    )
                })}
            </div>
            <div>
                <ScoreBoardHeaderTeams side="T">
                    <label style={{marginLeft: 6, alignItems: 'center'}}>
                        <img style={{marginRight: 6}} width={18} src={'https://upload.wikimedia.org/wikipedia/commons/9/92/Logo_Team_Vitality_2020.png'}/>
                        Name
                    </label>
                    <label>K</label>
                    <label>A</label>
                    <label>D</label>
                    <label>KDR</label>
                </ScoreBoardHeaderTeams>
                {Object.values(T).sort(sortRank).map(({name, kills, assist, deaths, steam_id}) => {
                    return (
                        <ScoreBoardPlayersRow key={steam_id} side="T">
                            <label style={{marginLeft: 6}}>{name}</label>
                            <label>{kills}</label>
                            <label>{assist}</label>
                            <label>{deaths}</label>
                            <label>{(kills/totalRounds).toFixed(2)}</label>
                        </ScoreBoardPlayersRow>
                    )
                })}
            </div>
        </ScoreBoardContainer>
    )
}
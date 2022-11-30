// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type PlayerStats = {
  steam_id: string,
  name: string,
  deaths: number
}

type TeamsType = {
  [key: string]: PlayerStats;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data_game = (await axios.get('https://blast-recruiting.s3.eu-central-1.amazonaws.com/NAVIvsVitaGF-Nuke.txt')).data
  const data = data_game.split('\r\n')
  const match_data = data.slice(data.indexOf('11/28/2021 - 20:41:11: MatchStatus: Score: 0:0 on map "de_nuke" RoundsPlayed: 0', 0))

  const match_status = match_data.filter((d: string) => d.includes('MatchStatus'))
  const last_round = match_status[match_status.length -1]
  const team_1_side = match_status[match_status.length -2].split('Team playing "')[1].split('": ')[0]
  const team_1_name = match_status[match_status.length -2].split('Team playing "')[1].split('": ')[1]
  const team_2_side = match_status[match_status.length -3].split('Team playing "')[1].split('": ')[0]
  const team_2_name = match_status[match_status.length -3].split('Team playing "')[1].split('": ')[1]
  
  const map = last_round.split('map "')[1].split('" Rounds')[0]
  const score = last_round.split('Score: ')[1].split(' on map')[0]

  let players_last_log = match_data.filter((d: string) => d.includes('money change'))
  players_last_log = players_last_log.slice(Math.max(players_last_log.length - 10, 1))

  const players_team_1 = getPlayersByTeamSide(players_last_log, team_2_side)
  const players_team_2 = getPlayersByTeamSide(players_last_log, team_1_side)
  
  let TEAM_1 = players_team_1 as TeamsType

  let TEAM_2 = players_team_2 as TeamsType  

  const getStats = (name: string, player_id: string, team: string) => {
    const kills = match_data.filter((d: string) => {
      const rx = new RegExp(`.+ "${name}<\\d{1,3}><${player_id}><(CT|TERRORIST)>.+(killed).+<\\d{1,3}><(STEAM.+\\d)>.+`, 'gm')
      const m = rx.exec(d)
      if(m !== null && m[3]) {
        switch(team){
          case 'TEAM_1':
            TEAM_2[m[3]].deaths++
            break;
          case 'TEAM_2':
            TEAM_1[m[3]].deaths++
            break;   
        }
      }
      
      return m?.length
    }).length
    const assist = match_data.filter((d: string) => {
      const rx = new RegExp(`.+ "${name}<\\d{1,3}><${player_id}><(CT|TERRORIST)>.+(assisted).+<\\d{1,3}><(STEAM.+\\d)>.+`, 'gm')
      return rx.test(d)
    }).length
    return {kills, assist}
  }

  Object.values(TEAM_2).map(player => getStats(player.name, player.steam_id, 'TEAM_2'))
  
  const TEAM_CT = Object.values(TEAM_1).reduce((prev, player) => {
    return {...prev, [player.steam_id]: {...player, deaths: player.deaths, ...getStats(player.name, player.steam_id, 'TEAM_1')}}
  }, {})

  const TEAM_T = Object.values(TEAM_2).reduce((prev, player) => {
    return {...prev, [player.steam_id]: {...player, deaths: player.deaths, ...getStats(player.name, player.steam_id, 'TEAM_2')}}
  }, {})
  
  const rounds = {
    rounds_played:  last_round.split('RoundsPlayed: ')[1],
    score_T: score.split(':')[1],
    score_CT: score.split(':')[0],
    total_time: match_data.filter((d: string) => d.includes('Game Over'))[0].split('after ')[1]
  }

  res.status(200).json(
    {
      map,
      rounds,
      TEAM_CT,
      TEAM_T,
      match_name: `${team_1_name} x ${team_2_name}`
    })
}

const getPlayersByTeamSide = (logs: Array<string>, side: string) => {
  return logs.reduce((prev: object, players: string) => {
    const rx = new RegExp('.+ "(.+)<\\d{1,3}><(.+)><(.+)>', 'gm')
    const player_props = rx.exec(players)

    if(player_props != null && side === player_props[3]) {
      return {...prev, [player_props[2]]: {steam_id: player_props[2], name: player_props[1], deaths: 0}}
    }
    return prev
  }, {})
}



import Head from 'next/head'
import { useState, useEffect } from 'react'
import { HomeTemplate } from '../src/components/HomeTemplate'
import { Loader } from '../src/components/Loader'
import { RoundsInfoType } from '../src/components/MatchStatus'

export default function Home() {
  const [roundsInfo, setRoundsInfo] = useState<RoundsInfoType>({score_CT: 0, score_T: 0, rounds_played: 0, total_time: ''})
  const [teamCT, setTeamCT] = useState({})
  const [teamT, setTeamT] = useState({})
  const [matchName, setMatchName] = useState('')
  const [mapPlayed, setMapPlayed] = useState('')

  const getMatchInfo = async () => {
    const data = (await (await fetch('/api/match')).json())
    setRoundsInfo(data.rounds)
    setTeamCT(data.TEAM_CT)
    setTeamT(data.TEAM_T)
    setMatchName(data.match_name)
    setMapPlayed(data.map)
  }

  useEffect(() => {
    getMatchInfo()
  }, [])

  if(!matchName) return <Loader />
  

  return (
    <>
      <Head>
        <title>Blast code Challenge</title>
      </Head>
      <HomeTemplate 
        mapPlayed={mapPlayed}
        roundsInfo={roundsInfo}
        teamCT={teamCT}
        teamT={teamT}
        matchName={matchName}
      />
    </>
  )
}

import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import BackGround from 'src/components/BackGround'
import Bio from 'src/components/Bio'
import Header from 'src/components/Header'
import config from 'src/constants/config'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import NewFeed from '../NewFeed'
import Feed from 'src/components/Feed/Feed'

interface DataUser extends User {
  followed: []
  following: []
  all_tweet: []
}

export default function Profile() {
  const { profile, setProfile } = useContext(AppContext)
  const username = profile?.username
  useEffect(() => {
    const controller = new AbortController()
    axios
      .get(`/users/${username}`, {
        baseURL: config.baseUrl,
        signal: controller.signal
      })
      .then((res) => {
        setProfile(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {})
    return () => controller.abort()
  }, [username, setProfile])

  return (
    <>
      <Header label='Profile' showBackArrow />
      <BackGround />
      <Bio />
      <Feed />
    </>
  )
}

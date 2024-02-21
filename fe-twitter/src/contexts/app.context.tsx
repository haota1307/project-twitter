import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLs, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isLoginOAuth: boolean
  setIsLoginOAuth: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  reset: () => void
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLs()),
  isLoginOAuth: false,
  setIsLoginOAuth: () => null,
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)
  const [isLoginOAuth, setIsLoginOAuth] = useState<boolean>(defaultValue.isLoginOAuth)
  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        isLoginOAuth,
        setIsLoginOAuth,
        setIsAuthenticated,
        profile,
        setProfile,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

import React from 'react'

export interface TUserContext {
    isAuthenticated: boolean
}

export const UserContext = React.createContext<TUserContext>({
  isAuthenticated: false
})

export interface TUser {
  name: string
  email: string
}

import React from 'react'

export interface TUserContext {
    isAuthenticated: boolean
}

export const UserContext = React.createContext<TUserContext>({
  isAuthenticated: false
})

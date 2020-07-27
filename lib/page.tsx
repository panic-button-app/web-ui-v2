import React from 'react'
import Router from 'next/router'
import _ from 'lodash'

// eslint-disable-next-line no-unused-vars
import { TUserContext, UserContext, TUser } from './user-context'

import { useAuth0, Auth0Provider } from './auth0'

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  Router.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

type Props = React.PropsWithChildren<{}>;

interface UserInfoProps {
  isAuthenticated: boolean
  loginWithRedirect: Function
  logout: Function
  user: TUser
}

const UserInfo = (props: UserInfoProps): React.ReactElement => {
  if (!props.isAuthenticated) {
    return (
      <form className="form-inline">
        <button type="button" className="btn btn-link" onClick={() => props.loginWithRedirect({})}>Log in</button>
      </form>
    )
  }

  return <>
    <span className="navbar-text">
    Logged in as {_.get(props.user, 'name', '')}
    </span>
    <form className="form-inline">
      <button type="button" className="btn btn-link" onClick={() => props.logout()}>Log out</button>
    </form>
  </>
}

// Page provides authentication information with a context, the type being
// UserContext from user-context.ts.
const Page = (props: Props): React.ReactElement => {
  if (typeof window === 'undefined') {
    return null
  }

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0() as any
  const userContext: TUserContext = {
    isAuthenticated
  }

  return <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Panic Button</a>
        <UserInfo
          user={user}
          loginWithRedirect={loginWithRedirect}
          isAuthenticated={isAuthenticated}
          logout={logout} />
      </nav>
    </div>
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  </>
}

const RedirectUri = () => {
  if (typeof window === 'undefined') {
    return ''
  }
  return window.location.origin
}

const PageWrapped = (props: Props) => (
  <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    client_id={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirect_uri={RedirectUri()}
    onRedirectCallback={onRedirectCallback as any}
    cacheLocation='localstorage'>
    <Page {...props} />
  </Auth0Provider>)

export default PageWrapped

import React from 'react'
import Router from 'next/router'

// eslint-disable-next-line no-unused-vars
import { TUserContext, UserContext } from './user-context'

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

// Page provides authentication information with a context, the type being
// UserContext from user-context.ts.
const Page = (props: Props): React.ReactElement => {
  if (typeof window === 'undefined') {
    return null
  }

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0() as any
  const userContext: TUserContext = {
    isAuthenticated
  }

  return <>
    <div>
      <h2>Nav bar</h2>
      <div>
        {!isAuthenticated && (
          <button type="button" className="btn btn-link" onClick={() => loginWithRedirect({})}>Log in</button>
        )}

        {isAuthenticated && <button type="button" className="btn btn-link" onClick={() => logout()}>Log out</button>}
      </div>
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

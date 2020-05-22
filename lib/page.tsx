import "react";
import Router from 'next/router';

import { useAuth0, Auth0Provider } from "./auth0";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    Router.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};


type Props = React.PropsWithChildren<{}>;

const Page = (props: Props): React.ReactElement => {
    if (typeof window === 'undefined') {
        return null;
    }

    console.log(useAuth0());
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0() as any;

    return <>
        <div>
            <h2>Nav bar</h2>
            <div>
                {!isAuthenticated && (
                    <button onClick={() => loginWithRedirect({})}>Log in</button>
                )}

                {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
            </div>
        </div>
        {props.children}
    </>;
};

const redirect_uri = () => {
    if (typeof window == 'undefined') {
        return '';
    }
    return window.location.origin;
}

const PageWrapped = (props: Props) => (
<Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    client_id={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    redirect_uri={redirect_uri()}
    onRedirectCallback={onRedirectCallback as any}
    cacheLocation='localstorage'>
    <Page {...props} />
</Auth0Provider>);


export default PageWrapped;

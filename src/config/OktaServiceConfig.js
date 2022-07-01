
import AppConfig from "./AppConfig";

const CLIENT_ID =  AppConfig.ServiceConfig.OKtaClientID;
const ISSUER = AppConfig.ServiceConfig.OktaAuthURI;
const OKTA_TESTING_DISABLEHTTPSCHECK = false;
const REDIRECT_URI = window.location.origin + "/login/callback";


const OktaServiceConfig = {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
}

export default OktaServiceConfig;

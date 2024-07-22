// src/authConfig.js

const oidcConfig = {
    authority: 'https://idp.us.my-shopping.com:9443/oauth2/token',  // OIDC provider URL
    client_id: 'hRO5JJ7RecIDJKhRuSWlkMT5ivYa',
    // client_id: '9Nyk1SlC6C1y8aVpVbfcMD0Bvcoa',
    redirect_uri: window.location.origin + '/callback',
    response_type: 'code',
    scope: 'openid profile email internal_login',
    post_logout_redirect_uri: window.location.origin,
};

export default oidcConfig;
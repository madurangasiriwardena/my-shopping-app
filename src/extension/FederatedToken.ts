interface FederatedToken {
    idp: string;
    scope: string;
    tokenValidityPeriod: string;
    accessToken: string;
}

export default FederatedToken;

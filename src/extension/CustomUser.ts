import {User, UserProfile} from "oidc-client-ts";

class CustomUser extends User {

    public resident_token?: string;

    public constructor(args: {
        id_token?: string;
        session_state?: string | null;
        access_token: string;
        refresh_token?: string;
        token_type: string;
        scope?: string;
        profile: UserProfile;
        expires_at?: number;
        userState?: unknown;
        url_state?: string;
        federated_tokens?: FederatedToken[];
    }) {

        super(args);
        this.id_token = args.id_token;
        this.resident_token = args.federated_tokens?.[0].accessToken;
    }

    // Add custom methods here
}

export default CustomUser;
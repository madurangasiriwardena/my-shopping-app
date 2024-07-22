import {UserManager, UserManagerSettings, SigninResponse, ErrorResponse, User, ExtraHeader} from 'oidc-client-ts';
import CustomUser from './CustomUser';

class CustomUserManager extends UserManager {
    constructor(settings: UserManagerSettings) {
        super(settings);
    }

    protected async _buildUser(signinResponse: SigninResponse, verifySub?: string) {
        const logger = this._logger.create("_buildUser");
        const user = new CustomUser(signinResponse);
        if (verifySub) {
            if (verifySub !== user.profile.sub) {
                logger.debug("current user does not match user returned from signin. sub from signin:", user.profile.sub);
                throw new ErrorResponse({...signinResponse, error: "login_required"});
            }
            logger.debug("current user matches user returned from signin");
        }

        await this.storeUser(user);
        logger.debug("user stored");
        await this._events.load(user);

        return user;
    }
}

export default CustomUserManager;

// src/AuthService.js

// import { UserManager } from 'oidc-client-ts';
import oidcConfig from './authConfig';
import CustomUserManager from "./CustomUserManager";

class AuthService {
    constructor() {
        this.userManager = new CustomUserManager(oidcConfig);
        this.user = null;

        this.userManager.events.addUserLoaded((user) => {
            this.user = user;
            console.log('User loaded:', user);
        });

        this.userManager.events.addUserUnloaded(() => {
            this.user = null;
            console.log('User logged out');
        });
    }

    async login() {
        try {
            await this.userManager.signinRedirect();
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    async handleCallback() {
        try {
            if (!this.user) { // Ensure callback is processed only once
                this.user = await this.userManager.signinCallback();
            }
            console.info('Callback user:', this.user);
            return this.user;
        } catch (error) {
            console.error('Callback error:', error);
        }
    }

    async logout() {
        try {
            await this.userManager.signoutRedirect();
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    async getUser() {
        try {
            return await this.userManager.getUser();
        } catch (error) {
            console.error('Get user error:', error);
        }
    }

    getAccessToken() {
        return this.user ? this.user.access_token : null;
    }

    getFederatedToken() {
        console.log('Profile:', this.user ? this.user.profile : null)
        return this.user ? this.user.profile.federated_token : null;
    }
}

export default new AuthService();

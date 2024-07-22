// src/AuthService.js

// import { UserManager } from 'oidc-client-ts';
import oidcConfig from './authConfig';
import CustomUserManager from "./extension/CustomUserManager";

class AuthService {

    private userManager: CustomUserManager;
    private user: any;

    constructor() {
        this.userManager = new CustomUserManager(oidcConfig);
        this.user = null;

        this.userManager.events.addUserLoaded((user) => {
            this.user = user;
            console.log('User loaded:', user);
            this.updateLoggedInState(true);
        });

        this.userManager.events.addUserUnloaded(() => {
            this.user = null;
            console.log('User logged out');
            this.updateLoggedInState(false);
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

    getResidentToken() {
        console.log('Profile:', this.user ? this.user.profile : null)
        return this.user ? this.user.resident_token : null;
    }

    isLoggedIn() {
        return !!this.user;
    }

    private updateLoggedInState(isLoggedIn: boolean) {
        // You can use a global state manager or context API to update the state
        // For simplicity, we'll use a custom event to update the state in the component
        const event = new CustomEvent('authChange', { detail: { isLoggedIn } });
        window.dispatchEvent(event);
    }
}

export default new AuthService();

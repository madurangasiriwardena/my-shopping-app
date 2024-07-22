// src/api.ts

import AuthService from "./AuthService";

const apiCall = async (url: string, isResidentCall: boolean) => {
    // create variable token if isResidentCall is true and AuthService.getResidentToken() is not empty using AuthService.getResidentToken(), else create variable token with AuthService.getAccessToken()
    const token = isResidentCall && AuthService.getResidentToken() ? await AuthService.getResidentToken() : await AuthService.getAccessToken();

    const response = await fetch(url, {
        method: 'GET',  // Or the appropriate HTTP method for your API
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('API call failed');
    }

    return response;
};

export default apiCall;

// src/api.js

const apiCall = async (url, token) => {
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

    return response.json();
};

export default apiCall;

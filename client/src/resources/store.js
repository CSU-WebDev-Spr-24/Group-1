import { create } from 'zustand';
import axios from "axios";

export const useStore = create((set) => ({
    loggedIn: !!sessionStorage.getItem('authToken'),
    username: JSON.parse(sessionStorage.getItem('username')) || null,
    authToken: sessionStorage.getItem('authToken') || null,
    searchResults: [],
    modalContent: null,

    // Login
    login: async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response.data.message === 'Login successful') {
                set({
                    authToken: response.data.token,
                    username: response.data.username,
                    loggedIn: true,
                });

                // store the auth token in session storage
                sessionStorage.setItem('username', JSON.stringify(response.data.username));
                sessionStorage.setItem('authToken', response.data.token);

                console.log(`Login successful! Name: ${response.data.username}, loggedIn: ${response.data.loggedIn}, authToken: ${response.data.token}`);
                console.log(`Response data:`, response.data);
            }
        } catch (error) {
            let errMsg = 'Login failed, please try again.'; // default error message
            if (error?.response.data) {
                errMsg = error.response.data.message || errMsg;
            }
            throw new Error(errMsg);
        }
    },

    logout: () => {
        set({ user: null, loggedIn: false, authToken: null, journalEntries: [] });
        sessionStorage.clear();
    },

    // Register
    register: async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/register', { username, password });
            console.log('Registration successful:', response.data);
            alert('Registration successful');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    search: async (searchQuery) => {
        // get the auth token from the store
        const authToken = useStore.getState().authToken;

        if (searchQuery === '') {
            alert('Please enter a search query');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/search?searchQuery=${searchQuery}`,{
                // include the auth token in the request headers
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Search successful:', response.data );
            set({ searchResults: response.data.data });
        } catch (error) {
            console.error('Search failed:', error);
            alert('Search failed');
        }
    },

    setModalContent(content) {
        set({ modalContent: content });
        //console.log('Modal content:', content); // debugging
    },
}));
import { useState } from 'react';

export default function useUser() {
    const getUser = () => {
        return localStorage.getItem('user');
    };

    const [user, setUser] = useState(getUser());

    const saveUser = user => {
        localStorage.setItem('user', user);
        setUser(user.user);
    };

    return {
        setUser: saveUser,
        user
    }
}
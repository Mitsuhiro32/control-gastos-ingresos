// client/src/views/pages/Profile.js
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/authService';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    return (
        <div>
        <h1>Profile</h1>
        {user && (
            <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            </div>
        )}
        </div>
    );
};

export default Profile;

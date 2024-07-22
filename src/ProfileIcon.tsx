import React from 'react';
import './css/ProfileIcon.css';

interface ProfileIconProps {
    name: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ name }) => {
    const initial = name.charAt(0).toUpperCase();
    return (
        <div className="profile-image">
            {initial}
        </div>
    );
};

export default ProfileIcon;

import React, {useEffect, useState} from 'react';
import './css/Profile.css';
import ProfileIcon from './ProfileIcon';
import apiCall from "./api";

interface ProfileData {
    name: Name;
    emails: string[];
    userName: string;
}

interface Name {
    familyName: string;
    givenName: string;
}

const Profile: React.FC = () => {

    const [profileData, setProfileData] = useState<ProfileData>();
    const [loading,setLoading] = useState(false);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await apiCall('https://idp.eu.my-shopping.com:9444/scim2/Me', true);
                const data = await response.json();
                console.info(data);
                setProfileData(data);
                setLoading(true);
            } catch (error) {
                console.error('API call failed:', error);
            }
        };

        fetchProducts();
    }, []);

    const userName = "Kenneth Valdez"; // Replace with dynamic user name

    return (
        <>
            {loading && (
                <div className="profile-container">
                    <div className="profile-card">
                        <div className="profile-image">
                            <ProfileIcon name={profileData!.userName}/>
                        </div>
                        <div className="profile-details">
                            <div className="detail">
                                <span className="label">Full Name</span>
                                <span className="value">{profileData!.name.givenName + " " + profileData!.name.familyName}</span>
                            </div>
                            <div className="detail">
                                <span className="label">Email</span>
                                <span className="value">{profileData!.emails[0]}</span>
                            </div>
                            <div className="detail">
                                <span className="label">Phone</span>
                                <span className="value">(239) 816-9029</span>
                            </div>
                            <div className="detail">
                                <span className="label">Mobile</span>
                                <span className="value">(320) 380-4539</span>
                            </div>
                            <div className="detail">
                                <span className="label">Address</span>
                                <span className="value">Bay Area, San Francisco, CA</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;

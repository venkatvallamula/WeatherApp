import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';


const Profile = ({getUserData}) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lName, setLName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://dummyjson.com/users`
                );
                console.log("--------------------", response.data)
                setUserData(response?.data?.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="autocomplete">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <Autocomplete
                    items={userData}
                    shouldItemRender={(user, lName
                    ) => 1}
                    getItemValue={user => user.lastName}
                    renderItem={(user, isHighlighted) =>
                        <div style={{
                            background: isHighlighted ?
                                '#bcf5bc' : 'white'
                        }}
                            key={user.id}>
                            {user.lastName}
                        </div>
                    }
                    value={lName}
                    onChange={
                        e => {
                            setLName(e.target.value)
                           
                        }

                    }
                    onSelect={(val) => {setLName(val)
                        getUserData(val)
                        console.log(val)}
                    }
                    inputProps={{
                        style: {
                            width: '300px', height: '20px',
                            background: '#e4f3f7',
                            border: '2px outset lightgray'
                        },
                        placeholder: 'Search LastName'
                    }}
                />
            )}
        </div>
    );
};

export default Profile;

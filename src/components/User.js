import React, { useState } from 'react';
import Profile from './Profile';

const User = () => {
    const [userLname, setUserLanme] = useState('')
    const getUserData= (name)=>{
       setUserLanme(name) 
    }

  return (
    <div className="autocomplete">
        <p>user lastName: {userLname}</p>
        <Profile getUserData={getUserData}/>
    </div>
  );
};

export default User;

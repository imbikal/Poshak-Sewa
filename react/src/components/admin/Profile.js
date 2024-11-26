import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Profile() {
    const [user,setUser] = useState();
    const [loading, setLoading] = useState();
   useEffect(() => {

        axios.get("/api/profile").then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
            setLoading(false);
          }
        });
      }, []);
      if (loading) {
        return <h4 className="text-center">View Orders loading.</h4>;}
    return  (
        <div className="flex items-center justify-center rounded bg-gray-50 h-28">
              <h1>User Profile</h1>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
    )
}

export default Profile;

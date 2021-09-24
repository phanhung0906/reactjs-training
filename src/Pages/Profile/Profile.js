import {useEffect, useState, useContext} from 'react';
import LoginContext from "../../Components/LoginContext";
import LoginForm from "../../Components/Loginform";
import axios from "axios";

function Profile({setUser}) {
    const user = useContext(LoginContext);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (user) {
            getUser(user['userId'], user)
        }
    }, []);

    const getUser = async (id, user) => {
        try {
            let response = await axios.get('https://60dff0ba6b689e001788c858.mockapi.io/users/' + id,{
                headers: {
                    Authorization: user ? user.token : ''
                }
            })
            setUserInfo(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    const onFinish = async (values) => {
        try {
            let response = await axios.get('https://60dff0ba6b689e001788c858.mockapi.io/tokens')
            setUser(response.data);
            getUser(response.data.userId, response.data)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="wrap-body">
            {user ?
                <>
                    <p>UserID: {userInfo.id}</p>
                    <p>Name: {userInfo.name}</p>
                </>
                :
                <>
                    <b>You need to login to continue</b><br/>
                    <LoginForm onFinish={onFinish}/>
                </>
            }
        </div>
    );
}

export default Profile;

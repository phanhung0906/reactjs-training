import {useState, useContext } from 'react';
import axios from "axios";
import LoginForm from "../../Components/Loginform"
import {Typography, Space} from 'antd';
import LoginContext from './../../Components/LoginContext';

const {Text} = Typography;

function Login({setUser}) {
    const user = useContext(LoginContext);

    const onFinish = async (values) => {
        try {
            let response = await axios.get('https://60dff0ba6b689e001788c858.mockapi.io/tokens')
            setUser(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="wrap-body">
            {user ?
                <Text type="success">Login success</Text>
                :
                <LoginForm onFinish={onFinish}/>

            }
        </div>
    );
}

export default Login;

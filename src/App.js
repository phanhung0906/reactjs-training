import {useState} from 'react';
import {Button, Space, Typography} from 'antd';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import List from "./Pages/Posts/List"
import Detail from "./Pages/Posts/Detail"
import Profile from "./Pages/Profile/Profile"
import {LoginProvider} from './Components/LoginContext'
const {Text} = Typography;

function App() {
    const [user, setUser] = useState('');

    const handleLogout = (e) => {
        e.preventDefault()
        setUser('')
    }

    console.log(user);

    return (
        <LoginProvider value={user}>
            <div className="App">
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/posts">Posts</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                {user?
                                    <li>
                                        <a onClick={handleLogout}><Text type="danger">Logout</Text></a>
                                    </li>
                                    :
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                }

                            </ul>
                        </nav>

                        <Switch>
                            <Route path="/" exact>
                                <Home/>
                            </Route>
                            <Route path="/posts" exact>
                                <List/>
                            </Route>
                            <Route path="/posts/:id">
                                <Detail/>
                            </Route>
                            <Route path="/profile">
                                <Profile setUser={setUser}/>
                            </Route>
                            <Route path="/login">
                                <Login setUser={setUser} />
                            </Route>

                        </Switch>
                    </div>
                </Router>
            </div>
        </LoginProvider>
    );
}

export default App;

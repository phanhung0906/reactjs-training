import {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {
    useParams
} from "react-router-dom";
import LoginContext from "../../Components/LoginContext";

function Detail() {
    const user = useContext(LoginContext);
    let {id} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDetail()
    }, []);

    const getDetail = async () => {
        setLoading(true)
        try {
            let response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id, {
                headers: {
                    Authorization: user ? user.token : ''
                }
            })
            setData(response.data);
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <div className="wrap-body">
            {loading ?
                <b>Loading</b>
                :
                <>
                    <p>ID: {data.id}</p>
                    <p>Title: {data.title}</p>
                    <p>Body: {data.body}</p>
                </>
            }
        </div>
    );
}

export default Detail;

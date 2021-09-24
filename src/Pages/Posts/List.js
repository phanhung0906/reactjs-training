import {useState, useEffect, useContext} from 'react';
import {Input} from 'antd';
import {Table, Space, Row, Col, Button} from 'antd';
import axios from "axios";
import {
    Link
} from "react-router-dom";
import LoginContext from "../../Components/LoginContext";

function List() {
    const user = useContext(LoginContext);
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllPost()
    }, []);

    const getAllPost = async () => {
        setLoading(true)
        try {
            let response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                headers: {
                    Authorization: user ? user.token : ''
                }
            })
            setPosts(response.data)
            setData(response.data)

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title)
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={"/posts/" + record.id}>View detail</Link>
                    <Button danger onClick={() => handleRemove(record.id)}>Remove</Button>
                </Space>
            ),
        },
    ];

    const handleSeach = (e) => {
        let searchTitle = e.target.value;
        let data = posts.filter(each => {
            return each['title'].includes(searchTitle)
        })
        setData(data)
    }

    const handleRemove = (id) => {
        let post = posts.filter(each => {
            return each['id'] !== id
        })
        setPosts(post)

        let result = data.filter(each => {
            return each['id'] !== id
        })
        setData(result)
    }

    return (
        <div className="wrap-body">
            {loading ?
                <b>Loading</b>
                :
                <>
                    <Row>
                        <Col span={6}><Input placeholder="Search by title" onChange={handleSeach}/></Col>
                    </Row>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                </>
            }
        </div>
    );
}

export default List;

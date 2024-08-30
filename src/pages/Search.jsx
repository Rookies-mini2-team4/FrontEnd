import { useState, useEffect } from 'react';
import { searchUser } from '@/services/UserService'
import { Link } from "react-router-dom";
import '@/styles/Search.css'

const Search= () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        searchUser(search).then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}, [search]);

    return (
        <div className="user-search">
        <h2>Search Users</h2>
        <input
            type="text"
            placeholder="Search by username or name..."
            value={search}
            onChange={handleInputChange}
        />
        
        <div className="user-list">
            {users.length > 0 ? (
                users.map((user) => (
                    <Link to={`/profile/${user.id}`} key={user.id} className="user-item-link">
                            <div className="user-item">
                                <p><strong>{user.userId}</strong> {user.userName}</p>
                            </div>
                    </Link>
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    </div>
    );
};

export default Search;
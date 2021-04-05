import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function CreateUser() {

    const [username, setUsername] = useState('');

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onsubmit(e) {
        e.preventDefault();

        const user = {
            username
        }

        console.log(user);
        axios.post('/api/users/add', user)
            .then(res => console.log(res.data))

        setUsername('');
    }

    return (
        <div className="container">
            <h3>Créer un nouvel utilisateur</h3>
            <form onSubmit={onsubmit}>
                <div className="form-group">
                    <label className="label">Nom d'utilisateur: </label>
                    <input type="text" className="from-control" value={username} onChange={onChangeUsername} />
                </div>
                <div className="form-group">
                    <input type="submit" className="from-control" value="Créer un utilisateur" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import '../style/components.css'

function CreateExercises() {

    const [username, setUsername] = useState('test user');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState(['test user']);

    useEffect(() => {
        axios.get('/api/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username))
                    setUsername(response.data[0].username)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onChangeDuration(e) {
        setDuration(e.target.value);
    }

    function onChangeDate(date) {
        setDate(date);
    }

    function onsubmit(e) {
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date
        }

        axios.post('/api/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log(err);
            })

        window.location = '/'
    }


    return (
        <div className="container">
            <h3>Créer un nouvel éxercice</h3>
            <form onSubmit={onsubmit}>
                <div className="form-group">
                    <label className="label">Nom d'utilisateur: </label>
                    <select required className="form-control" value={username} onChange={onChangeUsername}>
                        {users.map((user) => {
                            return <option key={user} value={user}> {user}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label className="label">Description: </label>
                    <input type="text" className="form-control" value={description} onChange={onChangeDescription} />
                </div>
                <div className="form-group">
                    <label className="label">Durée (en minutes): </label>
                    <input type="text" className="form-control" value={duration} onChange={onChangeDuration} />
                </div>
                <div className="form-group">
                    <label className="label">Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" className="from-control" value="Créer un éxercice" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercises;

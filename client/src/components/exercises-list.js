import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link className="linkChange" to={'/edit/' + props.exercise._id}>Modifier</Link> | <a href="#" className="linkChange" onClick={() => { props.deleteExercise(props.exercise._id) }}>Supprimer</a>
        </td>
    </tr>
)

function ExercisesList() {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                setExercises(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    function deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log(err)
            })
        setExercises(exercises.filter(el => el._id !== id))
    }

    function exerciseList() {
        return exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />
        })
    }
    return (
        <div className="container">
            <h3>Tous les éxercices</h3>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Durée</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}


export default ExercisesList;
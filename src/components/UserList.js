import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersById();
    }, []);

    const getUsersById = async () => {
        const response = await axios.get(`http://localhost:5000/users`);
        setUsers(response.data);
    }

    const deleteUser = async (id, name) => {
        confirmAlert({
            title: 'Konfirmasi Penghapusan',
            message: `Apakah Anda yakin akan menghapus data ${name}?`,
            buttons : [
                {
                    label: 'Ya',
                    onClick: async () => {
                        try {
                            await axios.delete(`http://localhost:5000/users/${id}`);
                            toast.success(`Berhasil Menghapus Data ${name}`);
                            getUsersById();
                        } catch (error) {
                            console.log(error);
                            toast.error(`Gagal Menghapus Data ${name}`);
                        }
                    }
                },
                {
                    label: 'Tidak',
                    onClick: () => toast.info(`Penghapusan Data ${name} Dibatalkan`)
                }
            ]
        });
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to='/add' className="button is-success">
                    Add New
                </Link>
                <table className="table is-striped is-fullwidth mt-2 is-centered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <Link to={`edit/${user.id}`} 
                                        className="button is-small is-info">
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteUser(user.id, user.name)}
                                        className="button is-small is-danger ml-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;

import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from 'react-toastify';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const getUserById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
            setPassword(response.data.password);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // toast.error('Error fetching user data');
        }
    }, [id]);

    useEffect(() => {
        getUserById();
    }, [getUserById]);

    // const checkDuplicate = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/users');
    //         const users = response.data.filter(user => user.id !== id);
    //         const nameExists = users.some(user => user.name === name);
    //         const emailExists = users.some(user => user.email === email);
    //         return { nameExists, emailExists };
    //     } catch (error) {
    //         console.error('Error checking duplicates:', error);
    //         toast.error('Error checking duplicates');
    //         return { nameExists: false, emailExists: false };
    //     }
    // };

    const updateUser = async (e) => {
        e.preventDefault();

        // const { nameExists, emailExists } = await checkDuplicate();
        // if (nameExists) {
        //     toast.error("Nama sudah ada, gunakan nama yang lain.");
        //     return;
        // }
        // if (emailExists) {
        //     toast.error("Email sudah ada, gunakan email yang lain.");
        //     return;
        // }

        try {
            const response = await axios.patch(`http://localhost:5000/users/${id}`, {
                name,
                email,
                password
            });

            console.log('Update response:', response);

            if (response.status === 200) {
                // toast.success(`Berhasil Mengupdate Data ${name}`);
                navigate('/');
              }  // } else {
            //     toast.error(`Gagal Mengupdate Data ${name}`);
            // }
        } catch (error) {
            console.error('Error updating user:', error);
            // toast.error(`Gagal Mengupdate Data ${name}: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-success">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;

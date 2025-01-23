import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const checkDuplicate = async () => {
    //     const response = await axios.get('http://localhost:5000/users');
    //     const users = response.data;
    //     const nameExists = users.some(user => user.name === name);
    //     const emailExists = users.some(user => user.email === email);
    //     return { nameExists, emailExists };
    // };

    const saveUser = async (e) => {
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
            await axios.post('http://localhost:5000/users', {
                name,
                email,
                password
            });
            // toast.success(`Berhasil Menambah Data ${name}`);
            navigate('/');
        } catch (error) {
            console.log(error);
            // toast.error("Gagal Menambahkan Data");
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveUser}>
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

export default AddUser;

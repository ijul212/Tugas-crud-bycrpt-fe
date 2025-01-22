import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/add" element={<AddUser />} />
                    <Route path="/edit/:id" element={<EditUser />} />
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;

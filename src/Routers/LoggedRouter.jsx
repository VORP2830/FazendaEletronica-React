import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const isAuthenticated = () => {
    const token = cookies.get('Token')
    if(token) return true;
    else return false;
};

export default function PrivateRouter () {
    if(!isAuthenticated()) return <Outlet/>
    else return <Navigate to="/home"/>
}
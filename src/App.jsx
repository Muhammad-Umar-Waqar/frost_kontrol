import React from 'react';
import { Outlet } from 'react-router';
import './styles/global/fonts.css';



const App = () => {
    console.log("env in component", import.meta.env);
    
    return(
    <div className='mainContainer w-full h-screen bg-[#0A57FF]'>
        <Outlet/>
    </div>
)
};

export default App;

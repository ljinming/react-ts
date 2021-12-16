import  { BrowserRouter,Routes,Route } from "react-router-dom";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import Login from '@src/login';
import Login from '../login'




const RouterIndex = ()=>{
    return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
    </Routes>
    </BrowserRouter>

}

ReactDOM.render(<RouterIndex />, document.getElementById('root'));

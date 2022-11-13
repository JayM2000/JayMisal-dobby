
import "bootstrap/dist/css/bootstrap.min.css"
import './App.scss';

import React,{useEffect} from 'react';
import { Route, Routes,BrowserRouter as Bt } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux--appli/store';
import setauth from './redux--appli/utils/setauthtoken';
import  {loads} from './redux--appli/action/auth';
import Login from './component/login';
import Mnfl from './component/mainfile';
import Reg from './component/register';
import Pr from './component/privater';

function App() {

  useEffect(() => {
    console.log(localStorage.token);
    if(localStorage.token){
      setauth(localStorage.token);
    }
    
    store.dispatch(loads());
  },[]);

  return (
    <Provider store={store}>
    <Bt>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Pr component={Mnfl} />} />
          <Route path='/reg' element={<Reg />} />
        </Routes>
    </Bt>
  </Provider>
  );
}

export default App;

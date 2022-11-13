import axios from 'axios';

export const loads = () => async dispatch => {

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const val = await axios.get('https://imagegallery001.herokuapp.com/autho',config);

        if(val.data.st === 'not'){
            throw 'not authorized plz login again';
        }
        
        dispatch({
            type:'logins',
            payload:val.data
        });

    }
    catch(err){
        console.log('false token expired');
        dispatch({
            type:'loginf'
        })
    }
};

// registration form
export  const authh = ({email,password,navi}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({em:email,pass:password});

    try{
        const val = await axios.post('https://imagegallery001.herokuapp.com/signup',body,config);
        alert(val.data.mess);
        navi('/');
    }
    catch(err){
        alert(err.response.data.err);

        dispatch({
            type:'regf'
        });
    }
};


// login form
export  const logins = ({email,password}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({em:email,pass:password});

    try{
        const val = await axios.post('https://imagegallery001.herokuapp.com/login',body,config);
        
        if(val.data.st === 404){
            throw `${val.data.mess}`;
        }

         dispatch({
            type:'sign',
            payload:{token:val.data.tk}
         });

         dispatch(loads());

    }
    catch(err){
        alert(err);

        dispatch({
            type:'signf'
        });
    }
};

// logout user from every where
export const logout = () =>dispatch => {
    dispatch({
        type:'logout'
    });
};
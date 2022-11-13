import ax from 'axios';

const authtokenss = (token) => {

    if(token){
        ax.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('token', token);
    }
    else{
        ax.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('token');
    }
};

export default authtokenss;
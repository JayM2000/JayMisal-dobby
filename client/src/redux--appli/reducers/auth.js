
const authdata = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    load: true,
    user: null
};

export default function funcc(state = authdata, action) {
    const { type, payload } = action;

    switch (type) {

        case 'logins':
            return {
                ...state,
                isAuthenticated:true,
                load:false,
                user:payload
            }
        
        case 'loginf':
            if(localStorage.getItem('token')){
                localStorage.removeItem('token');
            }
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                load: false
            }

        case 'sign':
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                load: false
        }

        case 'signf':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                load: false
            }

        case 'regs':
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                load: false
            }

        case 'regf':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                load: false
            }

        case 'logout':
        case 'deleteprofile':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                load: false
            }

        default:
            return state;
    }
};
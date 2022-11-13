
const inits = {
    profile:null,
    imgss:[],
    imgnm:[],
    load:true,
    error:{}
};
const profileall = (st = inits,action) => {
    const {type,payload} = action;

    switch(type){
        case 'getimgall':
            return {
                ...st,
                profile: payload,
                imgss:payload.img,
                imgnm:payload.imgname,
                load: false
            }
        
        case 'uploaded':
            return {
                ...st,
                profile: payload,
                imgss:payload.img,
                imgnm:payload.imgname,
                load: false
            }

        case 'logout':
            return {
                ...st,
                profile: null,
                imgss:[],
                imgnm:[],
                load: false
            }

        default:
            return st
    }
};

export default profileall;
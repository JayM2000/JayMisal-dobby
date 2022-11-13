const jwt = require('jsonwebtoken');

const verifytk = (req, res, next) => {
    const heads = req.headers['authorization'];

    jwt.verify(String(heads), 'shubh', (err, data) => {
        if (err) {
           return res.json({mess:err,st:'not'});
        }
        else {
            req.id = data.id;
            req.tk = heads;
            next();
        }
    });
};

module.exports = verifytk;
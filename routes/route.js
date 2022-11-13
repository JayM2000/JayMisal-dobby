const exp = require('express');
const userdbs = require('../models/users');
const imgdbs = require('../models/imge');

const rout = exp.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const verifytk = require('../verify/auth.js');

// start heres

rout.post('/login', async (req, res) => {
    const { em, pass } = req.body;

    try {
        // checking if email exist in database , if exist compare password if same
        const infos = await userdbs.logindet(em, pass);

        const id = infos._doc._id;
        const token = jwt.sign({ id: id.toString() }, 'shubh', {
            expiresIn: "20000s"
        });

        res.json({ st: 200, tk: token });

    }
    catch (err) {
        res.json({ st: 404, mess: err });
    }
});

rout.post('/signup', check(
    'pass',
    'Please enter a password with 7 or more characters'
).isLength({ min: 7 }), async (req, res) => {

    const errors = validationResult(req);
    if (errors.array().length) {
        return res.status(400).json({ err: errors.array()[0].msg });
    }

    try {
        let user = await userdbs.findOne({ em: req.body.em });

        if (user) {
            return res
                .status(400)
                .json({ err: 'email already exists !!!' });
        }
        const usersinfo = new userdbs(req.body);
        await usersinfo.save();

        const vl = new imgdbs({owner:String(usersinfo._id)});
        await vl.save();

        res.json({ mess: 'Account created Successfully? Login Again with your credentials ' });
    }
    catch (err) {
        res.json({ err: err });
    }
});

const authoo = async (req, res) => {
    const userid = req.id;
    try {
        const user = await userdbs.findById({ _id: userid }).select('-pass');

        if (!user) {
            return res.json({ err: 'user not found', st: 'not' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

rout.get('/autho', verifytk, authoo);

rout.post('/upld',verifytk, async (req, res) => {
    const { img,imgnm } = req.body;
    const userid = req.id;

    try {

        let prof = await imgdbs.findOne({ owner: userid });

        // only if user exists
        if (prof) {
            prof.img.unshift(img);
            prof.imgname.unshift(imgnm);
            await prof.save();
        }

        const getval = await imgdbs.findOne({owner:userid});
        
        res.json({ st: 200, mess: getval});
    }
    catch (err) {
        res.json({ st: 404, mess: err });
    }
});

rout.get('/getimgall',verifytk,async (req,res) => {
    const userid = req.id;

    try{
        const getval = await imgdbs.findOne({owner:userid});
        res.json({ st: 200, mess: getval});
    }
    catch(err) {
        console.log(err);
    }
});

rout.post('/ser',verifytk,async (req,res) => {
    const userid = req.id;
    const text = req.body.ser;

    try {
        const getval = await imgdbs.findOne({owner:userid});
        const imag = getval.img.indexOf(200);
    } catch (err) {
        
    }
});

rout.post('/delsz',verifytk ,async (req,res) => {
    const userid = req.id;
    try {
        const vals = req.body.key;

        const getimg = await imgdbs.findOne({owner:userid});
        getimg.img.splice(vals,1);
        getimg.imgname.splice(vals,1);
        getimg.save();

        res.json({mess:getimg});
    } catch (err) {
        res.json(err);
    }
});

module.exports = rout;
const Account = require('../models/Account');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register =  async (req, res, next) => {
    try {
        const {firstName, lastName,email, password, passwordConfirmed, role} = req.body;
        if(!firstName || !lastName || !email || !password || !passwordConfirmed) {
            return res.status(500).send({msg: 'empty fields'});
        }
        if(password !== passwordConfirmed) {
            return res.status(500).send({msg: 'passwords are not matched'});
        }
        let account = await Account.findOne({email});
        if(account) {
            return res.status(401).send({msg:'the account is already existing!'});
        }
        account = new Account({
            email,
            password,
            passwordConfirmed,
            role
        });
        const saltRound = 10;
        const passwordHashed = await bcrypt.hash(password, saltRound);
        account.password = passwordHashed;
        const accountSaved = await account.save();
        const user = new User({
            firstName,
            lastName,
            account: accountSaved
        });

        const payload = {
            _id: user.id
        };
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
            expiresIn: "30d"
        });
        res.status(200).send({user, token, msg:'registred successefully'});

        await user.save();

    } catch (error) {
        res.status(500).send({ error });   
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(500).send({msg:"empty fields"});
        }
        let account = await Account.findOne({email});
        if(!account){
            return res.status(500).send({msg:'invalid credentials!'});
        }
        const match = await bcrypt.compare(password, account.password);
        if(!match){
            return res.status(500).send({msg:"wrong password"});
        }
        let user = await User.findOne({account: account._id.toString()});

        const payload = {
            _id: user.id
        };
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
            expiresIn: "30d"
        });
        res.status(200).send({user, token, msg:'login success'});
    } catch (error) {
        res.status(500).send({error});
    }
}

exports.authMe = async (req, res, next) => {
    try {
        let user = await User.findById(req.user);
        let account =null;
        if(user) {
            account = await Account.findById(user.account.toString()).select('-password').select('-passwordConfirmed');
        }
        user.account = account;
        res.status(200).send({user});
    } catch (error) {
        
    }
}
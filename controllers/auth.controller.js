require('dotenv').config();
const CreateError = require('http-errors');
const axios = require('axios');
const INTEGRATION_KEY = process.env.INTEGRATION_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;



const getdocusigncode = async (req, res) => {
    try {
            const url = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=${INTEGRATION_KEY}&redirect_uri=https://cobaltrename.onrender.com/api/redirect`
            res.redirect(url)
    } catch (error) {
        reject(error);
     }
};
const getdocusignaccesstoken = async (req, res, next) => {
    try {
        const code = req.query.code;
        const response = await axios({
            method: 'post',
            url: 'https://account-d.docusign.com/oauth/token',
            data: {
                grant_type: 'authorization_code',
                code: code,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: INTEGRATION_KEY,
                password: SECRET_KEY,
            },
        });
        res.status(200).json({
            message: 'Access Token Generated',
            data: response.data,
        });
    } catch (error) {
        next(error)
    }
};

const getuserinfo = async (req, res, next) => {
    try {
        const accesstoken = req.query.accesstoken;
        const response = await axios({
            method: 'get',
            url: 'https://account-d.docusign.com/oauth/userinfo',
            headers: {
                Authorization: `Bearer ${accesstoken}`,
            },
        });
        res.status(200).json({
            message: 'User Info',
            data: response.data,
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getdocusignaccesstoken,
    getdocusigncode,
    getuserinfo
};
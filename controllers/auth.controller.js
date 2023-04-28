require('dotenv').config();
const CreateError = require('http-errors');
const axios = require('axios');
const INTEGRATION_KEY = process.env.INTEGRATION_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;



const getdocusigncode = async () => {
    try {
        return new Promise(async (resolve, reject) => {
            const response = await axios({
                method: 'post',
                url: 'https://account-d.docusign.com/oauth/auth',
                params: {
                    response_type: 'code',
                    scope: 'signature',
                    client_id: INTEGRATION_KEY,
                    redirect_uri: REDIRECT_URI,
                }
            });
            resolve(response.data);
        });
    } catch (error) {
        reject(error);
     }
};
const getdocusignaccesstoken = async (req, res, next) => {
    try {
        const code = await getdocusigncode();
        console.log(code);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getdocusignaccesstoken,
};
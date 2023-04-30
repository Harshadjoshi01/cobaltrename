require('dotenv').config();
const CreateError = require('http-errors');
const axios = require('axios');
const INTEGRATION_KEY = process.env.INTEGRATION_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;



const createtemplate = async (req, res, next) => {
    try {
        const accesstoken = req.query.accesstoken;
        const accountId = req.query.accountId;
        const file = req.file;
        const fileExtension = file.originalname.split('.').pop();
        const randomdocId = Math.floor(Math.random() * 1000000);
        const base64 = file.buffer.toString('base64');
        const response = await axios({
            method: 'post',
            url: `https://demo.docusign.net/restapi/v2.1/accounts/${accountId}/templates`,
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                'Content-Type': 'application/json',
            },
            data: {
                "documents": [
                    {
                        "name": "Sample Document",
                        "documentBase64": `${base64}`,
                        "documentId": `${randomdocId}`,
                        "fileExtension": `${fileExtension}`,
                    }
                ]
            },
        });
        res.status(200).json({
            message: 'Template Created',
            data: response.data,
        });
    } catch (error) {
        next(error);
     }
};

const getalltemplate = async (req, res, next) => {
    try {
        const accesstoken = req.query.accesstoken;
        const accountId = req.query.accountId;
        const response = await axios({
            method: 'get',
            url: `https://demo.docusign.net/restapi/v2.1/accounts/${accountId}/templates`,
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(200).json({
            message: 'All Templates',
            data: response.data,
        });
    } catch (error) {
        next(error);
     }
};

const gettemplateinfo = async (req, res, next) => {
    try {
        const accesstoken = req.query.accesstoken;
        const accountId = req.query.accountId;
        const templateId = req.query.templateId;
        const response = await axios({
            method: 'get',
            url: `https://demo.docusign.net/restapi/v2.1/accounts/${accountId}/templates/${templateId}`,
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(200).json({
            message: 'Template Info',
            data: response.data,
        });
    } catch (error) {
        next(error);
     }
};

const createenvelope = async (req, res, next) => {
    try {
        const accesstoken = req.query.accesstoken;
        const accountId = req.query.accountId;
        const templateId = req.query.templateId;
        const {recipientname, recipientemail, emailbody, emailsubject, recipientrole} = req.body;
        const response = await axios({
            method: 'post',
            url: `https://demo.docusign.net/restapi/v2.1/accounts/${accountId}/envelopes`,
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                'Content-Type': 'application/json',
            },
            data: {
                "emailSubject": `${emailsubject}`,
                "emailBlurb": `${emailbody}`,
                "templateId": `${templateId}`,
                "templateRoles": [
                    {
                        "email": `${recipientemail}`,
                        "name": `${recipientname}`,
                        "roleName": `${recipientrole}`,
                        "clientUserId": "1"
                    }
                ],
                "status": "sent"
            },
        });
        res.status(200).json({
            message: 'Envelope Created',
            data: response.data,
        });
    } catch (error) {
        console.log(error);
     }
};

// const createenvelopwithtemplate = async (req, res, next) => {
// };


module.exports = {
    createtemplate,
    getalltemplate,
    gettemplateinfo,
    createenvelope,
    // createenvelopwithtemplate,
};
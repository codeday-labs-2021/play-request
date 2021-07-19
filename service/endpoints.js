var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Request Received - Time: ', new Date(new Date().toUTCString()));
    next();
});

// PROJECTS ----------------------------------------------

router.post('/project/new/', (req, res) => {
    return res.send(`POST New Project`);
});

router.get('/project/:projectId', (req, res) => {
    return res.send(`GET Project ID: ${req.params.projectId}`);
});

router.delete('/project/:projectId', (req, res) => {
    return res.send(`DEL Project ID: ${req.params.projectId}`);
});

router.get('/project/:projectId/contributors/', (req, res) => {
    return res.send(`GET Project Contributors: ${req.params.projectId}`);
});

router.post('/project/:projectId/track/', (req, res) => {
    return res.send(`POST Project Track: ${req.params.projectId}`);
});

router.patch('/project/:projectId/', (req, res) => {
    return res.send(`PATCH Project ID: ${req.params.projectId}`);
});

// PLAY REQUESTS ------------------------------------------

router.post('/project/:projectId/request/', (req, res) => {
    return res.send(`POST Play Request: ${req.params.projectId}`);
});

router.get('/project/:projectId/request/', (req, res) => {
    return res.send(`GET Project Request: ${req.params.projectId}`);
});

router.delete('/project/:projectId/request/:requestId/', (req, res) => {
    return res.send(`DEL Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

router.post('/project/:projectId/request/:requestId/routerrove/', (req, res) => {
    return res.send(`POST routerrove Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

router.post('/project/:projectId/request/:requestId/deny/', (req, res) => {
    return res.send(`POST Deny Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

router.post('/project/:projectId/request/:requestId/change/', (req, res) => {
    return res.send(`POST Change Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

// SAMPLES -------------------------------------------------

router.get('/samples/', (req, res) => {
    return res.send(`GET Universally Available Samples`);
});

router.get('/project/:projectId/samples/', (req, res) => {
    return res.send(`GET Project Samples: ${req.params.projectId}`);
});

router.post('/project/:projectId/samples/', (req, res) => {
    return res.send(`POST Create Project Sample: ${req.params.projectId}`);
});

router.get('/project/:projectId/samples/:sampleId/', (req, res) => {
    return res.send(`GET Project Sample - Project ID: ${req.params.projectId}, Sample ID: ${req.params.sampleId}`);
});

router.patch('/project/:projectId/samples/:sampleId/', (req, res) => {
    return res.send(`PATCH Project Sample - Project ID: ${req.params.projectId}, Sample ID: ${req.params.sampleId}`);
});

router.delete('/project/:projectId/samples/:sampleId/', (req, res) => {
    return res.send(`DEL Project Sample - Project ID: ${req.params.projectId}, Sample ID: ${req.params.sampleId}`);
});

// SOUND EFFECTS --------------------------------------------

router.get('/effects/', (req, res) => {
    return res.send(`GET Universally Available Effects`);
});

router.get('/project/:projectId/effects/', (req, res) => {
    return res.send(`GET Project Effects: ${req.params.projectId}`);
});

router.post('/project/:projectId/effects/', (req, res) => {
    return res.send(`POST Create Project Effects: ${req.params.projectId}`);
});

router.get('/project/:projectId/effects/:effectId/', (req, res) => {
    return res.send(`GET Project Effect - Project ID: ${req.params.projectId}, Effect ID: ${req.params.effectId}`);
});

router.patch('/project/:projectId/effects/:effectId/', (req, res) => {
    return res.send(`PATCH Project Effect - Project ID: ${req.params.projectId}, Effect ID: ${req.params.effectId}`);
});

router.delete('/project/:projectId/effects/:effectId/', (req, res) => {
    return res.send(`DEL Project Effect - Project ID: ${req.params.projectId}, Effect ID: ${req.params.effectId}`);
});

// MESSAGING ---------------------------------------------------

router.get('/project/:projectId/messages/', (req, res) => {
    return res.send(`GET All Project Messages - Project ID: ${req.params.projectId}`);
});

router.get('/project/:projectId/messages/:messageId/', (req, res) => {
    return res.send(`GET Project Message - Project ID: ${req.params.projectId}, Message ID: ${req.params.messageId}`);
});

router.post('/project/:projectId/messages/', (req, res) => {
    return res.send(`POST Create Project Message - Project ID: ${req.params.projectId}`);
});

router.delete('/project/:projectId/messages/:messageId/', (req, res) => {
    return res.send(`DEL Project Message - Project ID: ${req.params.projectId}, Message ID: ${req.params.messageId}`);
});

router.patch('/project/:projectId/messages/:messageId/', (req, res) => {
    return res.send(`PATCH Project Message - Project ID: ${req.params.projectId}, Message ID: ${req.params.messageId}`);
});

module.exports = router;
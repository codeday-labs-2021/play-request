import express from "express";

const PORT = 4000;

const app = express();

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

// PROJECTS ----------------------------------------------

app.post('/project/new/', (req, res) => {
  return res.send(`POST New Project`);
});

app.get('/project/:projectId', (req, res) => {
  return res.send(`GET Project ID: ${req.params.projectId}`);
});

app.delete('/project/:projectId', (req, res) => {
  return res.send(`DEL Project ID: ${req.params.projectId}`);
});

app.get('/project/:projectId/contributors/', (req, res) => {
  return res.send(`GET Project Contributors: ${req.params.projectId}`);
});

app.post('/project/:projectId/track/', (req, res) => {
  return res.send(`POST Project Track: ${req.params.projectId}`);
});

app.patch('/project/:projectId/', (req, res) => {
  return res.send(`PATCH Project ID: ${req.params.projectId}`);
});

// PLAY REQUESTS ------------------------------------------

app.post('/project/:projectId/request/', (req, res) => {
  return res.send(`POST Play Request: ${req.params.projectId}`);
});

app.get('/project/:projectId/request/', (req, res) => {
  return res.send(`GET Project Request: ${req.params.projectId}`);
});

app.delete('/project/:projectId/request/:requestId/', (req, res) => {
  return res.send(`DEL Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

app.post('/project/:projectId/request/:requestId/approve/', (req, res) => {
  return res.send(`POST Approve Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

app.post('/project/:projectId/request/:requestId/deny/', (req, res) => {
  return res.send(`POST Deny Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

app.post('/project/:projectId/request/:requestId/change/', (req, res) => {
  return res.send(`POST Change Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

// SAMPLES -------------------------------------------------

app.get('/samples/', (req, res) => {
  return res.send(`GET Universally Available Samples`);
});

app.get('/project/:projectId/samples/', (req, res) => {
  return res.send(`GET Project Samples: ${req.params.projectId}`);
});

app.post('/project/:projectId/samples/', (req, res) => {
  return res.send(`POST Create Project Sample: ${req.params.projectId}`);
});

app.get('/project/:projectId/samples/:sampleId/', (req, res) => {
  return res.send(`GET Project Sample - Project ID: ${req.params.projectId}, Sample ID: ${req.params.sampleId}`);
});

app.patch('/project/:projectId/samples/:sampleId/', (req, res) => {
  return res.send(`PATCH Project Sample - Project ID: ${req.params.projectId}, Sample ID: ${req.params.sampleId}`);
});

app.delete('/project/:projectId/samples/:sampleId/', (req, res) => {
  return res.send(`DEL Project Sample - Project ID: ${req.params.projectId}, Sample ID: ${req.params.sampleId}`);
});

// SOUND EFFECTS --------------------------------------------

app.get('/effects/', (req, res) => {
  return res.send(`GET Universally Available Effects`);
});

app.get('/project/:projectId/effects/', (req, res) => {
  return res.send(`GET Project Effects: ${req.params.projectId}`);
});

app.post('/project/:projectId/effects/', (req, res) => {
  return res.send(`POST Create Project Effects: ${req.params.projectId}`);
});

app.get('/project/:projectId/effects/:effectId/', (req, res) => {
  return res.send(`GET Project Effect - Project ID: ${req.params.projectId}, Effect ID: ${req.params.effectId}`);
});

app.patch('/project/:projectId/effects/:effectId/', (req, res) => {
  return res.send(`PATCH Project Effect - Project ID: ${req.params.projectId}, Effect ID: ${req.params.effectId}`);
});

app.delete('/project/:projectId/effects/:effectId/', (req, res) => {
  return res.send(`DEL Project Effect - Project ID: ${req.params.projectId}, Effect ID: ${req.params.effectId}`);
});

// MESSAGING ---------------------------------------------------

app.get('/project/:projectId/messages/', (req, res) => {
  return res.send(`GET All Project Messages - Project ID: ${req.params.projectId}`);
});

app.get('/project/:projectId/messages/:messageId/', (req, res) => {
  return res.send(`GET Project Message - Project ID: ${req.params.projectId}, Message ID: ${req.params.messageId}`);
});

app.post('/project/:projectId/messages/', (req, res) => {
  return res.send(`POST Create Project Message - Project ID: ${req.params.projectId}`);
});

app.delete('/project/:projectId/messages/:messageId/', (req, res) => {
  return res.send(`DEL Project Message - Project ID: ${req.params.projectId}, Message ID: ${req.params.messageId}`);
});

app.patch('/project/:projectId/messages/:messageId/', (req, res) => {
  return res.send(`PATCH Project Message - Project ID: ${req.params.projectId}, Message ID: ${req.params.messageId}`);
});





app.listen(PORT, handleListening);

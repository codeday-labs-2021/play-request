import { v4 as uuidv4 } from 'uuid';

var express = require('express');
var data = require('./database');
const schema = require("./schema");
global.XMLHttpRequest = require("xhr2");


var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Request Received - Time: ', new Date(new Date().toUTCString()));
    next();
});

function verifyNull(snapshot, resHandler) {    
    if(snapshot.val() === null) {
        return resHandler.send(schema.RequestError(404, "no data available"));
    } else {
        var response = snapshot.val();
        return resHandler.send(response);
    }
}

// PROJECTS ----------------------------------------------

router.post('/projects/', (req, res) => {
    const id = uuidv4();
    var project = new schema.Project(req.body);
    data.database.ref('projects/' + id).set(JSON.parse(JSON.stringify(project)));
    var response = {
        "projectId": id,
    };
    return res.send(schema.RequestSuccess(201, "project created successfully", response));
});

router.get('/projects/', (req, res) => {
    var projectsRef = data.database.ref('projects');
    projectsRef.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

router.get('/project/:projectId', (req, res) => {
    var projectsRef = data.database.ref(`projects/${req.params.projectId}`);
    projectsRef.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

router.delete('/project/:projectId', (req, res) => {
    var projectsRef = data.database.ref(`projects/${req.params.projectId}`);
    projectsRef.once('value', (snapshot) => {
        if(snapshot.val() === null) {
            res.send(schema.RequestError(404, "delete failed: project with provided id does not exist"));
        } else {
            projectsRef.remove().then(function() {
                res.send(schema.RequestSuccess(200, "deleted successfully"));
            })
        }
    });        
});

router.get('/project/:projectId/contributors/', (req, res) => {
    var ref = data.database.ref(`projects/${req.params.projectId}/contributors/`);
    ref.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

router.post('/project/:projectId/track/', (req, res) => {
    var track = new schema.TrackData(req.body);
    data.database.ref(`projects/${req.params.projectId}/trackdata`).set(JSON.parse(JSON.stringify(track)));
    var response = {
        "projectId": req.params.projectId,
    };
    return res.send(schema.RequestSuccess(200, "track updated successfully", response));
});

router.patch('/project/:projectId/', (req, res) => {
    var project = new schema.Project(req.body);
    data.database.ref(`projects/${req.params.projectId}`).set(JSON.parse(JSON.stringify(project)));
    var response = {
        "projectId": req.params.projectId,
    };
    return res.send(schema.RequestSuccess(200, "project patched successfully", response));
});

// SAMPLES -------------------------------------------------

router.get('/samples/', async (req, res) => {
    var sampleRef = data.storage.ref().child('samples').child('universal');
    var samples = [];
    await sampleRef.listAll().then((resp) => {
        resp.items.forEach(async function(ref) {
            await ref.getDownloadURL().then((url) => {
                var sp = {
                    fullpath: ref.fullPath,
                    downloadurl: url
                }
                samples.push(sp);
            }).then(() => {
                return res.send(samples);
            });
        });

    });
    
    
    
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

// PLAY REQUESTS ------------------------------------------

router.post('/project/:projectId/request/', (req, res) => {
    return res.send(`POST Play Request: ${req.params.projectId}`);
});

router.get('/project/:projectId/request/', (req, res) => {
    return res.send(`GET All Play Requests: ${req.params.projectId}`);
});

router.delete('/project/:projectId/request/:requestId/', (req, res) => {
    return res.send(`DEL Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

router.post('/project/:projectId/request/:requestId/approve/', (req, res) => {
    return res.send(`POST Approve Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

router.post('/project/:projectId/request/:requestId/deny/', (req, res) => {
    return res.send(`POST Deny Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
});

router.post('/project/:projectId/request/:requestId/change/', (req, res) => {
    return res.send(`POST Change Request - Project ID: ${req.params.projectId}, Request ID: ${req.params.requestId}`);
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

// WILDCARD ---------------------------------------------------

router.get('*', function(req, res) {
    res.send("Malformed Endpoint");
});

// ------------------------------------------------------------

console.log("REST API Initialized");
module.exports = router;
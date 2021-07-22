// UUID generator library that generates random ids
import { v4 as uuidv4 } from 'uuid';

// express
const express = require('express');
// firebase
const data = require('./database');
// schema objects
const schema = require("./schema");
// firebase web patch library
global.XMLHttpRequest = require("xhr2");
// library to handle file streaming in express
const multer  = require('multer')
const upload = multer();

// create express router to handle endpoints
const router = express.Router();

// create middleware that logs the timestamp when request is received
router.use(function timeLog(req, res, next) {
    console.log('Request Received - Time: ', new Date(new Date().toUTCString()));
    next();
});

// function that checks if a realtime database reference has no contents, and if so, returns an error. if it doesn't, it returns the value
function verifyNull(snapshot, resHandler) {
    let snapshotVal = snapshot.val();    
    if(snapshotVal === null) {
        return resHandler.send(schema.RequestError(404, "no data available"));
    } else {
        const response = snapshotVal;
        return resHandler.send(response);
    }
}

// PROJECTS ----------------------------------------------

// create a project. the request body mirrors the Project object
router.post('/projects/', (req, res) => {
    const id = uuidv4();
    let project = new schema.Project(req.body);
    data.database.ref('projects/' + id).set(JSON.parse(JSON.stringify(project)));
    const response = {
        "projectId": id,
    };
    return res.send(schema.RequestSuccess(201, "project created successfully", response));
});

// get a list of all projects
router.get('/projects/', (req, res) => {
    const projectsRef = data.database.ref('projects');
    projectsRef.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// get a specific project by its UUID
router.get('/project/:projectId', (req, res) => {
    const projectsRef = data.database.ref(`projects/${req.params.projectId}`);
    projectsRef.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// delete a specific project by its UUID
router.delete('/project/:projectId', (req, res) => {
    const projectsRef = data.database.ref(`projects/${req.params.projectId}`);
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

// get a list of contributors by the project's UUID
router.get('/project/:projectId/contributors/', (req, res) => {
    const ref = data.database.ref(`projects/${req.params.projectId}/contributors/`);
    ref.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// update the music track in the project with a patch request. the request body mirrors the TrackData object
router.patch('/project/:projectId/track/', (req, res) => {
    let track = new schema.TrackData(req.body);
    data.database.ref(`projects/${req.params.projectId}/trackdata`).set(JSON.parse(JSON.stringify(track)));
    const response = {
        "projectId": req.params.projectId,
    };
    return res.send(schema.RequestSuccess(200, "track updated successfully", response));
});

// update the project as a whole with a patch request. the request body mirrors the Project object
router.patch('/project/:projectId/', (req, res) => {
    let project = new schema.Project(req.body);
    data.database.ref(`projects/${req.params.projectId}`).set(JSON.parse(JSON.stringify(project)));
    const response = {
        "projectId": req.params.projectId,
    };
    return res.send(schema.RequestSuccess(200, "project patched successfully", response));
});

// SAMPLES -------------------------------------------------

/*

TODO:

when sending an mp3 file of a sample to the backend, remember to set the header 'enctype' to 'multipart/form-data'

to test the upload of a file, use the below curl command:
curl -X POST -F 'sample=@<absolute file location>' http://localhost:4000/project/<project id>/samples/

*/

// helper function for creating a sample. the function adds the mp3 file to firebase storage, and creates a realtime database entry on the sample details
function createMP3(storageRef, databaseRef, id, responseHandler, requestFile) {
    storageRef.put(new Uint8Array(requestFile.buffer)).then((snapshot) => {
        const metadata = {
            contentType: "audio/mpeg"
        }
        storageRef.updateMetadata(metadata).then((metadata) => {
            storageRef.getDownloadURL().then((url) => {
                const sampleMeta = {
                    "filename": requestFile.originalname,
                    "id": id,
                    "type": "audio/mpeg",
                    "path": storageRef.fullPath,
                    "downloadURL": url,
                }
                databaseRef.set(sampleMeta);
                return responseHandler.send(schema.RequestSuccess(200, "saved successfully", {
                    'id': id
                }));
            });
        });
    });
}

// create a new universal sample. this endpoint accepts an mp3 file as input in the request, and passes it off to the helper function above
router.post('/samples/', upload.single("sample"), (req, res) => {
    const id = uuidv4();
    const ref = data.storage.ref().child("samples").child("universal").child(id);
    const dataref = data.database.ref(`samples/universal/${id}`);
    return createMP3(ref, dataref, id, res, req.file);
});

// gets a list of universal samples by querying the realtime database entries
router.get('/samples/', (req, res) => {
    const ref = data.database.ref(`samples/universal/`)
    ref.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// create a new project-specific sample. this endpoint accepts an mp3 file as input in the request, and passes it off to the helper function above
router.post('/project/:projectId/samples/', upload.single("sample"), (req, res) => {
    const id = uuidv4();
    const ref = data.storage.ref().child("samples").child(req.params.projectId).child(id);
    const dataref = data.database.ref(`samples/${req.params.projectId}/${id}`);
    return createMP3(ref, dataref, id, res, req.file);
});

// gets a list of project-specific samples by querying the realtime database entries
router.get('/project/:projectId/samples/', (req, res) => {
    const ref = data.database.ref(`samples/${req.params.projectId}`)
    ref.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// get a specific project sample entry by providing the project id and the sample id
router.get('/project/:projectId/sample/:sampleId/', (req, res) => {
    const ref = data.database.ref(`samples/${req.params.projectId}/${req.params.sampleId}`)
    ref.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// update a specific project sample by project id and sample id. since firebase storage files cannot be "updated", this endpoint deletes it and recreates it with the same id
router.patch('/project/:projectId/sample/:sampleId/', upload.single("sample"), (req, res) => {
    const storageRef = data.storage.ref().child("samples").child(req.params.projectId).child(req.params.sampleId);
    const databaseRef = data.database.ref(`samples/${req.params.projectId}/${req.params.sampleId}`);
    storageRef.delete().then(() => {
        databaseRef.remove().then(() => {
            res.send(schema.RequestSuccess(200, "deleted successfully"));
        });
    });
    createMP3(storageRef, databaseRef, req.params.sampleId, res, req.file);
});

// delete a specific project sample by project id and sample id
router.delete('/project/:projectId/sample/:sampleId/', (req, res) => {
    const storageRef = data.storage.ref().child("samples").child(req.params.projectId).child(req.params.sampleId);
    const databaseRef = data.database.ref(`samples/${req.params.projectId}/${req.params.sampleId}`);

    storageRef.delete().then(() => {
        databaseRef.remove().then(() => {
            res.send(schema.RequestSuccess(200, "deleted successfully"));
        });
    });
});

// SOUND EFFECTS -------------------------------------------- 

// create a new universal effect. this endpoint accepts an mp3 file as input in the request, and passes it off to the helper function above
router.post('/effects/', upload.single("effect"), (req, res) => {
    const id = uuidv4();
    const ref = data.storage.ref().child("effects").child("universal").child(id);
    const dataref = data.database.ref(`effects/universal/${id}`);
    return createMP3(ref, dataref, id, res, req.file);
});

// gets a list of universal effects by querying the realtime database entries
router.get('/effects/', (req, res) => {
    const ref = data.database.ref(`effects/universal/`)
    ref.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// TODO here downward (though the effects endpoints are an exact duplicate of the samples endpoints)

router.get('/project/:projectId/effects/', (req, res) => {
    return res.send(`POST List Project Effects: ${req.params.projectId}`);
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

// get all project-specific messages sent by users
router.get('/project/:projectId/messages/', (req, res) => {
    const ref = data.database.ref(`messages/${req.params.projectId}/messages`)
    ref.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// create a new message with properties mirroring Message object: text, senders, timestamp, id
router.post('/project/:projectId/messages/', (req, res) => {
    const msg = new schema.Message(req.body);
    const counterRef = data.database.ref(`messages/${req.params.projectId}/currentMessageId`)
    counterRef.once('value', (snapshot) => {
        let msgId = 1;
        if(snapshot.val() === null) {
            counterRef.set(msgId);
        } else {
            msgId = parseInt(snapshot.val());
            msgId += 1;
            counterRef.set(msgId);
        }
        const messagesRef = data.database.ref(`messages/${req.params.projectId}/messages/${msgId}`)
        msg.setId(msgId);
        msg.setTimestamp(new Date(new Date().toUTCString()));
        messagesRef.set(JSON.parse(JSON.stringify(msg))).then(() => {
            res.send(schema.RequestSuccess(200, "created successfully", {
                "id": msgId,
            }));
        });
    });
});

// get a specific message by its id
router.get('/project/:projectId/messages/:messageId/', (req, res) => {
    const ref = data.database.ref(`messages/${req.params.projectId}/messages/${req.params.messageId}`);
    ref.once('value', (snapshot) => {
        return verifyNull(snapshot, res);
    });
});

// delete a specific message by its id
router.delete('/project/:projectId/messages/:messageId/', (req, res) => {
    const ref = data.database.ref(`messages/${req.params.projectId}/messages/${req.params.messageId}`);
    ref.once('value', (snapshot) => {
        if(snapshot.val() === null) {
            res.send(schema.RequestError(404, "delete failed: message with provided id does not exist"));
        } else {
            ref.remove().then(function() {
                res.send(schema.RequestSuccess(200, "deleted successfully"));
            });
        }
    });    
});

// update a specific message's text by its id
router.post('/project/:projectId/messages/:messageId/text/', (req, res) => {
    const msg = new schema.Message(req.body);
    const ref = data.database.ref(`messages/${req.params.projectId}/messages/${req.params.messageId}/text/`);
    ref.set(msg.text).then(function() {
        res.send(schema.RequestSuccess(200, "updated successfully"));
    });
});

// WILDCARD ---------------------------------------------------

router.get('*', function(req, res) {
    res.send(schema.RequestError(404, "Malformed Endpoint"));
});

// ------------------------------------------------------------

console.log("REST API Initialized");
module.exports = router;
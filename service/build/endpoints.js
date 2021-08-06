"use strict";

var _uuid = require("uuid");

// UUID generator library that generates random ids
// express
var express = require("express"); // firebase


var data = require("./database"); // schema objects


var schema = require("./schema"); // firebase web patch library


global.XMLHttpRequest = require("xhr2"); // library to handle file streaming in express

var multer = require("multer");

var upload = multer(); // create express router to handle endpoints

var router = express.Router(); // create middleware that logs the timestamp when request is received

router.use(function timeLog(req, res, next) {
  console.log("Request Received - Time: ", new Date(new Date().toUTCString()));
  next();
}); // function that checks if a realtime database reference has no contents, and if so, returns an error. if it doesn't, it returns the value

function verifyNull(snapshot, resHandler) {
  var snapshotVal = snapshot.val();

  if (snapshotVal === null) {
    return resHandler.send(schema.RequestError(404, "no data available"));
  } else {
    var response = snapshotVal;
    return resHandler.send(response);
  }
} // PROJECTS ----------------------------------------------
// create a project. the request body mirrors the Project object


router.post("/projects/", function (req, res) {
  var id = (0, _uuid.v4)();
  var project = new schema.Project(req.body);
  data.database.ref("projects/" + id).set(JSON.parse(JSON.stringify(project)));
  var response = {
    projectId: id
  };
  return res.send(schema.RequestSuccess(201, "project created successfully", response));
}); // get a list of all projects

router.get("/projects/", function (req, res) {
  var projectsRef = data.database.ref("projects");
  projectsRef.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // get a specific project by its UUID

router.get("/project/:projectId", function (req, res) {
  var projectsRef = data.database.ref("projects/".concat(req.params.projectId));
  projectsRef.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // delete a specific project by its UUID

router["delete"]("/project/:projectId", function (req, res) {
  var projectsRef = data.database.ref("projects/".concat(req.params.projectId));
  projectsRef.once("value", function (snapshot) {
    if (snapshot.val() === null) {
      res.send(schema.RequestError(404, "delete failed: project with provided id does not exist"));
    } else {
      projectsRef.remove().then(function () {
        res.send(schema.RequestSuccess(200, "deleted successfully"));
      });
    }
  });
}); // get a list of contributors by the project's UUID

router.get("/project/:projectId/contributors/", function (req, res) {
  var ref = data.database.ref("projects/".concat(req.params.projectId, "/contributors/"));
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // update the music track in the project with a patch request. the request body mirrors the TrackData object

router.patch("/project/:projectId/track/", function (req, res) {
  var track = new schema.TrackData(req.body);
  data.database.ref("projects/".concat(req.params.projectId, "/trackdata")).set(JSON.parse(JSON.stringify(track)));
  var response = {
    projectId: req.params.projectId
  };
  return res.send(schema.RequestSuccess(200, "track updated successfully", response));
}); // update the project as a whole with a patch request. the request body mirrors the Project object

router.patch("/project/:projectId/", function (req, res) {
  var project = new schema.Project(req.body);
  data.database.ref("projects/".concat(req.params.projectId)).set(JSON.parse(JSON.stringify(project)));
  var response = {
    projectId: req.params.projectId
  };
  return res.send(schema.RequestSuccess(200, "project patched successfully", response));
}); // SAMPLES -------------------------------------------------

/*

TODO:

when sending an mp3 file of a sample to the backend, remember to set the header 'enctype' to 'multipart/form-data'

to test the upload of a file, use the below curl command:
curl -X POST -F 'sample=@<absolute file location>' http://localhost:4000/project/<project id>/samples/

*/
// helper function for creating a sample. the function adds the mp3 file to firebase storage, and creates a realtime database entry on the sample details

function createMP3(storageRef, databaseRef, id, responseHandler, requestFile) {
  storageRef.put(new Uint8Array(requestFile.buffer)).then(function (snapshot) {
    var metadata = {
      contentType: "audio/mpeg"
    };
    storageRef.updateMetadata(metadata).then(function (metadata) {
      storageRef.getDownloadURL().then(function (url) {
        var sampleMeta = {
          filename: requestFile.originalname,
          id: id,
          type: "audio/mpeg",
          path: storageRef.fullPath,
          downloadURL: url
        };
        databaseRef.set(sampleMeta);
        return responseHandler.send(schema.RequestSuccess(200, "saved successfully", {
          id: id
        }));
      });
    });
  });
} // create a new universal sample. this endpoint accepts an mp3 file as input in the request, and passes it off to the helper function above


router.post("/samples/", upload.single("sample"), function (req, res) {
  var id = (0, _uuid.v4)();
  var ref = data.storage.ref().child("samples").child("universal").child(id);
  var dataref = data.database.ref("samples/universal/".concat(id));
  return createMP3(ref, dataref, id, res, req.file);
}); // gets a list of universal samples by querying the realtime database entries

router.get("/samples/", function (req, res) {
  var ref = data.database.ref("samples/universal/");
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // create a new project-specific sample. this endpoint accepts an mp3 file as input in the request, and passes it off to the helper function above

router.post("/project/:projectId/samples/", upload.single("sample"), function (req, res) {
  var id = (0, _uuid.v4)();
  var ref = data.storage.ref().child("samples").child(req.params.projectId).child(id);
  var dataref = data.database.ref("samples/".concat(req.params.projectId, "/").concat(id));
  return createMP3(ref, dataref, id, res, req.file);
}); // gets a list of project-specific samples by querying the realtime database entries

router.get("/project/:projectId/samples/", function (req, res) {
  var ref = data.database.ref("samples/".concat(req.params.projectId));
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // get a specific project sample entry by providing the project id and the sample id

router.get("/project/:projectId/sample/:sampleId/", function (req, res) {
  var ref = data.database.ref("samples/".concat(req.params.projectId, "/").concat(req.params.sampleId));
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // update a specific project sample by project id and sample id. since firebase storage files cannot be "updated", this endpoint deletes it and recreates it with the same id

router.patch("/project/:projectId/sample/:sampleId/", upload.single("sample"), function (req, res) {
  var storageRef = data.storage.ref().child("samples").child(req.params.projectId).child(req.params.sampleId);
  var databaseRef = data.database.ref("samples/".concat(req.params.projectId, "/").concat(req.params.sampleId));
  storageRef["delete"]().then(function () {
    databaseRef.remove().then(function () {
      res.send(schema.RequestSuccess(200, "deleted successfully"));
    });
  });
  createMP3(storageRef, databaseRef, req.params.sampleId, res, req.file);
}); // delete a specific project sample by project id and sample id

router["delete"]("/project/:projectId/sample/:sampleId/", function (req, res) {
  var storageRef = data.storage.ref().child("samples").child(req.params.projectId).child(req.params.sampleId);
  var databaseRef = data.database.ref("samples/".concat(req.params.projectId, "/").concat(req.params.sampleId));
  storageRef["delete"]().then(function () {
    databaseRef.remove().then(function () {
      res.send(schema.RequestSuccess(200, "deleted successfully"));
    });
  });
}); // SOUND EFFECTS --------------------------------------------
// create a new universal effect. this endpoint accepts an mp3 file as input in the request, and passes it off to the helper function above

router.post("/effects/", upload.single("effect"), function (req, res) {
  var id = (0, _uuid.v4)();
  var ref = data.storage.ref().child("effects").child("universal").child(id);
  var dataref = data.database.ref("effects/universal/".concat(id));
  return createMP3(ref, dataref, id, res, req.file);
}); // gets a list of universal effects by querying the realtime database entries

router.get("/effects/", function (req, res) {
  var ref = data.database.ref("effects/universal/");
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // gets a list of project-specific effects by querying the realtime database entries

router.get("/project/:projectId/effects/", function (req, res) {
  var ref = data.database.ref("effects/".concat(req.params.projectId));
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // create a new project-specific effect. this endpoint accepts an mp3 file as input in the request, and passes it off to the helper function above

router.post("/project/:projectId/effects/", upload.single("effect"), function (req, res) {
  var id = (0, _uuid.v4)();
  var ref = data.storage.ref().child("effects").child(req.params.projectId).child(id);
  var dataref = data.database.ref("effects/".concat(req.params.projectId, "/").concat(id));
  return createMP3(ref, dataref, id, res, req.file);
}); // get a specific project effect entry by providing the project id and the effect id

router.get("/project/:projectId/effects/:effectId/", function (req, res) {
  var ref = data.database.ref("effects/".concat(req.params.projectId, "/").concat(req.params.sampleId));
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // update a specific project effect by project id and effect id. since firebase storage files cannot be "updated", this endpoint deletes it and recreates it with the same id

router.patch("/project/:projectId/effects/:effectId/", upload.single("effect"), function (req, res) {
  var storageRef = data.storage.ref().child("effects").child(req.params.projectId).child(req.params.sampleId);
  var databaseRef = data.database.ref("effects/".concat(req.params.projectId, "/").concat(req.params.sampleId));
  storageRef["delete"]().then(function () {
    databaseRef.remove().then(function () {
      res.send(schema.RequestSuccess(200, "deleted successfully"));
    });
  });
  createMP3(storageRef, databaseRef, req.params.sampleId, res, req.file);
}); // delete a specific project effect by project id and effect id

router["delete"]("/project/:projectId/effects/:effectId/", function (req, res) {
  var storageRef = data.storage.ref().child("effects").child(req.params.projectId).child(req.params.sampleId);
  var databaseRef = data.database.ref("effects/".concat(req.params.projectId, "/").concat(req.params.sampleId));
  storageRef["delete"]().then(function () {
    databaseRef.remove().then(function () {
      res.send(schema.RequestSuccess(200, "deleted successfully"));
    });
  });
}); // PLAY REQUESTS ------------------------------------------

router.post("/project/:projectId/request/", function (req, res) {
  return res.send("POST Play Request: ".concat(req.params.projectId));
});
router.get("/project/:projectId/request/", function (req, res) {
  return res.send("GET All Play Requests: ".concat(req.params.projectId));
});
router["delete"]("/project/:projectId/request/:requestId/", function (req, res) {
  return res.send("DEL Project ID: ".concat(req.params.projectId, ", Request ID: ").concat(req.params.requestId));
});
router.post("/project/:projectId/request/:requestId/approve/", function (req, res) {
  return res.send("POST Approve Request - Project ID: ".concat(req.params.projectId, ", Request ID: ").concat(req.params.requestId));
});
router.post("/project/:projectId/request/:requestId/deny/", function (req, res) {
  return res.send("POST Deny Request - Project ID: ".concat(req.params.projectId, ", Request ID: ").concat(req.params.requestId));
});
router.post("/project/:projectId/request/:requestId/change/", function (req, res) {
  return res.send("POST Change Request - Project ID: ".concat(req.params.projectId, ", Request ID: ").concat(req.params.requestId));
}); // MESSAGING ---------------------------------------------------
// get all project-specific messages sent by users

router.get("/project/:projectId/messages/", function (req, res) {
  var ref = data.database.ref("messages/".concat(req.params.projectId, "/messages"));
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // create a new message with properties mirroring Message object: text, senders, timestamp, id

router.post("/project/:projectId/messages/", function (req, res) {
  var msg = new schema.Message(req.body);
  var counterRef = data.database.ref("messages/".concat(req.params.projectId, "/currentMessageId"));
  counterRef.once("value", function (snapshot) {
    var msgId = 1;

    if (snapshot.val() === null) {
      counterRef.set(msgId);
    } else {
      msgId = parseInt(snapshot.val());
      msgId += 1;
      counterRef.set(msgId);
    }

    var messagesRef = data.database.ref("messages/".concat(req.params.projectId, "/messages/").concat(msgId));
    msg.setId(msgId);
    msg.setTimestamp(new Date(new Date().toUTCString()));
    messagesRef.set(JSON.parse(JSON.stringify(msg))).then(function () {
      res.send(schema.RequestSuccess(200, "created successfully", {
        id: msgId
      }));
    });
  });
}); // get a specific message by its id

router.get("/project/:projectId/messages/:messageId/", function (req, res) {
  var ref = data.database.ref("messages/".concat(req.params.projectId, "/messages/").concat(req.params.messageId));
  ref.once("value", function (snapshot) {
    return verifyNull(snapshot, res);
  });
}); // delete a specific message by its id

router["delete"]("/project/:projectId/messages/:messageId/", function (req, res) {
  var ref = data.database.ref("messages/".concat(req.params.projectId, "/messages/").concat(req.params.messageId));
  ref.once("value", function (snapshot) {
    if (snapshot.val() === null) {
      res.send(schema.RequestError(404, "delete failed: message with provided id does not exist"));
    } else {
      ref.remove().then(function () {
        res.send(schema.RequestSuccess(200, "deleted successfully"));
      });
    }
  });
}); // update a specific message's text by its id

router.post("/project/:projectId/messages/:messageId/text/", function (req, res) {
  var msg = new schema.Message(req.body);
  var ref = data.database.ref("messages/".concat(req.params.projectId, "/messages/").concat(req.params.messageId, "/text/"));
  ref.set(msg.text).then(function () {
    res.send(schema.RequestSuccess(200, "updated successfully"));
  });
}); // WILDCARD ---------------------------------------------------

router.get("*", function (req, res) {
  res.send(schema.RequestError(404, "Malformed Endpoint"));
}); // ------------------------------------------------------------

console.log("REST API Initialized");
module.exports = router;
//# sourceMappingURL=endpoints.js.map
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* TEST JSON FOR PROJECT
{
	"name": "Awesome Beat",
	"description": "a super cool song!",
	"contributors": [
		"name",
		"name2",
		"name3"
	],
	"trackdata": {
		"songref": "original_song_files/beat1.mp3",
		"sampledata": [
			{
				"timestamp": "0:50",
				"length": "0:20",
				"name": "test",
				"ref": "samples/sample1.mp3"
			},
			{
				"timestamp": "0:20",
				"length": "0:30",
				"name": "test 2",
				"ref": "samples/sample2.mp3"
			}
		]
	}
}
*/
var Sample = function Sample(data) {
  _classCallCheck(this, Sample);

  _defineProperty(this, "timestamp", void 0);

  _defineProperty(this, "length", void 0);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "ref", void 0);

  this.timestamp = data.timestamp;
  this.length = data.length;
  this.name = data.name;
  this.ref = data.ref;
};

var TrackData = function TrackData(data) {
  _classCallCheck(this, TrackData);

  _defineProperty(this, "songref", void 0);

  _defineProperty(this, "sampledata", void 0);

  _defineProperty(this, "effectdata", void 0);

  this.songref = data.songref;
  this.sampledata = [];
  this.effectdata = [];

  for (var i = 0; i < data.sampledata.length; i++) {
    this.sampledata.push(new Sample(data.sampledata[i]));
  }

  for (var _i = 0; _i < data.effectdata.length; _i++) {
    this.effectdata.push(new Sample(data.effectdata[_i]));
  }
};

var Project = function Project(data) {
  _classCallCheck(this, Project);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "description", void 0);

  _defineProperty(this, "contributors", void 0);

  _defineProperty(this, "trackdata", void 0);

  this.name = data.name;
  this.description = data.description;
  this.contributors = data.contributors;
  this.trackdata = new TrackData(data.trackdata);
};

var PlayRequest = function PlayRequest(data) {
  _classCallCheck(this, PlayRequest);

  _defineProperty(this, "id", void 0);

  _defineProperty(this, "state", void 0);

  _defineProperty(this, "locked", void 0);

  _defineProperty(this, "cancelled", void 0);

  _defineProperty(this, "changed", void 0);

  _defineProperty(this, "prevWork", void 0);

  _defineProperty(this, "newWork", void 0);

  this.id = id;
  this.state = state;
  this.locked = locked;
  this.cancelled = cancelled;
  this.changed = prevWork !== newWork ? true : false;
};

var Message = /*#__PURE__*/function () {
  function Message(data) {
    _classCallCheck(this, Message);

    _defineProperty(this, "timestamp", void 0);

    _defineProperty(this, "text", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "sender", void 0);

    this.text = data.text;
    this.sender = data.sender;
  }

  _createClass(Message, [{
    key: "setId",
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: "setTimestamp",
    value: function setTimestamp(timestamp) {
      this.timestamp = timestamp;
    }
  }]);

  return Message;
}();

function RequestError(statusCode, description) {
  return {
    text: "error",
    statusCode: statusCode,
    description: description
  };
}

function RequestSuccess(statusCode, description) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var msg = {
    text: "success",
    statusCode: statusCode,
    description: description
  };

  if (args !== null) {
    msg["details"] = args;
  }

  return msg;
}

module.exports = {
  Project: Project,
  TrackData: TrackData,
  Sample: Sample,
  RequestError: RequestError,
  RequestSuccess: RequestSuccess,
  PlayRequest: PlayRequest,
  Message: Message
};
//# sourceMappingURL=schema.js.map
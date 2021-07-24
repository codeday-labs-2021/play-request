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

class Sample {
  timestamp;
  length;
  name;
  ref;

  constructor(data) {
    this.timestamp = data.timestamp;
    this.length = data.length;
    this.name = data.name;
    this.ref = data.ref;
  }
}

class TrackData {
  songref;
  sampledata;
  effectdata;

  constructor(data) {
    this.songref = data.songref;
    this.sampledata = [];
    this.effectdata = [];

    for (var i = 0; i < data.sampledata.length; i++) {
      this.sampledata.push(new Sample(data.sampledata[i]));
    }
    for (var i = 0; i < data.effectdata.length; i++) {
      this.effectdata.push(new Sample(data.effectdata[i]));
    }
  }
}

class Project {
  name;
  description;
  contributors;
  trackdata;

  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.contributors = data.contributors;
    this.trackdata = new TrackData(data.trackdata);
  }
}

class PlayRequest {
  id;
  state;
  locked;
  cancelled;
  changed;
  prevWork;
  newWork;
  constructor(data) {
    this.id = id;
    this.state = state;
    this.locked = locked;
    this.cancelled = cancelled;
    this.changed = prevWork !== newWork ? true : false;
  }
}

class Message {
  timestamp;
  text;
  id;
  sender;

  constructor(data) {
    this.text = data.text;
    this.sender = data.sender;
  }

  setId(id) {
    this.id = id;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }
}

function RequestError(statusCode, description) {
  return {
    text: "error",
    statusCode: statusCode,
    description: description,
  };
}

function RequestSuccess(statusCode, description, args = null) {
  var msg = {
    text: "success",
    statusCode: statusCode,
    description: description,
  };
  if (args !== null) {
    msg["details"] = args;
  }

  return msg;
}

module.exports = {
  Project,
  TrackData,
  Sample,
  RequestError,
  RequestSuccess,
  PlayRequest,
  Message,
};

/* TEST JSON FOR PROJECT
{
	"name" : "Awesome Beat",
	"description" : "a super cool song!",
	"contributors": ["name", "name2", "name3"],
	"trackdata" : {
		"originalSongRef": "original_song_files/beat1.mp3",
		"sampledata": [
			{
				"startTimestamp": "0:50",
				"id": "test",
				"ugen": "flock.ugen.sinOsc",
				"rate": "audio",
				"inputs": {
					"freq": 440
				},
				"options": {
					"interpolation": "linear"
				}
			},
			{
				"startTimestamp": "0:10",
				"ugen": "flock.ugen.scope",
				"source": {
					"id": "player",
					"ugen": "flock.ugen.playBuffer",
					"speed": 1.0,
					"loop": 1.0
				},
				"options": {
					"canvas": "#waveform",
					"styles": {
						"strokeColor": "#888",
						"strokeWidth": 1
					}
				}
			}
		]
	}
}
*/

class Sample {
    startTimestamp;
    id;
    ugen;
    rate;
    inputs;
    source;
    options;

    constructor(data) {
        this.startTimestamp = data.startTimestamp;
        this.id = data.id;
        this.ugen = data.ugen;
        this.rate = data.rate;
        this.inputs = data.inputs;
        this.source = data.source;
        this.options = data.options;
    }
}

class TrackData {
    originalSongRef;
    sampledata;

    constructor(data) {
        this.originalSongRef = data.originalSongRef;
        this.sampledata = [];
        for(var i = 0; i < data.sampledata.length; i++) {
            this.sampledata.push(new Sample(data.sampledata[i]));
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

module.exports = {
    Project
}




// var schema = require('js-schema');
// var flocking = require('flocking');

// var Synth = schema({
//     id: Number,
//     frequency : Number,
//     oscillator : String,
// });


// class Sample {
//     // id
//     // length in seconds
//     // volume
//     // music data (bytes)
// }

// class Track {
//     // list of Sample objects, with corresponding timestamps
// }


// // // LATER
// // class History {
// // }

// // class PlayRequest {
// // }


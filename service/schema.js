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
    timestamp;
    length;
    name;
	ref;

    constructor(data) {
		this.timestamp = data.timestamp;
		this.length = data.length;
		this.name = data.length;
		this.ref = data.ref;
    }
}

class TrackData {
    songref;
    sampledata;

    constructor(data) {
        this.songref = data.songref;
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
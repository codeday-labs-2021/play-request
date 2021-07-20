class TrackData {
    synthdata;

    constructor(data) {
        this.synthdata = data.synth;
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


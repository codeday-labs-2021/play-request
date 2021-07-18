var schema = require('js-schema');
var flocking = require('flocking');

var Synth = schema({
    id: Number,
    frequency : Number,
    oscillator : String,
});


class Sample {
    // id
    // length in seconds
    // volume
    // music data (bytes)
}

class Track {
    // list of Sample objects, with corresponding timestamps
}


// // LATER
// class History {
// }

// class PlayRequest {
// }


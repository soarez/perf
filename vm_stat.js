var spawn = require('child_process').spawn;
var LineTransform = require('./linetransform');
var SkipTransform = require('./skiptransform');
var Transform = require('stream').Transform;
var util = require('util');

module.exports = Create;
function Create() {
  var parserTransform = new Transform({
    objectMode: true
  });
  var headers = 'free,active,spec,inactive,wire,faults,copy,0fill,reactive,pageins,pageout'.split(',');
  parserTransform._transform = function(chunk, encoding, cb) {
    var line = chunk.toString();
    var values = line.split(/\s/).filter(function(w) { return w.length });
    var result = values.reduce(function(r, v, i) {
      r[headers[i]] = v;
      return r;
    }, {});
    this.push(result);
    cb();
  };

  var p = spawn('vm_stat', ['1']);
  var lineTransform = new LineTransform;
  var skipTransform = new SkipTransform({ skip: 3 });
  return p.stdout
    .pipe(lineTransform)
    .pipe(skipTransform)
    .pipe(parserTransform)
}


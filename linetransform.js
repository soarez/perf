var Transform = require('stream').Transform;
var util = require('util');

module.exports = LineTransform;

util.inherits(LineTransform, Transform);
function LineTransform() {
  Transform.apply(this, arguments);
  this.setEncoding('utf8');
}

LineTransform.prototype._transform = _transformLineTransform;
function _transformLineTransform(chunk, encoding, cb) {
  var lines = chunk.toString().split('\n');
  this.push(this.buffer || '' + lines.shift());
  this.buffer = lines.pop();
  var that = this;
  lines.forEach(this._pushOut.bind(this));
  cb();
}

LineTransform.prototype._pushOut = _pushOutLineTransform;
function _pushOutLineTransform(line) {
  this.push(line);
}

LineTransform.prototype._flush = _flushLineTransform;
function _flushLineTransform(cb) {
  if (this.buffer)
    this.push(this.buffer);
  cb();
}


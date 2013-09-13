var Transform = require('stream').Transform;
var util = require('util');

module.exports = SkipTransform;

util.inherits(SkipTransform, Transform);
function SkipTransform(options) {
  Transform.call(this, options);
  this.skip = options.skip || 0;
}

SkipTransform.prototype._transform = _transformLineTransform;
function _transformLineTransform(chunk, encoding, cb) {
  if (this.skip) {
    this.skip--
    return cb();
  }

  this.push(chunk, encoding);
  cb();
}


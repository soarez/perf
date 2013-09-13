
require('./vm_stat')()
  .on('data', function(line) {
    console.log(line);
  });

setTimeout(process.exit.bind(process), 4000);


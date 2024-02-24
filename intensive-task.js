const {parentPort} = require('node:worker_threads')


let a = 0;
for (let i = 0; i < 100_000_000_000; i++) {
    a++;
}

parentPort.postMessage(a);
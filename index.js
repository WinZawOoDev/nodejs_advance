const express = require("express");
const path = require("node:path");
const app = express();
const { Worker } = require('node:worker_threads')
const cluster = require('node:cluster')
const { availableParallelism } = require('node:os');
const process = require('node:process')

const port = process.env.port || 8000

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/normal-task', (req, res) => {
    res.send(`this is normal taks`);
})

app.get('/intensive-task', (req, res) => {
    const worker = new Worker(path.join(__dirname, './intensive-task.js'));
    worker.on('message', (value) => {
        console.log(value);
        res.send(`this is intensive taks ${value}`);
    })

    // let a = 0;
    // for (let i = 0; i < 100_000_000_00; i++) {
    //     a++;
    // }
    // res.send(`this is intensive taks ${a}`);
})


const numCpus = availableParallelism();
if (cluster.isPrimary) {
    console.log(`Primary process PID:${process.pid} is running`);

    //For Workers
    for (let w = 0; w < numCpus; w++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    app.listen(port, () => {
        console.log(`app listening on ${port}`)
    })
}



const express = require("express");
const path = require("node:path");
const app = express();
const { Worker } = require('node:worker_threads')

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
    // for (let i = 0; i < 100_000_000_000; i++) {
    //     a++;
    // }
    // res.send(`this is intensive taks ${a}`);
})


app.listen(port, () => {
    console.log(`app listening on ${port}`)
})
const { spawn } = require('node:child_process');

const sleep = spawn('sleep', ['10']);

const ls = spawn('ls', ['-lh', '/usr/src']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
})

console.log(`Current process PID: ${process.pid}`);

console.log(`Child process PID: ${sleep.pid}`);

sleep.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
})

// sleep.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// })

sleep.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
})

sleep.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
})
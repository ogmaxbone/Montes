const { ipcRenderer } = require('electron')

let logout = document.getElementById('logoutbtn');
logout.addEventListener('click', () => {
    console.log(true)
    ipcRenderer.send('doSomething');
})


let test =  document.getElementById('testhook');
test.addEventListener('click', () => {
    let webhook = document.getElementById('webhookbox').value
    ipcRenderer.send('webhook',webhook);
})
let taskPage = document.getElementById('taskPage')
taskPage.addEventListener('click', () => {
    ipcRenderer.send('taskPage');
    console.log(true)
})
let playMP3 = document.getElementById('settingsPlay')
playMP3.addEventListener('click', () => {
    ipcRenderer.send('MP3');
})

ipcRenderer.on('doSomethingReturn', () => {
    alert('Do Something Action Complete!')
    // Receive the return from doSomething in main.js and alert that the process is complete!
})

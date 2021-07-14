const { app, BrowserWindow, webFrame, ipcMain, dialog } = require("electron")
const { Webhook, MessageBuilder } = require('discord-webhook-node')
const fs = require('fs')
const notifier = require('node-notifier');
const sound = require("sound-play");
const path = require('path');
var win;
var settings = fs.readFileSync('./settings.json','utf-8')
settings = JSON.parse(settings)

function createWindow () {
    win = new BrowserWindow({
    width: 1200,
    height: 780,
    frame: false,
    icon: __dirname+'/Montes.png',
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
  })

  win.loadFile('dashboard-1.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('webhook', (event,message) => {
    var testEmbed = new MessageBuilder()
    .setTitle('**Successful Checkout**')
    .addField('Store', 'Yeezy Supply')
    .addField('Product', `Nike SB Dunk Low Ben & Jerry's Chunky Dunky`)
    .addField('Quantity', `15`)
    .addField('Profile', `||Maxbone||`)
    .addField('Proxy', `||127.0.0.0:3000||`)
    .setColor('#585858')
    .setThumbnail('https://images.stockx.com/images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-Product.jpg?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1607043246')
    .setFooter('Montes', 'https://media.discordapp.net/attachments/799753518620606554/799907252744093726/m_logo1.jpg?width=1078&height=1078')
    .setTimestamp()
    var setting = {
        "Key": settings["Key"],
        "Monitor":settings["Monitor"],
        "capMonster": settings["capMonster"],
        "login": settings["login"],
        "Retry": settings["Retry"],
        "Webhook": message,
        "Dev": settings["Dev"]
    }
    if (settings['Webhook'] === ""){
        notifier.notify({
            title: 'Montes',
            message: 'No webhook set',
            icon: path.join(__dirname, 'Montes.jpg'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
          })
    }
    else if (message.includes('discord')){
        fs.writeFileSync('./settings.json',JSON.stringify(setting))
        notifier.notify({
            title: 'Montes',
            message: 'Successfully set webhook',
            icon: path.join(__dirname, 'Montes.jpg'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
          })
          var hook = new Webhook(message);
          hook.send(testEmbed)
    }
    console.log(message)
})

 ipcMain.on('taskPage', (event,message) => {
     console.log(true)
 })
 ipcMain.on('MP3', (event,message) => {
  sound.play("drake.mp3");
})
 ipcMain.on('importTasks', (event,message) => {
  let options = {
    filters :[
     {name: 'JSON', extensions: ['json']}
    ],
    properties: ['openFile']
   }
   dialog.showOpenDialog(win,options).then(result => {
   if (result.canceled === false){
     console.log(result.filePaths)
   }
  }).catch(err => {
    //console.log(err)
  })
});
ipcMain.on('exportTasks', (event,message) => {
 
  let options = {
    title: "Export Tasks",
    buttonLabel : "Export",
    properties:['openDirectory', 'createDirectory']
   }
   
   dialog.showOpenDialog(win,options).then(result => {
   if (result.canceled === false){
     console.log(result.filePaths[0])
     var tasks = fs.readFileSync('./tasks.json','utf-8')
     tasks = JSON.parse(tasks)
     fs.writeFileSync(result.filePaths[0]+'/montes-tasks.json', JSON.stringify(tasks))
   }
  }).catch(err => {
    //console.log(err)
  })
});

ipcMain.on('accountError', (event,message) => {
  console.log(true)
  notifier.notify({
    title: 'Montes',
    message: 'One of more account fields was left empty',
    icon: path.join(__dirname, 'Montes.jpg'), // Absolute path (doesn't work on balloons)
    wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
  })
})



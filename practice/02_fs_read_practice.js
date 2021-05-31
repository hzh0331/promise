const fs = require('fs')

const p = new Promise((resolve, reject)=>{
    fs.readFile('./resource/content.txt', 'utf8', (err, data)=>{
        if(err){
            reject(err)
        }
        resolve(data)
    })
})

p.then(valve => console.log(valve), reason => console.log(reason))
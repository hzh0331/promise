const mineReadFile = (path)=>{
    return new Promise((resolve, reject)=>{
        require('fs').readFile(path, 'utf8', (err, data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

mineReadFile('./resource/content.txt').then(value => console.log(value), reason => console.log(reason))


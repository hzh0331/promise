const pending = 'pending'
const fulfilled = 'fulfilled'
const rejected = 'rejected'

function Promise(executor){
    this.promiseState = pending
    this.promiseResult = null
    this.callbacks = []

    const self = this

    function resolve(data){
        if(self.promiseState !== pending) return
        self.promiseState = fulfilled
        self.promiseResult = data
        self.callbacks.forEach(item => {
            item.onResolved(data)
        })
    }

    function reject(data){
        if(self.promiseState !== pending) return
        self.promiseState = rejected
        self.promiseResult = data
        self.callbacks.forEach(item => {
            item.onRejected(data)
        })
    }

    try{
        executor(resolve, reject)
    }catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function (onResolved, onRejected){
    const self = this
    return new Promise((resolve, reject)=>{
        if (typeof onRejected !== 'function'){
            onRejected = reject => {throw reject}
        }

        if (typeof onResolved !== 'function'){
            onResolved = value => value
        }

        function callback(func){
            try{
                let result = func(self.promiseResult)
                if(result instanceof Promise){
                    result.then(v=>{
                        resolve(v)
                    },r=>{
                        reject(r)
                    })
                }else{
                    resolve(result)
                }
            }catch (e){
                reject(e)
            }
        }
        if(this.promiseState === fulfilled){
            callback(onResolved)
        }
        if(this.promiseState === rejected)
            callback(onRejected)
        if(this.promiseState === pending){
            this.callbacks.push({
                onResolved : function (){
                    callback(onResolved)
                },
                onRejected : function (){
                    callback(onRejected)
                }
            })
        }
    })
}

Promise.prototype.catch = function (onRejected){
    return this.then(undefined, onRejected)
}

Promise.resolve = function (value){
    return new Promise((resolve, reject) =>{
        try{
            if(value instanceof Promise){
                value.then(v => resolve(v), r => reject(r))
            }else {
                resolve(value)
            }
        }catch (e){
            reject(e)
        }
    })
}

Promise.reject = function (value){
    return new Promise((resolve, reject) => {
        reject(value)
    })
}
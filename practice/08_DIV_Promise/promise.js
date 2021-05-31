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
    if(this.promiseState === fulfilled)
        onResolved(this.promiseResult)
    if(this.promiseState === rejected)
        onRejected(this.promiseResult)
    if(this.promiseState === pending){
        this.callbacks.push({
            onResolved,
            onRejected
        })
    }
}
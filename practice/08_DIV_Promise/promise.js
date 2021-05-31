const pending = 'pending'
const fulfilled = 'fulfilled'
const rejected = 'rejected'

function Promise(executor){
    this.promiseState = pending
    this.promiseResult = null
    this.callback = {}

    const self = this

    function resolve(data){
        if(self.promiseState !== pending) return
        self.promiseState = fulfilled
        self.promiseResult = data
        if (self.callback.onResolved)
            self.callback.onResolved(data)
    }

    function reject(data){
        if(self.promiseState !== pending) return
        self.promiseState = rejected
        self.promiseResult = data
        if (self.callback.onRejected)
            self.callback.onRejected(data)
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
        this.callback = {
            onResolved: onResolved,
            onRejected: onRejected
        }
    }
}
function Promise(executor){
    this.promiseState = 'pending'
    this.promiseResult = null
    self = this
    function resolve(data){
        if(self.promiseState !== 'pending') return
        self.promiseState = 'fulfilled'
        self.promiseResult = data
    }

    function reject(data){
        if(self.promiseState !== 'pending') return
        self.promiseState = 'rejected'
        self.promiseResult = data
    }

    try{
        executor(resolve, reject)
    }catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function (onResolved, onRejected){
    if(this.promiseState === 'fulfilled')
        onResolved(this.promiseResult)
    if(this.promiseState === 'rejected')
        onRejected(this.promiseResult)
}
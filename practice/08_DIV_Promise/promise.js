function Promise(executor){
    this.promiseState = 'pending'
    this.promiseResult = null
    self = this
    function resolve(data){
        self.promiseState = 'fullfilled'
        self.promiseResult = data
    }

    function reject(data){
        self.promiseState = 'rejected'
        self.promiseResult = data
    }

    executor(resolve, reject)
}

Promise.prototype.then = function (onResolved, onRejected){

}
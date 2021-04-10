const promise = Promise.resolve('success')
promise
    .then(() => {
            return new Promise(resolve => {
                resolve('inner')
            })
        }
    )
    .then(res => {
        console.log('1')
    })
    .then(res => {
        console.log('2')
    })
    .then(res => {
        console.log('3')
    })
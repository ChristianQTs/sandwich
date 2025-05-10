// JavaScript source code

const fs = require('fs')
const file = fs.createWriteStream('sandwichLog.txt')
const failsLog = { 'outOfBread': 0, 'outOfLettuce': 0, 'breadBurned': 0, 'fallenChef' : 0 }

const getBread = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const goinSouth = Math.random() > 0.6
            const outcome = goinSouth ? 'Outta Bread !!!' : 'Bread Ready'
            if (!goinSouth) console.log(outcome)
            file.write(`${outcome}\n`, () => {
                if (goinSouth) {
                    failsLog.outOfBread ++
                    reject(outcome)
                } else {
                    resolve(outcome)
                }
            })
        }, 1000)
    })
}



const addFillings = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const goinSouth = Math.random() > 0.6
            const outcome = goinSouth ? 'Outta lettuce!!!' : 'Fillings added'
            if (!goinSouth) console.log(outcome)
            file.write(`${outcome}\n`, () => {
                if (goinSouth) {
                    failsLog.outOfLettuce ++
                    reject(outcome)
                } else {
                    resolve(outcome)
                }
            })
        }, 1500)
    })
}

const toastSandwich = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const goinSouth = Math.random() > 0.6
            const outcome = goinSouth ? 'Bread Burned!!!' : 'Sandwich Toasted'
            if(!goinSouth) console.log(outcome)
            file.write(`${outcome}\n`, () => {
                if (goinSouth) {
                    failsLog.breadBurned ++
                    reject(outcome)
                } else {
                    resolve(outcome)
                }
            })
        },2000)
    })
}
const serveSandwich = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const chefFalls = Math.random() > 0.5
            const outcome = chefFalls ? 'Chef tripped and fell, sandwich got destroyed' : 'Sandwich Ready\n'
            console.log(outcome)
            file.write(`${outcome}\n`, () => {
                if (chefFalls) {
                    failsLog.fallenChef ++
                    reject(outcome)
                } else {
                    resolve(outcome)
                }
            })
        }, 3000)

    })
}
const organizeFails = () => {
    return new Promise((resolve, reject) => {
        if (failsLog.breadBurned || failsLog.outOfBread || failsLog.outOfLettuce || failsLog.fallenChef) {
            file.write(`Reason for failings: \n Out of bread: ${failsLog.outOfBread} \n Out of lettuce: ${failsLog.outOfLettuce}\n Bread burned: ${failsLog.breadBurned}\n Chef fell: ${failsLog.fallenChef}`)
            resolve()
        } else {
            const reason = 'First attempt sandwich'
            file.write(reason, () => { reject(reason) })
        }
    })
}
let failed = true

const wait = ms => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms)
    })
}
let attemptCount = 0
const makeSandwich = async () => {
    while (failed) {
        attemptCount ++
        console.log(`Trying to make a sandwich... attempt n. ${attemptCount}`)
        file.write(`\nAttempt ${attemptCount}\n\n`)
    try {
        await getBread()
        await addFillings()
        await toastSandwich()
        await serveSandwich()
        failed = false
    }
    catch (err) {
        console.log('An incident occurred:', err)
        console.log('Trying again in 1 second...')
        await wait(1000)
    }
    }
    file.write(`Total attempts: ${attemptCount}\n\n`)
    try {
        await organizeFails()
    }
    catch (err) {
        console.log(err)
    }
}
makeSandwich()



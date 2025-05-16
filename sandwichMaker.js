// JavaScript source code


const failsLog = { 'outOfBread': 0, 'outOfLettuce': 0, 'breadBurned': 0, 'fallenChef': 0 }
const displayToDom = (text, tag = 'h2') => {
    const el = document.createElement(tag)
    el.innerHTML = text
    document.body.appendChild(el)
}

const getBread = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const goinSouth = Math.random() > 0.6
            const outcome = goinSouth ? 'Outta Bread !!!' : 'Bread Ready'
            displayToDom(outcome)
            goinSouth ? (failsLog.outOfBread++ , reject(outcome)): resolve(outcome)        
        }, 1000)
    })
}



const addFillings = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const goinSouth = Math.random() > 0.6
            const outcome = goinSouth ? 'Outta lettuce!!!' : 'Fillings added'
            displayToDom(outcome)
            goinSouth ? (failsLog.outOfLettuce ++, reject(outcome)) : resolve(outcome) 
            
        }, 1500)
    })
}

const toastSandwich = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const goinSouth = Math.random() > 0.6
            const outcome = goinSouth ? 'Bread Burned!!!' : 'Sandwich Toasted'
            displayToDom(outcome)
            goinSouth ? (failsLog.breadBurned++, reject(outcome)) : resolve(outcome)
            
        },2000)
    })
}
const serveSandwich = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const chefFalls = Math.random() > 0.5
            const outcome = chefFalls ? 'Chef tripped and fell, sandwich got destroyed' : 'Sandwich Ready\n'
            displayToDom(outcome)
            chefFalls ? (failsLog.chefFalls ++, reject(outcome)) : resolve(outcome)
          
        }, 3000)

    })
}
const organizeFails = () => {
    return new Promise((resolve, reject) => {
        if (failsLog.breadBurned || failsLog.outOfBread || failsLog.outOfLettuce || failsLog.fallenChef) {
            displayToDom(`Reason for failings: \n Out of bread: ${failsLog.outOfBread} \n Out of lettuce: ${failsLog.outOfLettuce}\n Bread burned: ${failsLog.breadBurned}\n Chef fell: ${failsLog.fallenChef}`)
            resolve()
        } else {
            const reason = 'First attempt sandwich'
            reject(reason) 
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
        attemptCount++
        displayToDom(`Trying to make a sandwich... attempt n. ${attemptCount}`)
    try {
        await getBread()
        await addFillings()
        await toastSandwich()
        await serveSandwich()
        failed = false
        displayToDom(`Total attempts: ${attemptCount}\n\n`)
    }
    catch (err) {
        displayToDom(`An incident occurred : ${err}\n Trying again in 1 second...`)
        await wait(1000)
    }
    }
  
    try {
        await organizeFails()
    }
    catch (err) {
        console.log(err)
    }
}
const button = document.getElementById('generationButton')
button.addEventListener('click', makeSandwich)




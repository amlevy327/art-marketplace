export const GREEN = 'success'
export const RED = 'black'
export const DECIMALS = (10**18)

// shortcut to avoid passing around web3 connection
export const ether = (wei) => {
    if(wei) {
        return(wei / DECIMALS) // 18 decimal places
    }
}

// tokens and have same decimal resolution
export const tokens = ether

export const formatBalance = (balance) => {
    const precision = 10000 // 4 decimal places
    balance = ether(balance)
    balance = Math.round(balance * precision) / precision
    return balance
}

export const formatPrice = (price) => {
    const precision = 10000 // 4 decimal places
    price = ether(price)
    price = Math.round(price * precision) / precision
    return price
}
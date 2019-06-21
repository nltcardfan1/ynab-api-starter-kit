function formatWithDollarSign(amount){
    if(amount && Math.sign(amount) == -1){
        return `-$${Math.abs(amount.toFixed(2))}`
    }
    else if (amount)
    return `$${amount.toFixed(2)}`
}


export {formatWithDollarSign}
export function intArray({length = 10, max = 100, min = 1}) {
    const result = []
    while(length--) {
        const num = Math.floor(min + Math.random() * (max - min + 1))
        result.push(num)
    }
    return result
}

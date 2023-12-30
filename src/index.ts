/**
 * Signal is a function that returns a tuple of two functions.
 * The first function is for reading the current value of the signal,
 * and the second function is for writing a new value to the signal.
 *
 * @template T - The type of the signal's value.
 * @param initialValue - The initial value of the signal.
 *
 * @returns - A tuple containing two functions:
 *            1. A function for reading the current value of the signal.
 *            2. A function for writing a new value to the signal.
 */
export function Signal<T>(
    initialValue: T
): [() => T, (value: T | ((oldValue: T) => T)) => void] {
    const subscribers: Set<() => void> = new Set()

    const read = (): T => {
        const currentContext = getCurrentContext()
        if (currentContext) subscribers.add(currentContext)
        return initialValue
    }
    const write = (nextValue: T | ((oldValue: T) => T)) => {
        if (nextValue instanceof Function) {
            initialValue = nextValue(initialValue)
        } else {
            initialValue = nextValue
        }
        console.log(subscribers)
        subscribers.forEach((sub) => sub())
    }
    return [read, write]
}

const context: Array<() => void> = new Array()

/**
 * getCurrentContext is a utility function that returns the current context.
 *
 * @returns - The current context or undefined if there is no current context.
 */
function getCurrentContext() {
    return context[context.length - 1]
}

/**
 * Effect is a function that executes a callback `fn` whenever the state changes.
 * The function pushes the current effect onto the context stack, executes the `fn`,
 * and pops the effect from the context stack when it is done. If a cleanup function
 * `cleanup` is provided, it will be executed after the `fn` is executed.
 *
 * @param fn - The callback function to be executed whenever the state changes.
 * @param cleanup - (optional) A cleanup function to be executed after `fn` is executed.
 */
export function Effect(fn: () => void, cleanup?: () => void) {
    const execute = () => {
        context.push(execute)
        try {
            fn()
        } catch (err: any) {
            console.error(err)
        } finally {
            if (cleanup) cleanup()
            context.pop()
        }
    }
    execute()
}

// export function useSignal(signal) {
//     const [state, setState] = useState(signal[0]())

//     useEffect(() => {
//         Effect(() => {
//             const value = signal[0]()
//             setState(value)
//         })
//     }, [])

//     const set = signal[1]
//     return [state, set]
// }

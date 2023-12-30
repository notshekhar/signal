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
export declare function Signal<T>(initialValue: T): [() => T, (value: T | ((oldValue: T) => T)) => void];
/**
 * Effect is a function that executes a callback `fn` whenever the state changes.
 * The function pushes the current effect onto the context stack, executes the `fn`,
 * and pops the effect from the context stack when it is done. If a cleanup function
 * `cleanup` is provided, it will be executed after the `fn` is executed.
 *
 * @param fn - The callback function to be executed whenever the state changes.
 * @param cleanup - (optional) A cleanup function to be executed after `fn` is executed.
 */
export declare function Effect(fn: () => void, cleanup?: () => void): void;

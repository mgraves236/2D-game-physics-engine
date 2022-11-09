/**
 * Function to execute code after a given time
 * @param ms waiting time
 * @returns {Promise<unknown>}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
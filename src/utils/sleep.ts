/**
 * Wait for n amount of time before proceeding with the execution of the program
 * @param milliseconds 
 * @returns { void }
 */
export default function sleep(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
}
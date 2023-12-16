/**
 * 
 * @param {*} fn 
 * @returns a function that can handle async function without try/catch syntax
 * Doc of Promise.resolve: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
 * Promise.catch: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
 */

const asyncHandler = (fn) => (req, res, next) => {
    // catch will call next middleware and pass (err, req, res, next) to handle errors
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;
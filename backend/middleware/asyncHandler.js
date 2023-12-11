/**
 * 
 * @param {*} fn 
 * @returns a function that can handle async function without try/catch syntax
 */

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;
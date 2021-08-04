/**
 * Use after implementing error controller
 */

module.exports = fn => (req, res, next) => fn(req, res, next).catch(next);

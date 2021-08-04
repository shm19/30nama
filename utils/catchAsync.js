/**
 * Use after implementing error controller
 */
module.exports = fn => {
  return fn(req, res, next).catch(next);
};

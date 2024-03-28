module.exports = (fn) => {
  return (req, res, next) => {
    // Corrected order of parameters
    fn(req, res, next).catch(next);
  };
};

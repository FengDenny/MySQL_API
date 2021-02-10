module.exports = (fn) => {
  // middleware function
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

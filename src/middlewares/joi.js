const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const message = error.details.map((e) => e.message).join(', ');

    res.status(400).json({ message });
  } else {
    next();
  }
};

const validateQuery = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);

  if (error) {
    const message = error.details.map((e) => e.message).join(', ');

    res.status(400).json({ message });
  } else {
    next();
  }
};

module.exports = {
  validateBody,
  validateQuery,
};

const sanitizeObject = (value) => {
  if (!value || typeof value !== "object") {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => {
      sanitizeObject(item);
    });
    return;
  }

  Object.keys(value).forEach((key) => {
    const sanitizedKey = key.replace(/^\$+/g, "").replace(/\./g, "");
    const currentValue = value[key];

    sanitizeObject(currentValue);

    if (sanitizedKey === key) {
      return;
    }

    delete value[key];

    if (!sanitizedKey) {
      return;
    }

    value[sanitizedKey] = currentValue;
  });
};

const mongoSanitizeMiddleware = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  sanitizeObject(req.query);
  next();
};

export default mongoSanitizeMiddleware;

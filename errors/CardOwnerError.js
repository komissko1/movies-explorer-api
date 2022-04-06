module.exports = class CardOwnerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};

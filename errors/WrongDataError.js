module.exports = class WrongDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};

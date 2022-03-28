module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.status(201)
    .send({
      message: 'Выход из учетной записи совершен',
    })
    .catch(next);
};

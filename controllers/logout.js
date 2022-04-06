module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.status(200)
    .send({
      message: 'Выход из учетной записи совершен',
    })
    .catch(next);
};

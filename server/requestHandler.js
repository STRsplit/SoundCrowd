
const verifyUser = (req, res) => {
  res.send(req.user);
}


module.exports = {
  verifyUser: verifyUser
};
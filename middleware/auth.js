const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
      let token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await prisma.admin.findUnique({
        where: { id: userID },
        select: { id: true, role: true },
      });

      if (admin) {
        req.user = admin;
        // console.log(req.user);
        // console.log(req.user.role);
        next();
      } else {
        return res
          .status(401)
          .send({ msg: "Unauthorized user or Token is missing" });
      }
    } else {
      return res
        .status(401)
        .send({ msg: "Unauthorized user or Token is missing" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
};

module.exports = { authMiddleware };

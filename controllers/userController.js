const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validation and checks go here...
    if (req.user.role !== "admin" && req.user.role !== "master") {
      return res.status(401).send({ status: false, msg: "Unauthorized" });
    }


    if (role === "distributer" && req.user.role !== "admin" && req.user.role !== "master") {
        return res.status(401).send({ status: false, msg: "Unauthorized" });
      }
      
      if (role === "retailer" && req.user.role !== "admin" && req.user.role !== "master" && req.user.role !== "distributer") {
        return res.status(401).send({ status: false, msg: "Unauthorized" });
      }
      
      let parent_id;
      if (role === "master") {
        parent_id = req.user.id;
      } else if (role === "distributer") {
        if (req.user.role === "admin" || req.user.role === "master") {
          parent_id = req.user.id;
        } else {
          return res.status(401).send({ status: false, msg: "Unauthorized" });
        }
      } else {
        return res.status(400).send({ status: false, msg: "Invalid Role" });
      }
      

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        role,
        admin: { connect: { id: parent_id } }
      },
    });

    return res.status(201).send({ status: true, msg: "User Created Successfully", data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          name,
          password:hashedPassword,
          email,
        },
      });
  
      return res.status(200).send({ status: true, msg: "User updated successfully", data: updatedUser });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };



 const getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        parentId: true,
        admin: true,
      },
    });

    return res.status(200).send({ status: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};


const deleteUser = async (req, res) => {
    try {
      const id = req.params.id; // Corrected line
  
      let user =await prisma.user.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
  
      return res.status(200).send({ status: true, data:user, msg: "User Deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };
  
  
module.exports = {
  createUser,updateUser,getUser,deleteUser
};


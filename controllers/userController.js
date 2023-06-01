// // const bcrypt = require("bcrypt");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();


// const createUser = async (req, res) => {
//   try {
//     try {
//         const { name, password, email, role } = req.body;
//         // const hashedPassword = await bcrypt.hash(password, 10);

//         let parent_id;
//     // role="retailer"

//     // Validation and checks go here...
//     if (req.user.role !== "admin") {
//         return res.status(401).send({ status: false, msg: "Unauthorized" });
//       }
     

//       if (role === "master") {
//         parent_id = req.user._id;
//       } else if (role === "retailer") {
//         if (
//           req.user.role === "admin" ||
//           req.user.role === "distributer" ||
//           req.user.role === "master"
//         ) {
//           parent_id = req.user.id;
//         } else {
//           return res.status(401).send({ status: false, msg: "Unauthorized" });
//         }
//       } else if (role === "distributer") {
//         if (req.user.role === "admin" || req.user.role === "master") {
//           parent_id = req.user.id;
//         } else {
//           return res.status(401).send({ status: false, msg: "Unauthorized" });
//         }
//       } else {
//         return res.status(400).send({ status: false, msg: "Invalid Role" });
//       }

//         const newUser = await prisma.admin.create({
//           data: {
//             name,
//             password,
//             email,
//             role,
//             parent_id
//           },
//         });
    
//         return res
//           .status(201)
//           .send({ status: true, msg: "Admin Created Successfully", data: newUser });
//       } catch (error) {
//         console.log(error);
//         return res.status(500).send({ status: false, msg: error.message });
//       }

//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ status: false, msg: error.message });
//   }
// };

// module.exports = {
//   createUser,
// };
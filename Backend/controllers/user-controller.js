const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.users;


//     try {
//         const { name, email, password } = req.body
//         console.log("name, email, password :", req.body);

//         if (
//             !name || !email || !password
//         ) {
//             res.status(403);
//             res.send(`required parameters missing,
//             example request body:
//         {
//             name: "abc name",
//             email: "abc email"
//             password: "abc password"
//         } `);
//             return;
//         }

//         req.body.email = req.body.email.toLowerCase();

//         const userEmail = await User.findOne({ where: { email: email } })
//         console.log("userEmail :", userEmail);

//         if (userEmail) {
//             return res.status(403).json({ message: "user email already exist please try a different email" })
//         }

//         const saltRounds = 10;
//         const passwordConvertToHash = await bcrypt.hash(password, saltRounds)
//         console.log("passwordConvertToHash :", passwordConvertToHash);

//         var userCreated;
//         if (isAdmin) { // Check if user is to be created as an admin
//             userCreated = await User.create({
//                 name,
//                 email,
//                 password: passwordConvertToHash,
//                 isAdmin: true // Set isAdmin to true if user is to be created as an admin
//             });
//         } else {
//             userCreated = await User.create({
//                 name,
//                 email,
//                 password: passwordConvertToHash
//             });
//         }
//         console.log("create data in database :", userCreated);

//         // const token = jwt.sign({ userId: userCreated.id, email: userCreated.email }, "Hassan_Nadeem", { expiresIn: "1h" });
//         // console.log("register token :", token);
//         res.status(201).json({
//             message: "registration successfully", userId: userCreated.id, isAdmin: userCreated.isAdmin, userCreated

//         })
//     } catch (error) {
//         console.log("register error :", error);
//         res.status(500).json({ message: "internal server" })
//     }
// }

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         console.log("email, password :", req.body);

//         if (
//             !email || !password
//         ) {
//             res.status(403);
//             res.send(`Email and password are required,
//             example request body:
//         {
//             email: "abc email"
//             password: "abc password"

//         }
//         `);
//             return;
//         }

//         req.body.email = req.body.email.toLowerCase();

//         const user = await User.findOne({ where: { email: email } });
//         console.log("login user :", user);

//         if (!user) {
//             return res.status(404).json({ message: "invalid name and password" });
//         }

//         console.log("user.password type:", typeof user.password); // Check type of user.password
//         // console.log("password type:", typeof password); // Check type of password

//         const comparePassword = await bcrypt.compare(password, user.password)
//         console.log("comparePassword :", comparePassword);

//         if (!comparePassword) {
//             return res.status(404).json({ message: "invalid name and password" });
//         }

//         const token = jwt.sign({ userId: user.id, email: user.email, }, "Hassan_Nadeem", { expiresIn: "1h" });
//         console.log("login token :", token);
//         res.status(201).json({
//             message: "Login successful",
//             userId: user.id,
//             token,
//             isAdmin: user.isAdmin
//         })
//     } catch (error) {
//         console.log("login error :", error);
//         res.status(500).json({ message: "internal server" })
//     }
// }

// const register = async (req, res) => {
//     try {
//         const { name, email, password, role  } = req.body; // isAdmin ko bhi request body se extract karna hoga
//         console.log("name, email, password, role  :", name, email, password, role );

//         if (!name || !email || !password) {
//             res.status(403);
//             res.send(`Required parameters missing.`);
//             return;
//         }

//         req.body.email = req.body.email.toLowerCase();

//         const userEmail = await User.findOne({ where: { email: email } });
//         console.log("userEmail :", userEmail);

//         if (userEmail) {
//             return res.status(403).json({ message: "Wrong Email and Passsword :" });
//         }

//         var saltRounds = 10;
//         var passwordConvertToHash = await bcrypt.hash(password, saltRounds);
//         console.log("passwordConvertToHash :", passwordConvertToHash);

//         // Create user with role
//         const userCreated = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             role: role || "user" // Default role to "user" if not provided
//         });

//         console.log("create data in database :", userCreated);

//         res.status(201).json({
//             message: "Registration successful",
//             userId: userCreated.id,
//             role: userCreated.role, // Include role in the response
//             userCreated
//         });
//     } catch (error) {
//         console.log("register error :", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
const protectController = async (req, res) => {
  res.status(200).json({
    message: "Protected Route Successful",
  });
};

const register = async (req, res) => {
  try {
    const { email, password, answer, role } = req.body;


    if (!email || !password || !answer || !role) {
      return res.status(403).send(`required parameters missing, 
                        example request body:
                    {
                        email: "abc email"
                        password: "abc password"
                        answer: "abc answer"
                        role: "abc role"
                    } `);
    }

    req.body.email = req.body.email.toLowerCase();

    const userEmail = await User.findOne({ where: { email: email } });
    console.log("userEmail:", userEmail);

    if (userEmail) {
      return res.status(403).json({
        message: "Wrong Email and Passsword :",
      });
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with role
    const userCreated = await User.create({
      email,
      password: hashedPassword,
      answer,
      role,
    });

    console.log("create data in database:", userCreated);

    return res.status(201).json({
      message: "Registration successful",
      userCreated,
    });
  } catch (error) {
    console.log("register error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email, password :", email, password); // Check email and password types

    if (!email || !password) {
      res.status(403);
      res.send(`required parameters missing, 
                    example request body:
                {
                    email: "abc email"
                    password: "abc password"
                } `);
      return;
    }

    req.body.email = req.body.email.toLowerCase();

    const user = await User.findOne({ where: { email: email } });
    console.log("login user :", user); // Check if user object is retrieved


    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Check if the user is suspended
    if (user.isSuspended) {
      return res
        .status(403)
        .json({ message: "User is suspended. Please contact support." });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    console.log("comparePassword result:", comparePassword); // Check result of comparison

    if (!comparePassword) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "Hassan_Nadeem",
      { expiresIn: "10d" }
    );
    console.log("login token :", token);
    res.status(201).json({
      message: "Login successful",
      token,
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("login error :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// FORGET PASSWORD
const forgetPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    console.log("email, newPassword, answer :", req.body);

    if (!email || !newPassword || !answer) {
      res.status(403);
      res.send(`required parameters missing, 
                    example request body:
                {
                    email: "abc email"
                    newPassword: "abc newPassword"
                    answer: "abc answer"
                } `);
      return;
    }

    const user = await User.findOne({ where: { email, answer } });
    console.log("user:", user);

    if (!user) {
      return res.status(403).json({
        message: "Wrong Email or Passsword",
      });
    }

    console.log("Wrong Email or Passsword :", user);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log("hashedPassword:", hashedPassword);

    // Update the user's password
    const udatePassword = await User.update(
      { password: hashedPassword },
      { where: { id: user.id } }
    );
    console.log("udatePassword :", udatePassword);

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("forgetPassword :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findAllUsers = (req, res) => {
  const name = req.query.name;
  console.log("name :", name);

  const searchQuery = req?.query?.searchQuery; // Yeh assume karta hai ke tum 'searchQuery' naam ka parameter pass kar rahe ho
  console.log("searchQuery :", searchQuery);

  let condition = {};

  // Check karo ke name parameter provide kiya gaya hai aur wo khali nahi hai
  if (name !== undefined && name !== null && name.trim() !== "") {
    condition.name = { [Op.like]: `%${name}%` };
  }

  console.log("condition before searchQuery check:", condition);

  // Agar search query provide ki gayi hai aur wo khali nahi hai, to ise condition mein shamil karo
  if (
    searchQuery !== undefined &&
    searchQuery !== null &&
    searchQuery.trim() !== ""
  ) {
    // Try to parse searchQuery as a number
    const numericSearchQuery = parseFloat(searchQuery);
    if (!isNaN(numericSearchQuery)) {
      // Check karo ke searchQuery number hai ya nahi
      condition.price = { [Op.eq]: numericSearchQuery };
    } else {
      condition = {
        ...condition,
        [Op.or]: [
          { name: { [Op.like]: `%${searchQuery}%` } },
          { price: { [Op.like]: `%${searchQuery}%` } },
        ],
      };
    }
  }

  console.log("final condition :", condition);

  User.findAll({ where: condition, limit: 20 }) // Limit 20 products
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Products not found",
        });
      }
      res.send({ message: "Get all products successful ", data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    });
};

//SINGLE DELETE PRODUCT
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("delete all products with id :", id);

    const deleteUser = await User.destroy({ where: { id: id } });
    console.log("deleteUser :", deleteUser);

    if (deleteUser) {
      return res.status(201).json({
        id,
        message: "Delete single user successfully!",
      });
    } else {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }
  } catch (error) {
    console.error("delete single user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET SINGLE PRODUCT
const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.error("getsingleuser id:", id);

    // Find by single product
    const findById = await User.findByPk(id);
    console.error("findById:", findById);

    if (findById) {
      return res.status(200).json({
        message: "Get single user successful",
        findById,
      });
    } else {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.error("getsingleuser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE SINGLE PRODUCT
const updateSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.error("updateSingleUser id:", id);

    User.update(req.body, {
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          id,
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        });
      }
    });
  } catch (error) {
    console.error("updateSingleUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const suspendUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the isSuspended field
    user.isSuspended = true;
    await user.save();

    res.status(200).json({ message: "User suspended successfully", user });
  } catch (error) {
    console.error("Error suspending user:", error);
    res.status(500).json({ message: "Error suspending user", error });
  }
};

const unsuspendUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the isSuspended field
    user.isSuspended = false;
    await user.save();

    res.status(200).json({ message: "User unsuspended successfully", user });
  } catch (error) {
    console.error("Error unsuspending user:", error);
    res.status(500).json({ message: "Error unsuspending user", error });
  }
};

module.exports = {
  register,
  login,
  protectController,
  forgetPassword,
  findAllUsers,
  deleteUserById,
  getSingleUser,
  updateSingleUser,
  suspendUser,
  unsuspendUser
};

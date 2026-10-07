import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../Models/User.js';
import Task from '../Models/Task.js';

export const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashpassword
        })

        res.status(201).json({
            message: "User Registered Successfully",
            user: newUser
        })

    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message })
        } else if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" })
        } else {
            return res.status(400).json({ message: error.message })
        }
    }
}

export const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ email })

        if (!findUser) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        const checkpassword = await bcrypt.compare(
            password,
            findUser.password
        );

        if (!checkpassword) {
            return res.status(404).json({ message: "Invalid Password" })
        }

        const token = jwt.sign(
            { userId: findUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "8d" }
        )

        res.status(200).json({
            message: "Login Successfully",
            token
        });

    } catch (error) {
        res.json({ message: error.message }, console.log(error.message))

    }

}

export const createTask = async (req, res) => {
    try {
        const { title, description,status } = req.body
        const { userId } = req.user


        if (!userId) {
            return res.status(404).json({ message: "Id not a available" })
        }

        const newTask = await Task.create({
            title,
            description,
            status,
            user: userId
        })


        res.status(200).json({ message: "Created Task", Task: newTask })

    } catch (error) {
        res.status(404).json({ message: error.message }, console.log(`UserController.js file:- ${error.message}`))
    }
}


export const getTask = async (req, res) => {
    try {
        const { userId } = req.user
        const { search, status } = req.query
        
        const query = {
            user: userId
        }

        if (search) {
            query.$or = [
                {
                    editSubmiteditSubmit: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        }

        if(status){
            query.status = status
        }

          const usercreate = await Task.find(query).select("_id title description status")
        


        if (!usercreate) {
            return res.status(404).json({ message: "Invailed Id" })
        }


        res.status(200).json({ message: "Successfully", usercreate })


    } catch (error) {
        res.status(404).json({ message: error.message }, console.log(error.message))
    }
}

export const getTaskById = async (req, res) => {
    try {
        const id = req.params.id
        const { userId } = req.user


        const gettask = await Task.findOne({
            _id: id,
            user: userId
        }).select("-_id title description status ")


        if (!gettask) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({ message: "Successfully", gettask })


    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}


export const updateTask = async (req, res) => {
    try {
        const id = req.params.id
        const { userId } = req.user
        const { title, description, status } = req.body

        const updates = await Task.findOne({
            _id: id,
            user: userId

        })
        console.log(updates)


        if (!updates) {
            return res.status(404).json({ message: "User Not Found" })
        }

        const newtask = await Task.findOneAndUpdate({
            _id: id,
            user: userId
        },
            {
                title,
                description,
                status,
            },
            { new: true }
        )
        console.log(newtask)
        res.status(200).json({ message: "Successfully", newtask })



    } catch (error) {
        res.status(404).json({ message: error.message }, console.log(error.message))
    }
}


export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const { userId } = req.user

        console.log(id, userId)


        const deleteTasks = await Task.findOneAndDelete({
            _id: id,
            user: userId
        }
        )

        if (!deleteTasks) {
            return res.status(404).json({ message: "Task Not Found" })
        }

        console.log(`deleteTasks${deleteTasks}`)

        res.status(200).json({ message: "Delete Successfully", deleteTasks })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
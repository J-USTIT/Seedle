import Users from "../models/userModel.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const getAllUsers = async (req, res) => {
    try {
        const userData = await Users.find().select('-password');
        
        if (!userData || userData.length == 0) {
            return res.status(400).json({message: "User data not found."});
        }

        res.status(200).json({userData});
    }
    catch(error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getAllArchivedUsers = async (req, res) => {
    try {
        const userData = await Users.find({ isArchived: true }).select('-password');
        
        if (!userData || userData.length == 0) {
            return res.status(400).json({message: "User data not found."});
        }

        res.status(200).json({userData});
    }
    catch(error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const editUser = async (req, res) => {
    try {
        const editRequest = req.body.form;
        const { _id, username, email } = editRequest;

        console.log("[editUser] req.user:", req.user);

        // Prevent admins from editing their own account through this endpoint
        const loggedInId = req.user?.userId ?? req.user?.id ?? req.user?._id;
        if (loggedInId && _id.toString() === loggedInId.toString()) {
            return res.status(403).json({ message: "You cannot edit your own account." });
        }

        const emailExists = await Users.findOne({ email }); 
        const usernameExists = await Users.findOne({ username }); 
        
        // Returns error if username exists
        if(usernameExists && _id.toString() !== usernameExists.id.toString()) {
            return res.status(400).json({message: "Username already exists."});
        }

        // Returns error if email exists
        if(emailExists && _id.toString() !== emailExists.id.toString()) {
            return res.status(400).json({message: "Email already exists."});
        }

        const editUserAccount = await Users.findByIdAndUpdate(_id, {
            username,
            email,
            role: editRequest.role,
        }, { new: true, runValidators: true });

        res.status(200).json({message: "Update successful."});
    } catch (error) {
        console.error("editUser error:", error);
        res.status(500).json({errorMessage: error.message});
    }
}

export const createUser = async (req, res) => {
    try {
        const createRequest = req.body.form;

        const { username, email, password } = createRequest;
        const emailExists = await Users.findOne({ email }); 
        const usernameExists = await Users.findOne({ username }); 
        
        // Returns error if username exists
        if(usernameExists) {
            return res.status(400).json({message: "Username already exists."});
        }

        // Returns error if email exists
        if(emailExists) {
            return res.status(400).json({message: "Email already exists."});
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new Users({ ...createRequest, password: hashedPassword });
        const savedData = await newUser.save();

        res.status(201).json({message: "Created new account successfully."});
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({errorMessage: error.message});
    }
}

export const archiveUser = async (req, res) => {
    try {
        const archiveUserReq = req.body.user;
        const { _id: id } = archiveUserReq;

        // Prevent admins from archiving their own account
        const loggedInId = req.user?.userId ?? req.user?.id ?? req.user?._id;
        if (loggedInId && id.toString() === loggedInId.toString()) {
            return res.status(403).json({ message: "You cannot archive your own account." });
        }

        const archivedUser = await Users.findByIdAndUpdate(id, {
            isArchived: true
        }, {
            new: true
        });

        res.status(201).json({message: "User archived succesfully."});
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({errorMessage: error.message});
    }
}

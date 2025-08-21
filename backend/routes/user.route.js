import express from 'express'
import {registerUser} from '../controllers/user.controller.js'
import {adminLogin} from '../controllers/admin.controller.js'
import adminAuth from '../middleware/adminAuth.js'
import { downloadRegistrations } from "../controllers/user.controller.js";

const userRouter = express.Router();

//admin
userRouter.post('/login',adminLogin)

// /user 
userRouter.post('/register',adminAuth,registerUser);
userRouter.get("/download-excel",adminAuth, downloadRegistrations);

export default userRouter;
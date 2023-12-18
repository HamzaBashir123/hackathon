import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/video.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors";




const app = express();
app.use(cors());
dotenv.config()
const PORT = 8000;

const Connect =() =>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((err)=>{
        throw err;
    })

}
// Middleware


app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comment", commentRoutes)

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success : false,
        status,
        message,
    })

})

app.listen(PORT,()=>{
    console.log("Connect to Server!")
    Connect();
})

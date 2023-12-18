import  express from "express";
import { update,deleteUser, subcribe, unsubcribe, dislike ,getUser,like} from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

//Update user
router.put("/:id", verifyToken,update)


//delete user
router.delete("/:id",verifyToken,deleteUser)

//get a user
router.get("/find/:id",getUser)

//subcribe a  user
router.put("/sub/:id",verifyToken,subcribe)

//unsubcribe a user
router.put("/unsub/:id",verifyToken,unsubcribe)

//like user
router.put("/like/:videoId",verifyToken,like)

//unlike user
router.put("/dislike/:videoId",verifyToken,dislike)





export default router;
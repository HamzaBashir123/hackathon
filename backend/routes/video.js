import  express from "express";
import { addVideo, updateVideo, deleteVideo, getVideo, addView, trend,random,sub, getByTag, search } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";




const router = express.Router();


//  Create a Video

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)

router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", verifyToken, search)




export default router;
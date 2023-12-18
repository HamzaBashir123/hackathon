import  {createError}  from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"


//  /////////////////////////    Update User   ///////////////////////////
export const update = async (req, res, next)=>{
    if(req.params.id=== req.user.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body

            },{
                new:true
            })
            res.status(200).json(updatedUser)
            
        } catch (error) {
            next(error)
        }

    }else{
        return next(createError(403, "You can update only your account!"))
    }
    
}


//  /////////////////////////    Delete User   ///////////////////////////

export const deleteUser =async (req, res, next)=>{
    if(req.params.id=== req.user.id){
        try {
             await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
            
        } catch (error) {
            next(error)
        }

    }else{
        return next(createError(403, "You can delete only your account!"))
    }
    
}


//  /////////////////////////    Get User   ///////////////////////////


export const getUser =async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
        
    } catch (err) {
        next(err)
        
    }
}


//  /////////////////////////    Get User   ///////////////////////////

export const subcribe =async (req, res, next)=>{
    try {
        if(req.user.id !== req.params.id){
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: 1}
        });
        res.status(200).json("Subscription Successfully")
    }else{
        res.status(404).json("Not Allow own Subscribtion")
    }

    } catch (err) {
        next(err)
        
    }
    
}
export const unsubcribe =async (req, res, next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: -1}
        });
        res.status(200).json("Unsubscription Successfully")

    } catch (err) {
        next(err)
        
    }
    
}
export const like =async (req, res, next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}

        })
        res.status(200).json("The video has been Liked")
        
    } catch (err) {
        next(err)
        
    }
    
}
export const dislike =async (req, res, next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}

        })
        res.status(200).json("The video has been disLiked")
        
    } catch (err) {
        next(err)
        
    }
    
}

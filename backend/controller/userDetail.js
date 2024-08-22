// const UserModel=require("../model/UserModel")

// const UserDetail=async(req,res)=>{
//     try{
//         // const user=await UserModel.findById({_id:_id})
//         // console.log(user)
//         // if(!user.token){
//         //     res.json(user)
//         // }
//         console.log("")
//         }
//         catch(e){
//             res.json({
//                 success:false,
//                 message:"user not found"
//             })
//         }
// }

// const Details={
//     UserDetail
// }
// module.exports=Details

const UserModel = require("../model/UserModel");

const UserDetail = async (req, res) => {
    try {
        const userId =req.user?.id;
        console.log(userId)
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: user
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user details",
            error: e.message
        });
    }
};

module.exports = UserDetail;

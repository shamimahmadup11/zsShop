const UserModel = require("../model/UserModel");

const UserDetail = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is missing from request",
            });
        }

        const user = await UserModel.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: user,
        });

    } catch (e) {
        console.error("Error fetching user details:", e.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user details",
        });
    }
};

module.exports = UserDetail;

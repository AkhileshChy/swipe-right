import User from "../models/user.model.js";

export const swipeRight = async (req, res) => {
    try {
        const { likedUserId } = req.params;
        const currentUser = await User.findById(req.user.id);
		const likedUser = await User.findById(likedUserId);
        if (!likedUser) {
            return res.status(404).json({ success: false, message: "User not found"});
        }
        if (!currentUser.likes.includes(likedUserId)){
            currentUser.likes.push(likedUserId);
			await currentUser.save();
            if (likedUser.likes.includes(currentUser.id)){
                currentUser.matches.push(likedUserId);
				likedUser.matches.push(currentUser.id);
				await Promise.all([await currentUser.save(), await likedUser.save()]);

            }
        }
        res.status(200).json({
			success: true,
			user: currentUser,
		});
    } catch (error) {
        console.log("Error in swipeRight: ", error);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}

export const swipeLeft = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
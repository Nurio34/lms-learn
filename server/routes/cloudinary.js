const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadVideo, deleteVideo } = require("../cloudinary");

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const response = await uploadVideo(req.file.path);

        return res.status(201).json({
            success: true,
            message: req.file.mimetype.includes("video")
                ? "Video uploaded successfully..."
                : "Image uploaded successfully",
            data: response,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: "Error while uploading the video !",
        });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Video id is required !",
            });
        }

        const response = await deleteVideo(id);

        return res.status(200).json({
            success: true,
            message: "Video deleted successfully...",
            data: response,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: "Error while deleting the video !",
        });
    }
});

module.exports = router;

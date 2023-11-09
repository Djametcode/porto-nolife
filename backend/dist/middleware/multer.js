import multer from "multer";
const storage = multer.diskStorage({
    destination(req, file, callback) {
        return callback(null, "/tmp");
    },
    filename(req, file, callback) {
        return callback(null, file.originalname + "_" + Date.now());
    },
});
export const upload = multer({ storage: storage }).single("file");

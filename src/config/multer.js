import multer from "multer"
import path from "path";

export const __DIRNAME = import.meta.dirname;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__DIRNAME, "..", "public", "images", "products"))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
export const UPLOADER_PRODUCTS = multer({ storage });

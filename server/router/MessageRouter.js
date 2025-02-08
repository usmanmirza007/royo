import { Router } from "express";

const router = Router();

import { createMessage, getMessage } from "../controller/MessageController.js";

router.route("/post").post(createMessage);
router.route("/receive_message").post(getMessage);

export default router;

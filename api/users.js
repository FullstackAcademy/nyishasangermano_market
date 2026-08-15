import { Router } from "express";
import bcrypt from "bcrypt";

import {createUser, getUserByUsername} from "#db/queries/users";
import {createToken} from "#utils/jwt";
import requireBody from "#middleware/requireBody";

const router = Router ();
export default router;

router.post("/register", requireBody(["username", "password"]), async (req, res) => {
    const {username, password}=req.body;
    const user = await createUser(username, password);
    const token= createToken({id:user.id});
    res.status(201).send(token);
});

router.post("/login", requireBody(["username", "password"]), async (req, res) => {
    const {username, password}=req.body;
    const user = await getUserByUsername(username);
    if (!user) return res.status(401).send("Invalid credentials.");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send("Invalid credentials.");

    const token = createToken({id:user.id});
    res.send(token);
});


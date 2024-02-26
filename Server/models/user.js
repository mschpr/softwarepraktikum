import validate from "validate.js";
import bcrypt from "bcrypt";
import { _ as constraints } from "../lib/constraints.js";
import { getUserByUsername } from "../src/main.js";

export let _ = class User {
    constructor() {
        this.username = null;
        this.name = null;
        this.password = null;
    }

    setName(name) {
        try {
            if (name) {
                name = name.trim().replace(/ +/g, ' ');
            }
            let msg = validate.single(name, constraints.name);
            if (msg) {
                return msg;
            }
            else {
                this.name = name;
                return;
            }

        } catch (err) {
            throw new Error(err)
        }
    }

    async setUsername(username) {
        try {
            // if (username) {
            //     username = username.trim().replace(/ +/g, ' ');
            // }
            let msg = validate.single(username, constraints.name);
            (await getUserByUsername(username)).length <= 1;
            if (msg) {
                return msg;
            } else if ((await getUserByUsername(username)).length > 0) {
                return "Name bereits vergeben"
            }
            else {
                this.username = username;
                return;
            }

        } catch (err) {
            throw new Error(err)
        }
    }

    async setPassword(password) {
        try {
            let msg = validate.single(password, constraints.password);

            if (msg) {
                return msg;
            } else {
                this.password = await bcrypt.hash(password, 10);
                return;
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
};
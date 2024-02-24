import { v4 } from "uuid";
import validate from "validate.js";
import bcrypt from "bcrypt";
import { _ as constraints } from "../lib/constraints.js";

export let _ = class User {
    constructor() {
        this.created = new Date();
        this.id = v4();
        this.username = null;
        this.name = null;
        this.password = null;
    }

    save() {
        console.log(`${this.username} registriert`);
    }

    find(id) {
        return "";
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

    setUsername(username) {
        try {
            if (username) {
                username = username.trim().replace(/ +/g, ' ');
            }
            let msg = validate.single(username, constraints.name);
            if (msg) {
                return msg;
            }
            else {
                this.username = username;
                return;
            }

        } catch (err) {
            throw new Error(err)
        }
    }

    setEmail(email) {
        try {
            let msg = validate.single(email, constraints.email);
            if (msg) {
                return msg;
            }
            else {
                this.email = email;
                return;
            }
        } catch (err) {
            throw new Error(err);
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
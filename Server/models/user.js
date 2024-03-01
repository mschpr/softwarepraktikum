import validate from "validate.js";
import bcrypt from "bcrypt";
import { constraints } from "../src/constraints.js";
import { getUserByUsername } from "../src/queries.js";

export let user = class User {
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
            let message = validate.single(name, constraints.name);
            if (message) {
                return { result: true, message: message };
            }
            else {
                this.name = name;
                return { result: false, message: "" };
            }

        } catch (err) {
            throw new Error(err)
        }
    }

    async setUsername(username) {
        try {
            let message = validate.single(username, constraints.name);
            if (message) {
                return { result: true, message: message };
            } else if ((await getUserByUsername(username)).length > 0) {
                return { result: true, message: "Name bereits vergeben" };
            }
            else {
                this.username = username;
                return { result: false, message: "" };;
            }

        } catch (err) {
            throw new Error(err)
        }
    }

    async setPassword(password) {
        try {
            let message = validate.single(password, constraints.password);
            if (message) {
                return { result: true, message: message };
            } else {
                this.password = await bcrypt.hash(password, 10);
                return { result: false, message: "" };
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
};
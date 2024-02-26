export let _ = {};

_.name = () => {
    const regex = "[\-\'A-Za-z0-9 ]+";
    const constraints = {
        "presence": {
            allowEmpty: false
        },
        "type": "string",
        "format": {
            "pattern": regex,
            "flags": "i",
            "message": "Name enthält ungültige Zeichen"
        }
    }
    return constraints;
}

// _.email = () => {
//     const constraints = {
//         "presence": { "allowEmpty": false },
//         "type": "string",
//         "email": true
//     }
//     return constraints;
// }

_.password = () => {
    const constraints = {
        "presence": { "allowEmpty": false },
        "type": "string",
        "length": {
            "minimum": 6,
        }
    }
    return constraints;
}
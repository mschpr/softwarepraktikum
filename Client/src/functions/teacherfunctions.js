export async function getIsTeacher() {
    let response = await fetch(`http://localhost:3001/auth/isteacher`, { credentials: "include" });
    return response.status === 200;
};
import { useEffect } from "react";

const Logout = () => {

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`http://localhost:3001/auth/logout`, { credentials: "include" });
        };
        fetchData();
    }, []);
    window.location.replace("http://localhost:3000/login");
    return;
};
export default Logout;
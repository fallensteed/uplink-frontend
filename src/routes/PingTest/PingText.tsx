import { FC, useEffect, useState } from "react";
import { socket } from "../../common/config/socket";

const PingTest: FC = () => {
    const [lastPing, setLastPing] = useState<null | string>(null);

    useEffect(() => {
        socket.on("pingReturn", () => {
            setLastPing(new Date().toISOString());
        });

        return () => {
            socket.off("pingReturn");
        };
    }, []);

    const sendPing = () => {
        console.log("emitting ping");
        socket.emit("ping", "hello there");
    };

    return (
        <div>
            <header>Server Ping</header>
            <p>Last Ping Return: {lastPing || "-"}</p>
            <button onClick={sendPing}>Send Ping</button>
        </div>
    );
};

export default PingTest;

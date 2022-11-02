import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io(`http://localhost:8080`);

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [lastPing, setLastPing] = useState<null | string>(null);

	useEffect(() => {
		console.log("useEffect");
		socket.on("connect", () => {
			console.log("socket connection");
			setIsConnected(true);
		});

		socket.on("disconnect", () => {
			setIsConnected(false);
		});

		socket.on("pingReturn", () => {
			setLastPing(new Date().toISOString());
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("pingReturn");
		};
	}, []);

	const sendPing = () => {
		console.log("emitting ping");
		socket.emit("ping", "hello there");
	};

	return (
		<div className="App">
			<header className="App-header">React Chat</header>
			<p>Connected: {isConnected.toString()}</p>
			<p>Last Ping Return: {lastPing || "-"}</p>
			<button onClick={sendPing}>Send Ping</button>
		</div>
	);
}

export default App;

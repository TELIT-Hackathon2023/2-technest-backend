import { useEffect, useState } from "react";
import { serverUrlConnection } from "../settings/ConnectionSettings";

const BASE_URL = serverUrlConnection

export function useLocalHistory() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        setHistory(JSON.parse(localStorage.getItem("history") ?? "[]"));
    }, [])

    const persistHistory = async (history) => {
        localStorage.setItem("history", history);
        // should transform [question, answer, ...] -> [[question, answer]]
        let pairsArray = [];
        for (let i = 1; i < initialArray.length; i += 2) {
            pairsArray.push([initialArray[i], initialArray[i + 1]]);
        }
        await fetch(`${BASE_URL}/set-history`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.parse(pairsArray)
        })
        setHistory(history);
    }

    return [history, persistHistory]
}
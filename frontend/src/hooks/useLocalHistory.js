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
        setHistory(history);
    }

    return [history, persistHistory]
}
import { useEffect, useState } from "react";

export function useLocalHistory() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        setHistory(JSON.parse(localStorage.getItem("history") ?? "[]"));
    }, [])

    const persistHistory = (history) => {
        localStorage.setItem("history", history);
        setHistory(history);
    }

    return [history, persistHistory]
}
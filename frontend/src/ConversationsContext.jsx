import { createContext, useEffect, useState } from "react"
import { useLocalHistory } from "./hooks/useLocalHistory";

/*

type Conversation = Array<{role: "USER" | "AI", text: string, createdAt: Date}>

type HistoryEntry = 
    Array<Conversation>

*/

const BASE_URL = "http://localhost:8000"

function isSameDay(timestamp1, timestamp2) {
    // Create Date objects from timestamps
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    // Compare year, month, and day
    const isSameYear = date1.getFullYear() === date2.getFullYear();
    const isSameMonth = date1.getMonth() === date2.getMonth();
    const isSameDay = date1.getDate() === date2.getDate();

    // Return true if all components (year, month, day) are the same
    return isSameYear && isSameMonth && isSameDay;
}

export const ConversationsContext = createContext({
    conversation: [],
    history: []
});

export function ConversationsProvider({ children }) {
    const [conversation, setConversation] = useState({
        id: crypto.randomUUID(),
        messages: []
    });
    const [history, setHistory] = useLocalHistory();

    async function sendMessage(message) {
        setConversation(prev => [...prev, {
            role: "USER",
            text: message
        }])

        const response = await fetch(`${BASE_URL}/prompt?data=${message}`);
        const { answer } = await response.json();

        setConversation(prev => [...prev, {
            role: "AI",
            text: answer
        }])
    }

    console.log("History:", history);

    async function newConversation() {
        setHistory(prev => [...prev, conversation]);
        setConversation({
            id: crypto.randomUUID(),
            messages: []
        })
    }

    return <ConversationsContext.Provider value={{ conversation, history, sendMessage, newConversation }}>
        {children}
    </ConversationsContext.Provider>
}
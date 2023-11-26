import { createContext, useState } from "react";
import { useLocalHistory } from "./hooks/useLocalHistory";

/*

type Conversation = Array<{role: "USER" | "AI", text: string, createdAt: Date}>

type HistoryEntry = 
    Array<Conversation>

*/

const BASE_URL = "https://a94f-147-232-36-11.ngrok-free.app"

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
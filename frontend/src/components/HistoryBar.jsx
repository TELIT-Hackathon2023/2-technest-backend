import React, { useContext } from 'react';
import { ConversationsContext } from '../ConversationsContext';
import styles from './HistoryBar.module.css';
import HistoryBtn from './UI/HistoryBtn';

function HistoryBar() {
    const { history } = useContext(ConversationsContext);

    if (!history) return null

    return (
        <div className={styles.history_section_container}>
            {history.length !== 0 ? <>
                <h2 style={{ textAlign: "left", padding: "0 1.25rem" }}>History</h2>
                <div style={{ padding: "1.25rem 0" }}>
                    {history.map((element) => (
                        <div className={styles.history_item_container} key={element.id}>
                            <HistoryBtn historyId={element.id} historyText={element.messages?.[element.messages.length - 1]} />
                        </div>
                    ))}
                </div></> : <h2 style={{ textAlign: "left", padding: "0 1.25rem" }}>No history yet</h2>}
        </div>
    )
}

export default HistoryBar
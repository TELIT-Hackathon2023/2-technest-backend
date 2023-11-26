import React, { useState } from 'react';
import styles from './HistoryBar.module.css';
import HistoryBtn from './UI/HistoryBtn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";

function daysAgo(dateString) {
    const [day, month, year] = dateString.split('.').map(Number);
    const inputDate = new Date(year, month - 1, day);

    const currentDate = new Date();
    const timeDifference = currentDate - inputDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if(daysDifference === 0){
        return "Today";
    }else if (daysDifference === 1){
        return "Yesterday";
    }else{
        return dateString;
    }
}

function HistoryBar() {
    const [chooseStatus, setChooseStatus] = useState({ id: "", hist: "" });

    const [historyArr, setHistoryArr] = useState([
        {
            date: "26.11.2023",
            historyTags: [
                { id: 1, history: "Targis what is it ?" },
                { id: 2, history: "AI in T-Systems" }
            ]
        },
        {
            date: "25.11.2023",
            historyTags: [
                { id: 3, history: "Targis system architecture" },
                { id: 4, history: "Microservices in Targis" }
            ]
        }
    ]);

    function onCreationConversation() {
        const newDate = new Date();
        const dateString = `${newDate.getDate().toString().padStart(2, '0')}.${(newDate.getMonth() + 1).toString().padStart(2, '0')}.${newDate.getFullYear()}`;

        // Check if there's an existing date entry with the same date
        const existingDateIndex = historyArr.findIndex(history => history.date === dateString);

        if (existingDateIndex !== -1) {
            // If a similar date exists, add the new conversation to its historyTags
            const newId = historyArr[existingDateIndex].historyTags.length + 1; // Increment the id
            const newConversation = { id: newId, history: "New Conversation" };

            setHistoryArr(prevHistoryArr => {
                const updatedHistoryArr = [...prevHistoryArr];
                updatedHistoryArr[existingDateIndex].historyTags.push(newConversation);
                return updatedHistoryArr;
            });
        } else {
            // If no similar date exists, create a new date entry
            const newConversation = {
                date: dateString,
                historyTags: [
                    { id: 1, history: "New Conversation" },
                ]
            };

            setHistoryArr(prevHistoryArr => [newConversation, ...prevHistoryArr]);
        }

        console.log(historyArr)
    }




    return (
        <div className={styles.history_section_container}>
            <div style={{ padding: "20px 0" }}>
                <div className={styles.history_features}>
                    <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                    <FontAwesomeIcon icon={faEdit} className={styles.icon} onClick={onCreationConversation} />
                </div>

                {historyArr.map((element, index) => (
                    <div className={styles.history_item_container} key={index}>
                        <div className={styles.history_date_container}>
                            {daysAgo(element.date)}
                        </div>
                        <div className={styles.history_btns_list}>
                            {element.historyTags.map((el, idx) => (
                                <HistoryBtn historyId={el.id} key={idx} historyText={el.history} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HistoryBar;

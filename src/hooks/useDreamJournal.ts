import { useEffect, useState } from "react";

type JournalEntry = {
    date: string,
    content: string
}

const storageKey = 'time-to-sleep:dreamjournal'

export default function () {
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const refreshEntries = () => {
        setEntries(JSON.parse(localStorage.getItem(storageKey) || '[]'));
    }

    useEffect(() => {
    }, [entries]);

    const addOrUpdateEntry = (entry: JournalEntry) => {
        setEntries((prevEntries) => {
            const index = prevEntries.findIndex(item => item.date === entry.date);

            let newEntries = [...prevEntries];     

            if (index !== -1) {
                newEntries[index] = entry;
            } else {
                newEntries.push(entry);
            }

            newEntries.sort((a, b) => a.date > b.date ? -1 : 1);
            localStorage.setItem(storageKey, JSON.stringify(newEntries));
            return newEntries;
        });
    }

    const removeEntryByIndex = (index: number) => {
        setEntries((prevEntrires) => {
            const newEntries = [...prevEntrires];
            newEntries.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(newEntries));
            return newEntries;
        })
    }

    const removeEntryByDate = (date: string) => {
        const index = entries.findIndex(entry => entry.date === date);
        if(index !== -1) {
            removeEntryByIndex(index);
        }
    }

    return {
        entries,
        removeEntryByIndex,
        removeEntryByDate,
        addOrUpdateEntry,
        refreshEntries
    }
}
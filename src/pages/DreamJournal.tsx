import { FormEvent, useEffect, useMemo } from "react";
import { routes } from "../constants";
import useDreamJournal from "../hooks/useDreamJournal";

export const path = routes.app.dreamjournal.url;

export default function DreamJournal() {

    const currentDateStr = useMemo(() => {
        return new Date().toISOString().split('T')[0];
    }, [])

    const journal = useDreamJournal();

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const entry = {
            date: data.get('date') as string,
            content: data.get('content') as string
        }
        journal.addOrUpdateEntry(entry);
    }

    useEffect(() => {
        journal.refreshEntries();
    })

    return (
        <main className="flex flex-col gap-4">
            <div>
                <h2>Dream Journal</h2>
                <span className="text-neutral-500">Keep track of your dreams</span>

            </div>
            <form 
                className="flex flex-col gap-1 border border-neutral-700 p-4 max-w-lg rounded-sm"
                onSubmit={handleFormSubmit}
            >
                <input type='date' defaultValue={currentDateStr} className="p-2" name="date" required/>
                <textarea placeholder="This night I dreamt of..." className="p-2" rows={4} name="content" required>

                </textarea>
                <button className="w-full sm:w-fit ml-auto">Save</button>
            </form>
            <section className="flex flex-col gap-2">
                <h3>Entries</h3>
                <ul className="flex flex-col gap-2">
                    {journal.entries.map(entry => (
                        <li>
                            <div className="border border-neutral-700 p-4 max-w-lg rounded-sm">
                                <div className="text-neutral-400 flex justify-between items-center">
                                    <span>
                                        {entry.date}
                                    </span>
                                    <span>
                                        <button 
                                            className="bg-transparent hover:bg-neutral-700 rounded-full ring-none outline-none border-none text-red-500 py-0 px-1 h-fit leading-none"
                                            onClick={() => journal.removeEntryByDate(entry.date)}
                                        >
                                            x
                                        </button>
                                    </span>
                                </div>
                                <div>
                                    {entry.content}
                                </div>
                                
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}
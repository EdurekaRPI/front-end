'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import styles from '../../styles/events-navigator.module.css';

//example events
interface EventItem {
    id: number;
    name: string;
    date: string;
    description: string;
}

const sampleEvents: EventItem[] = [
    { id: 1, name: 'react Workshop', date: '2024-12-20T10:00', description: 'React basics.' },
    { id: 2, name: 'Conference', date: '2025-01-15T09:00', description: 'features.' },
    { id: 3, name: 'Meetup', date: '2025-02-05T18:30', description: 'Node.js tips.' },
    { id: 4, name: 'Summit', date: '2025-03-10T14:00', description: 'GraphQL API.' },
];

export default function EventsNavigatorPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [events, setEvents] = useState<EventItem[]>(sampleEvents);
    const [filteredEvents, setFilteredEvents] = useState<EventItem[]>(sampleEvents);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const currentEvent = filteredEvents[currentIndex] || null;

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
        } else {
            setIsDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = events.filter(evt => evt.name.toLowerCase().includes(query));
        setFilteredEvents(filtered);
        setCurrentIndex(0);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredEvents.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < filteredEvents.length - 1 ? prev + 1 : 0));
    };

    const handleEventClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className={`${styles.page} ${isDarkMode ? styles.dark : styles.light}`}>
            <header className={styles.header}>
                <h1>Events Navigator</h1>
                <div className={styles.headerButtons}>
                    <button className={styles.toggleButton} onClick={toggleDarkMode}>
                        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </button>
                    <Link href="/">
                        <button className={styles.returnButton}>Return to Main Page</button>
                    </Link>
                </div>
            </header>

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search events..."
                        className={styles.searchInput}
                    />
                    <ul className={styles.eventList}>
                        {filteredEvents.map((evt, idx) => (
                            <li
                                key={evt.id}
                                className={`${styles.eventItem} ${idx === currentIndex ? styles.activeEvent : ''}`}
                                onClick={() => handleEventClick(idx)}
                            >
                                {evt.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className={styles.mainContent}>
                    {currentEvent ? (
                        <>
                            <h2>{currentEvent.name}</h2>
                            <p><strong>Date:</strong> {new Date(currentEvent.date).toLocaleString()}</p>
                            <p>{currentEvent.description}</p>
                            <div className={styles.navButtons}>
                                <button onClick={handlePrev} className={styles.navButton}>Previous</button>
                                <button onClick={handleNext} className={styles.navButton}>Next</button>
                            </div>
                        </>
                    ) : (
                        <p>No events found.</p>
                    )}
                </main>
            </div>
        </div>
    );
}

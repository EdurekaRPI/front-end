"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";

// This is the base URL for the API.
const API_BASE_URL = `${process.env.NEXT_PUBLIC_HEROKU_API_URL}/api/admin`;

export default function EventOptions() {
    const [eventData, setEventData] = useState(null);
    const [formData, setFormData] = useState(null);

    // Retrieve event data from local storage when the component mounts
    useEffect(() => {
        const storedEvent = localStorage.getItem("selectedEvent");
        if (storedEvent) {
            const parsedEvent = JSON.parse(storedEvent);
            setEventData(parsedEvent);
            setFormData(parsedEvent);
        }
    }, []);

    // Helper function to convert ISO string to datetime-local format
    const toDateTimeLocal = (isoString: string | number | Date) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        if (name === 'startDateTime' || name === 'endDateTime') {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                setFormData(prev => ({
                    // @ts-ignore
                    ...prev,
                    [name]: date.toISOString(),
                    // If you need to maintain legacy time fields
                    ...(name === 'startDateTime' && { startTime: date.toLocaleTimeString() }),
                    ...(name === 'endDateTime' && { endTime: date.toLocaleTimeString() })
                }));
            }
        } else {
            // Handle direct time field updates if needed
            // @ts-ignore
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

// Handle Save (PATCH)
    const handleSave = async () => {
        if (!formData) return;
        try {
            const response = await axios.patch(
                `${API_BASE_URL}/edit-event/${formData._id}`,
                formData,
                {
                    headers: {
                        'Api-Key': process.env.NEXT_PUBLIC_NEXT_ADMIN_API_KEY,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.editedEvent) {
                console.log('Save success', response.data.editedEvent);
                // Update local state
                setEventData(response.data.editedEvent);
                localStorage.setItem("selectedEvent", JSON.stringify(response.data.editedEvent));
                alert("Event updated successfully!");
            }
        } catch (error) {
            const errorMessage = (error as any).response?.data?.error || "Error saving event!";
            console.error("Error saving event:", errorMessage);
            alert(errorMessage);
        }
    };

// Handle Delete (DELETE)
    const handleDelete = async () => {
        if (!formData) return;
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/delete-event/${formData._id}`,
                {
                    headers: {
                        'Api-Key': process.env.NEXT_PUBLIC_NEXT_ADMIN_API_KEY,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data === 'Event deleted and archived') {
                localStorage.removeItem("selectedEvent");
                alert("Event deleted and archived successfully!");
                document.location.href = "/";
            }
        } catch (error) {
            const errorMessage = (error as any).response?.data?.error || "Error deleting event!";
            console.error("Error deleting event:", errorMessage);
            alert(errorMessage);
        }
    };

    if (!formData) return <div className="container mt-4">Loading event...</div>;

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h1 className="mb-4">Event Options</h1>
                <div className="card shadow-sm p-4 mb-4">
                    <form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        name="title"
                                        value={formData.title || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Event Host</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        name="eventHost"
                                        value={formData.eventHost || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        name="location"
                                        value={formData.location || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Club</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        name="club"
                                        value={formData.club || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row g-3">
                                    {/* Description (Left Side) */}
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control rounded-3"
                                                name="description"
                                                value={formData.description || ""}
                                                onChange={handleChange}
                                                rows={6}
                                            />
                                        </div>
                                    </div>

                                    {formData.image && (
                                        <div className="col-md-4">
                                            <label className="form-label text-muted small mb-2">
                                                Current Image Preview
                                            </label>
                                            <img
                                                src={formData.image}
                                                alt="Event preview"
                                                className="img-fluid rounded-2"
                                                style={{ maxWidth: '100%', objectFit: 'contain' }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label">
                                                {formData.image ? "Update Image URL" : "Image URL"}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control rounded-3"
                                                name="image"
                                                value={formData.image || ""}
                                                onChange={handleChange}
                                                placeholder="Enter image URL"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-3">
                                {/* Start Date/Time */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Start Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control rounded-3"
                                            name="startDateTime"
                                            value={toDateTimeLocal(formData.startDateTime)}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Legacy Time Display (read-only)
                                    {formData.startTime && (
                                        <div className="mt-2 text-muted small">
                                            Original Start Time: {formData.startTime}
                                        </div>
                                    )}
                                    */}
                                </div>

                                {/* End Date/Time */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">End Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control rounded-3"
                                            name="endDateTime"
                                            value={toDateTimeLocal(formData.endDateTime)}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Legacy Time Display (read-only)
                                    {formData.endTime && (
                                        <div className="mt-2 text-muted small">
                                            Original End Time: {formData.endTime}
                                        </div>
                                    )}
                                    */}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="d-flex gap-3 mb-4">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="btn btn-primary px-2 rounded-3"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger px-2 rounded-3"
                    >
                        Delete Event
                    </button>
                </div>
                {/*
                <div className="card mt-4">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Current Event Data</h5>
                    </div>
                    <div className="card-body">
                        <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {JSON.stringify(formData, null, 2)}
                        </pre>
                    </div>
                </div>
                */}
            </div>
        </>
    );
}

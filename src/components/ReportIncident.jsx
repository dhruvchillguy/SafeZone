import { useState } from 'react';
import { DELHI_DISTRICTS } from '../utils/constants';

export default function ReportIncident({ onSubmit }) {
    const [formData, setFormData] = useState({
        type: 'Theft',
        description: '',
        date: new Date().toISOString().split('T')[0],
        area: 'Central Delhi',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newIncident = {
            id: Date.now().toString(),
            type: formData.type,
            description: formData.description,
            date: formData.date,
            time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
            area: formData.area,
        };

        onSubmit(newIncident);
        setFormData({ ...formData, description: '' });
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-4">Report an Incident</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Area/District</label>
                    <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-4 py-3"
                    >
                        {DELHI_DISTRICTS.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Crime Type</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-4 py-3"
                    >
                        <option>Theft</option>
                        <option>Harassment</option>
                        <option>Assault</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-4 py-3 h-24 resize-none"
                        placeholder="Describe the incident..."
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-4 py-3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                >
                    Submit Report
                </button>
            </form>
        </div>
    );
}

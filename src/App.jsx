import { useState, useEffect } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import RiskBanner from './components/RiskBanner';
import EmergencyButtons from './components/EmergencyButtons';
import ReportIncident from './components/ReportIncident';
import CrimeStats from './components/CrimeStats';
import CommunityReports from './components/CommunityReports';
import RecentReports from './components/RecentReports';
import PoliceStations from './components/PoliceStations';
import RiskAssessment from './components/RiskAssessment';
import { fetchPoliceStations, fetchCrimeStats } from './utils/api';
import { calculateRisk, getRiskExplanation } from './utils/riskCalculator';
import { DELHI_DISTRICTS } from './utils/constants';

export default function App() {
    const [incidents, setIncidents] = useState([]);
    const [policeStations, setPoliceStations] = useState([]);
    const [crimeStats, setCrimeStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDistrict, setSelectedDistrict] = useState('Central Delhi');

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        loadCrimeData();
    }, [selectedDistrict]);

    useEffect(() => {
        localStorage.setItem('safezone-delhi-incidents', JSON.stringify(incidents));
    }, [incidents]);

    const loadInitialData = async () => {
        setLoading(true);
        
        const stored = localStorage.getItem('safezone-delhi-incidents');
        if (stored) {
            setIncidents(JSON.parse(stored));
        }

        const stations = await fetchPoliceStations();
        setPoliceStations(stations);

        const stats = await fetchCrimeStats(selectedDistrict);
        setCrimeStats(stats);

        setLoading(false);
    };

    const loadCrimeData = async () => {
        const stats = await fetchCrimeStats(selectedDistrict);
        setCrimeStats(stats);
    };

    const handleRefresh = async () => {
        setLoading(true);
        const stations = await fetchPoliceStations();
        setPoliceStations(stations);
        await loadCrimeData();
        setLoading(false);
    };

    const handleReportSubmit = (newIncident) => {
        setIncidents([newIncident, ...incidents]);
    };

    const handleDeleteIncident = (id) => {
        setIncidents(incidents.filter(inc => inc.id !== id));
    };

    const risk = calculateRisk(crimeStats);

    if (loading) {
        return (
            <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg">Loading Delhi crime data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dark min-h-screen bg-background text-foreground p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Shield className="w-10 h-10 text-blue-500" />
                        <div>
                            <h1 className="text-4xl">SafeZone Delhi</h1>
                            <span className="text-muted-foreground">Real-time Crime Awareness & Safety Platform</span>
                        </div>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 bg-accent hover:bg-accent/80 px-4 py-2 rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh Data
                    </button>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
                    <label className="block mb-2">Select Delhi District</label>
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full md:w-auto bg-input-background border border-border rounded-lg px-4 py-3"
                    >
                        {DELHI_DISTRICTS.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                <RiskBanner 
                    risk={risk} 
                    selectedDistrict={selectedDistrict} 
                    crimeStats={crimeStats} 
                />

                <EmergencyButtons />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <ReportIncident onSubmit={handleReportSubmit} />
                        <CrimeStats crimeStats={crimeStats} selectedDistrict={selectedDistrict} />
                        <CommunityReports incidents={incidents} />
                        <RecentReports incidents={incidents} onDelete={handleDeleteIncident} />
                    </div>

                    <div className="space-y-6">
                        <PoliceStations stations={policeStations} />
                        <RiskAssessment risk={risk} selectedDistrict={selectedDistrict} crimeStats={crimeStats} />
                    </div>
                </div>
            </div>
        </div>
    );
}
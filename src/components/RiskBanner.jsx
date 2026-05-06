import { AlertTriangle } from 'lucide-react';
import { getRiskExplanation } from '../utils/riskCalculator';

export default function RiskBanner({ risk, selectedDistrict, crimeStats }) {
    return (
        <div className={`${risk.color} p-6 rounded-lg shadow-lg`}>
            <div className="flex items-center gap-4">
                <AlertTriangle className="w-8 h-8" />
                <div className="flex-1">
                    <h2 className="text-2xl mb-1">
                        {risk.emoji} {risk.level} - {selectedDistrict}
                    </h2>
                    <p className="text-sm opacity-90">
                        {getRiskExplanation(risk, selectedDistrict, crimeStats?.totalCrimes || 0)}
                    </p>
                    {crimeStats && (
                        <p className="text-xs opacity-75 mt-2">
                            Data last updated: {crimeStats.lastUpdated}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
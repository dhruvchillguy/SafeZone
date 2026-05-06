import { Phone } from 'lucide-react';

export default function EmergencyButtons() {
    const emergencyNumbers = [
        { number: '100', label: '🚨 Delhi Police (100)', color: 'bg-red-600 hover:bg-red-700' },
        { number: '1091', label: '👮 Women Helpline (1091)', color: 'bg-purple-600 hover:bg-purple-700' },
        { number: '112', label: '📞 Emergency (112)', color: 'bg-orange-600 hover:bg-orange-700' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyNumbers.map((emergency) => (
                <a
                    key={emergency.number}
                    href={`tel:${emergency.number}`}
                    className={`${emergency.color} p-6 rounded-lg flex items-center justify-center gap-3 transition-colors cursor-pointer`}
                >
                    <Phone className="w-6 h-6" />
                    <span className="text-xl">{emergency.label}</span>
                </a>
            ))}
        </div>
    );
}

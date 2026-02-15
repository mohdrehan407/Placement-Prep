import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJobDescription } from '../utils/jobAnalyzer';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Loader2 } from 'lucide-react';


export default function Analyzer() {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState('');
    const navigate = useNavigate();

    const handleJdChange = (e) => {
        const text = e.target.value;
        setJdText(text);
        if (text.length > 0 && text.trim().length < 200) {
            setWarning('This JD is too short to analyze deeply. Paste full JD for better output.');
        } else {
            setWarning('');
        }
    };

    const handleAnalyze = () => {
        if (!jdText.trim()) {
            return; // Required field
        }
        setLoading(true);

        // Simulate slight delay for "analysis" effect
        setTimeout(() => {
            const entry = analyzeJobDescription(jdText, company, role);

            // Save to History
            const existingHistory = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
            localStorage.setItem('analysisHistory', JSON.stringify([entry, ...existingHistory]));

            setLoading(false);
            navigate(`/dashboard/results/${entry.id}`);
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Placement Readiness Analyzer</h1>
                <p className="text-gray-500 mt-2">Paste a Job Description to get your personalized prep roadmap.</p>
            </div>

            <Card className="border-none shadow-xl shadow-indigo-50/50">
                <CardHeader>
                    <CardTitle className="text-xl">Job Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Company (Optional)</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="e.g. Google, Microsoft"
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)] transition-all bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Role (Optional)</label>
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="e.g. SDE-1, Frontend Lead"
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)] transition-all bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Job Description <span className="text-red-500">*</span></label>
                        <textarea
                            value={jdText}
                            onChange={handleJdChange}
                            placeholder="Paste the full job description here..."
                            rows={10}
                            required
                            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)] resize-none bg-gray-50/50 focus:bg-white transition-all"
                        />
                        <div className="flex justify-between items-center">
                            <div className="h-5">
                                {warning && (
                                    <p className="text-xs font-medium text-amber-600 animate-in fade-in slide-in-from-left-2">
                                        ⚠️ {warning}
                                    </p>
                                )}
                            </div>
                            <p className={`text-xs font-medium ${jdText.length < 200 && jdText.length > 0 ? 'text-amber-500' : 'text-gray-400'}`}>
                                {jdText.length} characters
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !jdText.trim()}
                        className="w-full py-4 bg-[hsl(245,58%,51%)] hover:bg-[hsl(245,58%,45%)] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing Requirements...
                            </>
                        ) : 'Assess My Readiness'}
                    </button>
                </CardContent>
            </Card>
        </div>
    );
}

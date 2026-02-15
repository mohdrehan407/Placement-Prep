import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { ChevronRight, CalendarDays, Briefcase } from 'lucide-react';


export default function History() {
    const [history, setHistory] = useState([]);
    const [corruptedFound, setCorruptedFound] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
        const validHistory = [];
        let hasCorrupted = false;

        saved.forEach(entry => {
            // Robustness check: Ensure entry has an ID and a score (new or old format)
            if (entry && entry.id && (entry.finalScore !== undefined || (entry.result && entry.result.score !== undefined))) {
                validHistory.push(entry);
            } else {
                hasCorrupted = true;
            }
        });

        setHistory(validHistory);
        setCorruptedFound(hasCorrupted);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analysis History</h1>
                    <p className="text-gray-500 font-medium">Review your previous preparation blueprints.</p>
                </div>
                <Link to="/dashboard/analyzer" className="px-6 py-3 bg-[hsl(245,58%,51%)] hover:bg-[hsl(245,58%,45%)] text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 hover:shadow-indigo-200 flex items-center justify-center gap-2">
                    + Start New Assessment
                </Link>
            </div>

            {corruptedFound && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-800 animate-in slide-in-from-top-2">
                    <span className="text-xl">⚠️</span>
                    <p className="text-sm font-medium">One saved entry couldn't be loaded. Create a new analysis.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.length === 0 ? (
                    <div className="text-center py-32 col-span-full bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No assessments found</h3>
                        <p className="text-gray-500 mt-1 max-w-xs mx-auto">Your journey starts with a single JD. Analyze your first one above!</p>
                    </div>
                ) : (
                    history.map((entry) => {
                        const score = entry.finalScore ?? entry.result?.score ?? 0;
                        return (
                            <Link key={entry.id} to={`/dashboard/results/${entry.id}`} className="group block">
                                <Card className="hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 relative overflow-hidden border-none shadow-md shadow-gray-100 group-hover:-translate-y-1">
                                    <div className={`absolute top-0 left-0 w-1.5 h-full ${score > 75 ? 'bg-green-500' : score > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg font-bold truncate pr-8 group-hover:text-[hsl(245,58%,51%)] transition-colors">{entry.role || 'Career Analysis'}</CardTitle>
                                        <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                                            <Briefcase className="w-4 h-4 text-gray-400" /> {entry.company || 'Direct Opportunity'}
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] text-gray-400 mb-1 font-black uppercase tracking-widest">Readiness Score</p>
                                                <span className={`text-3xl font-black ${score > 75 ? 'text-green-600' : score > 50 ? 'text-amber-500' : 'text-rose-500'}`}>{score}%</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1.5 justify-end font-medium">
                                                    <CalendarDays className="w-3.5 h-3.5" /> {new Date(entry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </p>
                                                <span className="text-[hsl(245,58%,51%)] text-xs font-bold bg-indigo-50 px-2 py-1 rounded flex items-center justify-end gap-1 group-hover:bg-[hsl(245,58%,51%)] group-hover:text-white transition-all">
                                                    Details <ChevronRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}

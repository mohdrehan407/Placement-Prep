
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Code,
    Video,
    BarChart,
    ArrowRight,
    Brain,
    Loader2,
    Sparkles
} from 'lucide-react';
import { analyzeJobDescription } from '../utils/jobAnalyzer';

export default function LandingPage() {
    const navigate = useNavigate();
    const [jdText, setJdText] = useState('');
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState('');

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
        if (!jdText.trim()) return;
        setLoading(true);

        setTimeout(() => {
            const entry = analyzeJobDescription(jdText);
            const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
            localStorage.setItem('analysisHistory', JSON.stringify([entry, ...history]));
            setLoading(false);
            navigate(`/dashboard/results/${entry.id}`);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
            {/* Navbar */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="text-2xl font-black text-indigo-600 flex items-center gap-2 tracking-tighter">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                        <Brain className="w-6 h-6" />
                    </div>
                    PlacementPrep
                </div>
                <div className="flex items-center gap-8">
                    <button onClick={() => navigate('/dashboard/history')} className="text-gray-600 hover:text-indigo-600 font-bold text-sm">Dashboard</button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl font-bold text-sm transition-all"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="pt-12 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <Sparkles className="w-3 h-3" /> AI-Powered Preparation
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tighter">
                            Ace your <span className="text-indigo-600">dream job</span> interview.
                        </h1>
                        <p className="text-xl text-gray-500 mb-10 max-w-xl leading-relaxed font-medium">
                            Stop guessing. Paste any job description to get a personalized 7-day preparation blueprint, target skills, and likely questions.
                        </p>

                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-12 h-12 rounded-full border-4 border-white bg-indigo-${i * 100 + 100} flex items-center justify-center font-bold text-white text-xs`}>
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <p className="font-black text-gray-900">Used by 2,000+ students</p>
                                <p className="text-gray-500 font-medium">from top engineering colleges</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-xl">
                        <div className="bg-white p-2 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(79,70,229,0.15)] border border-indigo-50">
                            <div className="p-8">
                                <h3 className="text-2xl font-black text-gray-900 mb-2">Instant Analysis</h3>
                                <p className="text-sm text-gray-500 font-medium mb-6">Enter JD to see your readiness score.</p>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <textarea
                                            value={jdText}
                                            onChange={handleJdChange}
                                            placeholder="Paste the Job Description here..."
                                            rows={8}
                                            required
                                            className="w-full p-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 resize-none font-medium placeholder:text-gray-400 text-gray-700 transition-all"
                                        />
                                        <div className="absolute bottom-4 left-6">
                                            {warning && (
                                                <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                                    ⚠️ {warning}
                                                </p>
                                            )}
                                        </div>
                                        <div className="absolute bottom-4 right-6 text-[10px] font-bold text-gray-400">
                                            {jdText.length} chars
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAnalyze}
                                        disabled={loading || !jdText.trim()}
                                        className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-200 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                Generate Roadmap
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Integration Section */}
                <section className="py-24 px-6 bg-indigo-600 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        <div className="bg-white/10 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-white">
                                <Code className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">Skill Extraction</h3>
                            <p className="text-indigo-100 font-medium leading-relaxed">Automatically identifies core CS, languages, and web technologies from any text block.</p>
                        </div>

                        <div className="bg-white/10 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-white">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">7-Day Blitz</h3>
                            <p className="text-indigo-100 font-medium leading-relaxed">A custom calendar showing exactly what to study each day to maximize your success probability.</p>
                        </div>

                        <div className="bg-white/10 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-white">
                                <BarChart className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">Readiness Score</h3>
                            <p className="text-indigo-100 font-medium leading-relaxed">Our proprietary algorithm calculates your success odds based on job requirements vs your mastered skills.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-indigo-600 font-black text-xl tracking-tighter">
                        <Brain className="w-6 h-6" />
                        PlacementPrep
                    </div>
                    <p className="text-gray-400 font-medium text-sm">© 2026 PlacementPrep Global. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-gray-400 hover:text-indigo-600 font-bold transition-colors cursor-pointer text-sm">Terms</span>
                        <span className="text-gray-400 hover:text-indigo-600 font-bold transition-colors cursor-pointer text-sm">Privacy</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

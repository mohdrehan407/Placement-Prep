import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, CircleDashed, Loader2, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';


export default function Results() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = () => {
        const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
        const entry = history.find(e => e.id === id);
        if (entry) {
            setData(entry);
        }
    };

    const toggleSkill = (skill) => {
        if (!data || isUpdating) return;

        const currentMap = { ...data.skillConfidenceMap };
        const newStatus = currentMap[skill] === 'know' ? 'practice' : 'know';
        currentMap[skill] = newStatus;

        // Calculate new final score
        // Rule: Each "know" skill contributes slightly more to final score relative to baseScore
        const allSkills = Object.values(data.extractedSkills).flat();
        const knownCount = allSkills.filter(s => currentMap[s] === 'know').length;

        // Dynamic score calculation: baseScore + (percentage of known skills * potential upside)
        const upsidePotential = 100 - data.baseScore;
        const progressFactor = allSkills.length > 0 ? (knownCount / allSkills.length) : 0;
        const newFinalScore = Math.min(100, Math.round(data.baseScore + (upsidePotential * progressFactor)));

        const updatedEntry = {
            ...data,
            skillConfidenceMap: currentMap,
            finalScore: newFinalScore,
            updatedAt: new Date().toISOString()
        };

        // Persist to localStorage
        const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
        const index = history.findIndex(e => e.id === id);
        if (index !== -1) {
            history[index] = updatedEntry;
            localStorage.setItem('analysisHistory', JSON.stringify(history));
            setData(updatedEntry);

            // Visual feedback
            setIsUpdating(true);
            setTimeout(() => setIsUpdating(false), 500);
        }
    };

    if (!data) return (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Crunching your results...</p>
        </div>
    );

    const {
        finalScore,
        baseScore,
        extractedSkills,
        plan7Days,
        checklist,
        questions,
        company,
        role,
        skillConfidenceMap,
        updatedAt
    } = data;

    return (
        <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Link to="/dashboard/analyzer" className="p-3 hover:bg-gray-100 rounded-xl transition-colors w-fit">
                    <ChevronLeft className="w-6 h-6 text-gray-500" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Readiness Roadmap</h1>
                    <p className="text-gray-500 font-medium">
                        {role || 'Candidate'} at {company || 'Target Company'}
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm">Updated {new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                </div>
                <div className="flex items-center gap-6 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Success Probability</p>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-4xl font-black ${finalScore > 75 ? 'text-green-600' : finalScore > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                                {finalScore}%
                            </span>
                            <span className="text-sm font-bold text-gray-400">/ 100</span>
                        </div>
                    </div>
                    <div className="w-16 h-16 relative">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent"
                                strokeDasharray={2 * Math.PI * 28}
                                strokeDashoffset={2 * Math.PI * 28 * (1 - finalScore / 100)}
                                className={`${finalScore > 75 ? 'text-green-600' : finalScore > 50 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
                                strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 1. Skill Extraction & Confidence */}
            <Card className="border-none shadow-lg shadow-indigo-50/20">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-end">
                        <div>
                            <CardTitle className="text-xl">Requirements & Readiness</CardTitle>
                            <CardDescription>Toggle skills you've mastered to see your score improve.</CardDescription>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-gray-400 uppercase">Base Score: {baseScore}%</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {Object.entries(extractedSkills).map(([category, tags]) => (
                            tags.length > 0 && (
                                <div key={category} className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 hover:border-indigo-100 transition-colors">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{category}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map(tag => {
                                            const isKnown = skillConfidenceMap[tag] === 'know';
                                            return (
                                                <button
                                                    key={tag}
                                                    onClick={() => toggleSkill(tag)}
                                                    className={`group px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 border ${isKnown
                                                        ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
                                                        : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
                                                        }`}
                                                >
                                                    {isKnown ? <CheckCircle2 className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-400" />}
                                                    {tag}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                    {Object.values(extractedSkills).flat().length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500 italic">No specific technical markers found. Following general competency framework.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 2. 7-Day Plan */}
            <Card className="border-none shadow-lg shadow-indigo-50/20">
                <CardHeader>
                    <CardTitle className="text-xl">7-Day Blitz Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative space-y-0">
                        {plan7Days.map((item, idx) => (
                            <div key={idx} className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm border ${idx === 0 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-100'}`}>
                                        {item.day.replace('Day ', '')}
                                    </div>
                                    {idx !== plan7Days.length - 1 && <div className="w-0.5 h-full bg-gray-100 my-1"></div>}
                                </div>
                                <div className="pb-10 pt-1">
                                    <h4 className="font-bold text-gray-900 text-lg mb-1">{item.focus}</h4>
                                    <ul className="space-y-1.5">
                                        {item.tasks.map((task, ti) => (
                                            <li key={ti} className="text-gray-600 flex items-start gap-2 text-sm leading-relaxed">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-200 flex-shrink-0"></span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                {/* 3. Checklist */}
                <Card className="border-none shadow-lg shadow-indigo-50/20">
                    <CardHeader>
                        <CardTitle className="text-xl">Interview Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {checklist.map((round, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">{round.roundTitle}</h4>
                                    </div>
                                    <ul className="space-y-3 ml-4">
                                        {round.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 group">
                                                <div className="mt-1 w-4 h-4 rounded border border-gray-300 flex-shrink-0 group-hover:border-indigo-400 transition-colors"></div>
                                                <span className="text-sm text-gray-600 leading-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Interview Questions */}
                <Card className="border-none shadow-xl shadow-indigo-50/30 bg-indigo-600 text-white">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">Expert Question Bank</CardTitle>
                        <CardDescription className="text-indigo-100">Top 10 questions targeted for this role.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {questions.map((q, i) => (
                                <div key={i} className="flex gap-4 items-start p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all">
                                    <span className="flex-shrink-0 w-8 h-8 bg-white/20 text-white rounded-lg flex items-center justify-center text-xs font-black">
                                        {i + 1}
                                    </span>
                                    <p className="text-white text-sm font-semibold leading-relaxed">{q}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}

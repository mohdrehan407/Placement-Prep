import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, AlertTriangle, RotateCcw, ArrowRight, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const TEST_ITEMS = [
    { id: 1, label: "JD required validation works", hint: "Try submitting an empty JD on the home or analyzer page." },
    { id: 2, label: "Short JD warning shows for <200 chars", hint: "Paste a few words in the JD box and check if the amber warning appears." },
    { id: 3, label: "Skills extraction groups correctly", hint: "Analyze a JD with Java, React, and SQL. Check if they appear in correct categories." },
    { id: 4, label: "Round mapping changes based on company + skills", hint: "Add a company name and specific skills; verify Round 3 mentions them." },
    { id: 5, label: "Score calculation is deterministic", hint: "Analyze the same JD twice; the Base Score should be identical." },
    { id: 6, label: "Skill toggles update score live", hint: "Toggle a skill in the results page; the success probability should increase immediately." },
    { id: 7, label: "Changes persist after refresh", hint: "Mark a skill as mastered, refresh the results page, and verify it's still checked." },
    { id: 8, label: "History saves and loads correctly", hint: "Analyze a JD, go to the History tab, and check if the entry exists." },
    { id: 9, label: "Export buttons copy the correct content", hint: "Future feature or verify any copy-to-clipboard functionality if implemented." },
    { id: 10, label: "No console errors on core pages", hint: "Open DevTools and browse Home, Analyzer, Results, and History." },
];

export default function PRPTest() {
    const [checkedItems, setCheckedItems] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('prp_test_checklist') || '{}');
        setCheckedItems(saved);
    }, []);

    const toggleItem = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem('prp_test_checklist', JSON.stringify(newChecked));
    };

    const resetChecklist = () => {
        setCheckedItems({});
        localStorage.removeItem('prp_test_checklist');
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const allPassed = passedCount === TEST_ITEMS.length;

    return (
        <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">PRP Quality Assurance</h1>
                        <p className="text-gray-500 font-medium mt-2">Verification checklist for Placement Readiness Platform</p>
                    </div>
                    <button
                        onClick={resetChecklist}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset Checklist
                    </button>
                </div>

                {/* Summary Card */}
                <Card className={`border-2 transition-all ${allPassed ? 'border-green-500 bg-green-50/30' : 'border-amber-200 bg-amber-50/30'}`}>
                    <CardContent className="p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${allPassed ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
                                    <ClipboardCheck className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900">Tests Passed: {passedCount} / {TEST_ITEMS.length}</h3>
                                    {!allPassed ? (
                                        <p className="text-amber-700 font-bold flex items-center gap-1.5 mt-1">
                                            <AlertTriangle className="w-4 h-4" />
                                            Fix issues before shipping.
                                        </p>
                                    ) : (
                                        <p className="text-green-700 font-bold mt-1">Ready for deployment!</p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/prp/08-ship')}
                                disabled={!allPassed}
                                className={`px-8 py-3 rounded-2xl font-black flex items-center gap-2 transition-all ${allPassed
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Ship Platform
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Test Items */}
                <div className="grid gap-4">
                    {TEST_ITEMS.map((item) => (
                        <Card
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`cursor-pointer transition-all border-none shadow-sm hover:shadow-md ${checkedItems[item.id] ? 'bg-white opacity-100' : 'bg-white opacity-80'
                                }`}
                        >
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className={`mt-1 flex-shrink-0 transition-colors ${checkedItems[item.id] ? 'text-green-500' : 'text-gray-300'}`}>
                                    {checkedItems[item.id] ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-lg font-bold transition-all ${checkedItems[item.id] ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {item.label}
                                    </h4>
                                    <p className="text-sm text-gray-400 font-medium mt-1">
                                        {item.hint}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck,
    Link as LinkIcon,
    Github,
    Globe,
    CheckCircle2,
    Circle,
    Copy,
    Check,
    Lock,
    Unlock,
    Rocket,
    ExternalLink,
    ChevronLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const STEPS = [
    { id: '01', title: 'Problem Framework', description: 'Define user needs and core value proposition.' },
    { id: '02', title: 'Solution Architecture', description: 'System design and frontend/data flow mapping.' },
    { id: '03', title: 'Core Skill Engine', description: 'Keyword extraction and categorization logic.' },
    { id: '04', title: 'Preparation Logic', description: 'Generating plans, checklists and round maps.' },
    { id: '05', title: 'Premium UI/UX', description: 'Implementing state-of-the-art SaaS aesthetics.' },
    { id: '06', title: 'History & Stability', description: 'LocalStorage persistence and schema hardening.' },
    { id: '07', title: 'Quality Assurance', description: '10-point benchmark checklist verification.' },
    { id: '08', title: 'Final Deployment', description: 'Live artifact generation and shipping.' }
];

export default function PRPProof() {
    const navigate = useNavigate();
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    });
    const [checklistPassed, setChecklistPassed] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const savedLinks = JSON.parse(localStorage.getItem('prp_final_submission') || '{}');
        if (savedLinks.lovable || savedLinks.github || savedLinks.deployed) {
            setLinks({
                lovable: savedLinks.lovable || '',
                github: savedLinks.github || '',
                deployed: savedLinks.deployed || ''
            });
        }

        const savedChecklist = JSON.parse(localStorage.getItem('prp_test_checklist') || '{}');
        const passedTotal = Object.values(savedChecklist).filter(Boolean).length;
        setChecklistPassed(passedTotal);
    }, []);

    const handleLinkChange = (key, value) => {
        const newLinks = { ...links, [key]: value };
        setLinks(newLinks);
        localStorage.setItem('prp_final_submission', JSON.stringify(newLinks));
    };

    const isValidUrl = (url) => {
        try {
            const parsed = new URL(url);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
            return false;
        }
    };

    const allChecklistPassed = checklistPassed === 10;
    const allLinksProvided = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployed);
    const allStepsCompleted = allChecklistPassed && allLinksProvided;

    // Status Logic
    const isStepCompleted = (id) => {
        if (parseInt(id) < 7) return true; // Steps 1-6 are the platform features we built
        if (id === '07') return allChecklistPassed;
        if (id === '08') return allLinksProvided;
        return false;
    };

    const isShipped = allStepsCompleted;

    const copySubmission = () => {
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] pb-24">
            {/* Top Navigation */}
            <nav className="p-6 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-50">
                <button
                    onClick={() => navigate('/prp/07-test')}
                    className="flex items-center gap-2 text-gray-500 font-bold hover:text-indigo-600 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Testing
                </button>
                <div className="flex items-center gap-3">
                    <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isShipped ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {isShipped ? <Rocket className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        Status: {isShipped ? 'Shipped' : 'In Progress'}
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Project Proof of Work</h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Verify completion of the 8-step build track and provide final artifact links for submission.</p>
                </div>

                {isShipped && (
                    <Card className="border-2 border-green-500 bg-green-50/50 animate-in zoom-in duration-500">
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-20 h-20 bg-green-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-green-100">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900">Official Certification</h2>
                            <p className="text-lg text-green-800 font-medium leading-relaxed italic">
                                "You built a real product. Not a tutorial. Not a clone. A structured tool that solves a real problem. This is your proof of work."
                            </p>
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Step Completion */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                            Build Track Status
                        </h3>
                        <div className="grid gap-3">
                            {STEPS.map((step) => {
                                const completed = isStepCompleted(step.id);
                                return (
                                    <div key={step.id} className={`p-4 rounded-2xl border transition-all ${completed ? 'bg-white border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                                                {step.id}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-black text-sm ${completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</h4>
                                                <p className="text-[10px] text-gray-400 font-medium">{step.description}</p>
                                            </div>
                                            {completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-300" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Artifact Links */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                            <LinkIcon className="w-6 h-6 text-indigo-600" />
                            Artifact Submission
                        </h3>
                        <div className="space-y-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-indigo-500" />
                                    Lovable Project URL
                                </label>
                                <input
                                    type="url"
                                    value={links.lovable}
                                    onChange={(e) => handleLinkChange('lovable', e.target.value)}
                                    placeholder="https://lovable.dev/projects/..."
                                    className={`w-full p-3.5 border rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 transition-all font-medium text-sm ${isValidUrl(links.lovable) ? 'border-green-200 focus:ring-green-500' : 'border-gray-100 focus:ring-indigo-600'}`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Github className="w-4 h-4 text-gray-900" />
                                    GitHub Repository URL
                                </label>
                                <input
                                    type="url"
                                    value={links.github}
                                    onChange={(e) => handleLinkChange('github', e.target.value)}
                                    placeholder="https://github.com/user/repo"
                                    className={`w-full p-3.5 border rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 transition-all font-medium text-sm ${isValidUrl(links.github) ? 'border-green-200 focus:ring-green-500' : 'border-gray-100 focus:ring-indigo-600'}`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Rocket className="w-4 h-4 text-rose-500" />
                                    Live Deployment URL
                                </label>
                                <input
                                    type="url"
                                    value={links.deployed}
                                    onChange={(e) => handleLinkChange('deployed', e.target.value)}
                                    placeholder="https://my-app.vercel.app"
                                    className={`w-full p-3.5 border rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 transition-all font-medium text-sm ${isValidUrl(links.deployed) ? 'border-green-200 focus:ring-green-500' : 'border-gray-100 focus:ring-indigo-600'}`}
                                />
                            </div>

                            <div className="pt-4 space-y-4">
                                <button
                                    onClick={copySubmission}
                                    disabled={!isShipped}
                                    className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all ${isShipped
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    Copy Final Submission
                                </button>

                                {!allStepsCompleted && (
                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                                        <Lock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                        <p className="text-[10px] text-amber-800 font-bold leading-tight">
                                            Completion requirements: <br />
                                            - All 10 checklist items must be passed.<br />
                                            - All 3 artifact links must be valid URLs.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

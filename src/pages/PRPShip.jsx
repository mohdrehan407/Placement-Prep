import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, CheckCircle2, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function PRPShip() {
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('prp_test_checklist') || '{}');
        const passedCount = Object.values(saved).filter(Boolean).length;
        if (passedCount < 10) {
            navigate('/prp/07-test');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6">
            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="relative inline-block">
                    <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 animate-bounce">
                        <Rocket className="w-16 h-16" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full border-4 border-white">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Mission Accomplished!</h1>
                    <p className="text-xl text-gray-500 font-medium">Placement Readiness Platform has passed all quality gates.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <Card className="border-none shadow-xl shadow-indigo-50/50 bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <h3 className="font-black text-gray-900">Quality Assured</h3>
                            </div>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">All 10 benchmark tests passed. Data model hardened and schemas consistent.</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-indigo-50/50 bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Rocket className="w-5 h-5" />
                                </div>
                                <h3 className="font-black text-gray-900">Ready to Launch</h3>
                            </div>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">Responsive design optimized. Offline persistence via localStorage confirmed.</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                    <Link
                        to="/prp/proof"
                        className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2"
                    >
                        Generate Proof of Work
                        <ExternalLink className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={() => navigate('/prp/07-test')}
                        className="flex items-center gap-2 text-gray-500 font-bold hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Test Checklist
                    </button>
                </div>
            </div>
        </div>
    );
}

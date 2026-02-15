export default function Assessments() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between h-48">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Aptitude Test</h3>
                        <p className="text-gray-600 mb-4">60 mins • 30 Questions • General Logic & Math</p>
                    </div>
                    <button className="self-start px-4 py-2 bg-[hsl(245,58%,51%)] text-white rounded hover:bg-[hsl(245,58%,45%)] transition-colors">Start Test</button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between h-48">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Java Core Basics</h3>
                        <p className="text-gray-600 mb-4">45 mins • 20 Questions • OOPs & Syntax</p>
                    </div>
                    <button className="self-start px-4 py-2 bg-[hsl(245,58%,51%)] text-white rounded hover:bg-[hsl(245,58%,45%)] transition-colors">Start Test</button>
                </div>
            </div>
        </div>
    );
}

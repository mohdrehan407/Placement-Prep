export default function Resources() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-32 bg-indigo-100 flex items-center justify-center text-[hsl(245,58%,51%)] font-bold text-lg">
                        Data Structures
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">DSA Masterclass</h3>
                        <p className="text-gray-600 mb-4 h-12 overflow-hidden">Comprehensive guide to lists, trees, graphs...</p>
                        <button className="text-[hsl(245,58%,51%)] font-medium hover:underline">Watch Video</button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-32 bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                        System Design
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Scalable Systems</h3>
                        <p className="text-gray-600 mb-4 h-12 overflow-hidden">Designing large scale distributed systems...</p>
                        <button className="text-[hsl(245,58%,51%)] font-medium hover:underline">Read Guide</button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-32 bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-lg">
                        Interview Tips
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Behavioral Q&A</h3>
                        <p className="text-gray-600 mb-4 h-12 overflow-hidden">How to tackle HR rounds and cultural fit...</p>
                        <button className="text-[hsl(245,58%,51%)] font-medium hover:underline">View Article</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

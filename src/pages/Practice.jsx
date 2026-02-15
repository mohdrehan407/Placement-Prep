export default function Practice() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Practice Problems</h1>
                <button className="bg-[hsl(245,58%,51%)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[hsl(245,58%,45%)] transition-colors">
                    Suggest a Problem
                </button>
            </div>

            <div className="grid gap-4">
                {/* Filter Section */}
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search problems..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select className="p-3 border border-gray-300 rounded-lg bg-white">
                        <option>All Topics</option>
                        <option>Arrays</option>
                        <option>Strings</option>
                        <option>Linked Lists</option>
                    </select>
                    <select className="p-3 border border-gray-300 rounded-lg bg-white">
                        <option>All Difficulties</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>

                {/* Problem List Placeholder */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50 bg-green-50/30">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="font-medium text-gray-900">1. Two Sum</span>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Easy</span>
                        </div>
                        <button className="text-[hsl(245,58%,51%)] font-medium">Solve</button>
                    </div>
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                            <span className="font-medium text-gray-900">2. Add Two Numbers</span>
                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Medium</span>
                        </div>
                        <button className="text-[hsl(245,58%,51%)] font-medium">Solve</button>
                    </div>
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                            <span className="font-medium text-gray-900">3. Longest Substring Without Repeating Characters</span>
                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Medium</span>
                        </div>
                        <button className="text-[hsl(245,58%,51%)] font-medium">Solve</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

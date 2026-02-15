export default function Profile() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex items-center gap-8 mb-8">
                <div className="w-24 h-24 bg-[hsl(245,58%,51%)] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    AJ
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Alex Johnson</h2>
                    <p className="text-gray-500">Computer Science • Batch 2026</p>
                    <div className="flex gap-4 mt-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Ready for Placement</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">Full Stack</span>
                    </div>
                </div>
                <button className="ml-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Edit Profile</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Academic Details</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <p className="text-gray-500">University</p>
                    <p className="font-medium">KodNest Technical Institute</p>

                    <p className="text-gray-500">CGPA</p>
                    <p className="font-medium">8.9</p>

                    <p className="text-gray-500">Skills</p>
                    <p className="font-medium">React, Node.js, Java, SQL</p>
                </div>
            </div>
        </div>
    );
}

import { useNavigate } from "react-router-dom";

export default function Hero (){
  const navigate=useNavigate();
    return (
         <section className="relative pt-32 pb-20 px-6 z-10" data-aos="fade-down"
      data-aos-duration="1000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm mb-6">
              <span className="animate-pulse"></span>
              <span>New: AI-Powered Project Insights</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Work Smarter,<br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Collaborate Better
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              The all-in-one platform for teams to plan, track, and deliver exceptional work together
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all hover:-translate-y-1"
             >
                 Join as a Team Lead
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-1 shadow-sm"
               onClick={()=>navigate("/registerMember")}>
                Join as a Team Member
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-100/20 to-transparent blur-2xl"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 overflow-hidden">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 mx-4">
                    CollabHub.com
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                      <div className="text-blue-600 text-sm font-semibold mb-1">ACTIVE PROJECTS</div>
                      <div className="text-3xl font-bold text-gray-900">24</div>
                      <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                      <div className="text-purple-600 text-sm font-semibold mb-1">TEAM MEMBERS</div>
                      <div className="text-3xl font-bold text-gray-900">156</div>
                      <div className="mt-3 h-2 bg-purple-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                      <div className="text-green-600 text-sm font-semibold mb-1">COMPLETED</div>
                      <div className="text-3xl font-bold text-gray-900">1,247</div>
                      <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Task List Preview */}
                  <div className="space-y-3">
                    {[
                      { title: 'Design new landing page', status: 'In Progress', color: 'bg-blue-100 text-blue-700' },
                      { title: 'Review Q4 marketing strategy', status: 'Review', color: 'bg-yellow-100 text-yellow-700' },
                      { title: 'Update API documentation', status: 'Completed', color: 'bg-green-100 text-green-700' }
                    ].map((task, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
                          <span className="font-medium text-gray-900">{task.title}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.color}`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
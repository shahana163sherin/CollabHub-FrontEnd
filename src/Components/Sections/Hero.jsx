import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative pt-48 pb-32 px-6 z-10 overflow-hidden" data-aos="fade-down" data-aos-duration="1000">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-4xl mx-auto mb-24 animate-slideDown">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-medium text-sm mb-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>New: AI-Powered Project Insights</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
            Work Smarter,<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent">
              Collaborate Better
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 mb-14 leading-loose max-w-2xl mx-auto">
            The all-in-one platform for modern teams to plan, track, and deliver exceptional work together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button variant="primary" size="lg" className="group" onClick={() => navigate("/registerLeader")}>
              Join as a Team Lead
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            <Button variant="secondary" size="lg" className="group hover:border-emerald-500/50" onClick={() => navigate("/registerMember")}>
              Join as a Team Member
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-zinc-500">
            {['Free to use', 'No credit card required', 'Cancel anytime'].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="relative max-w-5xl mx-auto animate-float">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-zinc-700 to-zinc-900 overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
              {/* Browser Chrome */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="flex-1 max-w-md mx-auto bg-zinc-950 rounded-md px-3 py-1.5 border border-zinc-800 text-xs text-zinc-500 text-center flex items-center justify-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  collabhub.com/dashboard
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-zinc-950">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card hover={false} className="border-emerald-500/20 bg-emerald-500/5">
                    <div className="text-emerald-400 text-xs font-bold tracking-wider mb-2">ACTIVE PROJECTS</div>
                    <div className="text-4xl font-black text-white mb-4">24</div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-3/4"></div>
                    </div>
                  </Card>
                  <Card hover={false} className="border-amber-500/20 bg-amber-500/5">
                    <div className="text-amber-400 text-xs font-bold tracking-wider mb-2">TEAM MEMBERS</div>
                    <div className="text-4xl font-black text-white mb-4">156</div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full w-[90%]"></div>
                    </div>
                  </Card>
                  <Card hover={false} className="border-teal-500/20 bg-teal-500/5">
                    <div className="text-teal-400 text-xs font-bold tracking-wider mb-2">COMPLETED TASK</div>
                    <div className="text-4xl font-black text-white mb-4">1,247</div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full w-[95%]"></div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-3">
                  {[
                    { title: 'Design new landing page', status: 'In Progress', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' },
                    { title: 'Review Q4 marketing strategy', status: 'Review', color: 'border-amber-500/50 text-amber-400 bg-amber-500/10' },
                    { title: 'Update API documentation', status: 'Completed', color: 'border-teal-500/50 text-teal-400 bg-teal-500/10' }
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded border border-zinc-600"></div>
                        <span className="font-medium text-zinc-200">{task.title}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${task.color}`}>
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
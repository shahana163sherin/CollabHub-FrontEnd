import Card from "../UI/Card";

export default function Features() {
  return (
    <section id="features" className="relative py-32 px-6 z-10" data-aos="fade-up" data-aos-duration="1000">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-slideDown">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Everything your team <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">needs</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Powerful features designed to streamline your workflow and boost productivity in a modern environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              ),
              title: 'Task Management',
              desc: 'Create, assign, and track tasks with ease. Set priorities, deadlines, and dependencies effortlessly.'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              ),
              title: 'Team Collaboration',
              desc: 'Real-time syncing and comprehensive dashboards keep everyone on the same page, always.'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              ),
              title: 'Visual Dashboards',
              desc: 'Beautiful charts and intuitive reports give you instant actionable insights into project progress.'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              ),
              title: 'Smart Notifications',
              desc: 'Stay updated with intelligent alerts that keep you informed without overwhelming your workflow.'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              ),
              title: 'Automated Status',
              desc: 'Keep everyone informed automatically as tasks progress seamlessly through their lifecycle.'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              ),
              title: 'AI Task Reassignment',
              desc: 'Automatically reassign tasks to the best-suited team member using intelligent AI suggestions.'
            }
          ].map((feature, idx) => (
            <Card key={idx} hover={true} className="group flex flex-col items-start text-left p-10">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-5 group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
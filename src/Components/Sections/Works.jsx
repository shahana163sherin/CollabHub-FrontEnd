export default function Works() {
  return (
    <section className="relative py-32 px-6 z-10 bg-zinc-950" data-aos="fade-down" data-aos-duration="1200">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzZjNmNDYiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0dj1oMnYyaC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Get started in <span className="text-emerald-400">minutes</span>
          </h2>
          <p className="text-xl text-zinc-400">
            Simple setup, powerful results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: '01',
              title: 'Create Your Workspace',
              desc: 'Sign up and set up your team workspace in seconds. Invite team members and customize your settings.',
              color: 'text-emerald-500'
            },
            {
              step: '02',
              title: 'Add Your Projects',
              desc: 'Create projects, break them down into tasks, and organize everything with boards, lists, or timelines.',
              color: 'text-teal-500'
            },
            {
              step: '03',
              title: 'Collaborate & Deliver',
              desc: 'Work together in real-time, track progress, and deliver exceptional results on schedule.',
              color: 'text-amber-500'
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-zinc-900/60 backdrop-blur-sm rounded-3xl p-10 border border-zinc-800/80 shadow-xl hover:shadow-2xl hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className={`text-6xl font-black ${item.color} opacity-40 mb-6 group-hover:opacity-100 group-hover:scale-110 transition-all origin-left`}>
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold text-zinc-100 mb-4">{item.title}</h3>
                <p className="text-lg font-medium text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function SocialProof() {
  return (
    <section className="relative py-24 px-6 z-10 bg-zinc-950 border-y border-zinc-800/50" data-aos="fade-down" data-aos-duration="1000">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-zinc-500 text-sm font-bold tracking-widest mb-10">
          TRUSTED BY LEADING TEAMS WORLDWIDE
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {['TechCorp', 'StartupHub', 'DesignCo', 'DataFlow', 'CloudSync'].map((company, idx) => (
            <div key={idx} className="text-2xl font-black text-zinc-400 tracking-tighter hover:text-emerald-400 transition-colors">
              {company}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-3xl font-bold text-zinc-100">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">50,000+ </span>
            <span className="text-zinc-500 font-medium">teams collaborate daily</span>
          </p>
        </div>
      </div>
    </section>
  );
}
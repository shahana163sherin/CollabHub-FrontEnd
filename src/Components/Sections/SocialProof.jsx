export default function SocialProof (){
    return (
         <section className="relative py-16 px-6 z-10 bg-white border-y border-gray-200"data-aos="fade-down"
      data-aos-duration="1000">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-500 text-sm font-medium mb-8">TRUSTED BY LEADING TEAMS WORLDWIDE</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {['TechCorp', 'StartupHub', 'DesignCo', 'DataFlow', 'CloudSync'].map((company, idx) => (
              <div key={idx} className="text-2xl font-bold text-gray-400">{company}</div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-3xl font-bold text-gray-900">50,000+ <span className="text-gray-600 font-normal">teams collaborate daily</span></p>
          </div>
        </div>
      </section>
    );
}
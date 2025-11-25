export default function CTA(){
    return (
        <section className="relative py-24 px-6 z-10 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your team's workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of teams already working smarter with CollabHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Start Free Trial
            </button>
            {/* <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-1">
              Schedule Demo
            </button> */}
          </div>
        </div>
      </section>
    );
}
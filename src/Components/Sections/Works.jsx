export default function Works(){
return (

     <section className="relative py-24 px-6 z-10 bg-gradient-to-b from-blue-50 to-white"data-aos="fade-down"
      data-aos-duration="1200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get started in minutes
            </h2>
            <p className="text-xl text-gray-600">
              Simple setup, powerful results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Workspace',
                desc: 'Sign up and set up your team workspace in seconds. Invite team members and customize your settings.'
              },
              {
                step: '02',
                title: 'Add Your Projects',
                desc: 'Create projects, break them down into tasks, and organize everything with boards, lists, or timelines.'
              },
              {
                step: '03',
                title: 'Collaborate & Deliver',
                desc: 'Work together in real-time, track progress, and deliver exceptional results on schedule.'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-5xl font-black text-blue-400 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import githubIcon from '../../assets/Images/github.png';
export default function Features(){
    return (
         <section id="features" className="relative py-24 px-6 z-10"data-aos="fade-right"
      data-aos-duration="1000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything your team needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and boost productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon:<img src='src/assets/Images/Task Management Software.png'/> ,
                title: 'Task Management',
                desc: 'Create, assign, and track tasks with ease. Set priorities, deadlines, and dependencies.',
                // color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <img src='src/assets/Images/team.png'/> ,
                title: 'Team Collaboration',
                desc: 'Real-time chat, file sharing, and comments keep everyone on the same page.',
                // color: 'from-purple-500 to-purple-600'
              },
              {
                icon: <img src='src/assets/Images/visual-data.png'/> ,
                title: 'Visual Dashboards',
                desc: 'Beautiful charts and reports give you instant insights into project progress.',
                // color: 'from-green-500 to-green-600'
              },
              {
                icon: <img src='src/assets/Images/notification-bell.png'width={100}/>,
                title: 'Smart Notifications',
                desc: 'Stay updated with intelligent alerts that keep you informed without overwhelming.',
                // color: 'from-orange-500 to-orange-600'
              },
              {
                icon: <img src='src/assets/Images/progress.png' width={200}/>,
                title: 'Automated Status Updates',
                desc: 'Keep everyone informed automatically as tasks progress, without manual updates.'
              },

             {
                icon: <img src='src/assets/Images/productivity.png'/>,
                title: 'AI Task Reassignment',
                desc: 'Automatically reassign tasks to the best-suited team member using AI suggestions.'
             }

            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
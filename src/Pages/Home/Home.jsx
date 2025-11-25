// import React, { useState, useEffect } from 'react';

import Footer from "../../Components/Layout/Footer";
import NavBar from "../../Components/Layout/NavBar";
import CTA from "../../Components/Sections/CTA";
import Features from "../../Components/Sections/Features";
import Hero from "../../Components/Sections/Hero";
import SocialProof from "../../Components/Sections/SocialProof";
import Works from "../../Components/Sections/Works";

// export default function CollabHub() {
//   const [scrollY, setScrollY] = useState(0);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 overflow-x-hidden">
//       {/* Subtle Background Pattern */}
//       <div className="fixed inset-0 z-0 opacity-30">
//         <div 
//           className="absolute inset-0"
//           style={{
//             backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(203 213 225) 1px, transparent 0)',
//             backgroundSize: '40px 40px'
//           }}
//         ></div>
//       </div>

//       {/* Floating Gradient Orbs */}
//       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
//         <div 
//           className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"
//           style={{ top: '10%', right: '10%' }}
//         ></div>
//         <div 
//           className="absolute w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-20"
//           style={{ bottom: '20%', left: '10%' }}
//         ></div>
//       </div>

//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//            <img src='src/assets/Images/Logo (2).jpg ' width={300 }></img>
//             {/* <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
//               CollabHub
//             </span> */}
//           </div>
          
//           <div className="hidden md:flex items-center gap-6">
//             <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
//             <a href="#solutions" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Solutions</a>
//             <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</a>
//             <a href="#resources" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Resources</a>
//             <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all">
//               Sign In
//             </button>
//             <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
//               Get Started
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button className="md:hidden p-2">
//             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative pt-32 pb-20 px-6 z-10">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center max-w-4xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm mb-6">
//               <span className="animate-pulse"></span>
//               <span>New: AI-Powered Project Insights</span>
//             </div>
            
//             <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
//               Work Smarter,<br />
//               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 Collaborate Better
//               </span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
//               The all-in-one platform for teams to plan, track, and deliver exceptional work together
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
//               <button className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all hover:-translate-y-1">
//                  Join as a Team Lead
//                 <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
//               </button>
//               <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-1 shadow-sm">
//                 Join as aTeam Member
//               </button>
//             </div>

//             {/* Trust Badges */}
//             <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
//               <div className="flex items-center gap-2">
//                 <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>Free to use</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>No credit card required</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>Cancel anytime</span>
//               </div>
//             </div>
//           </div>

//           {/* Hero Image/Dashboard Preview */}
//           <div className="relative max-w-5xl mx-auto">
//             <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-100/20 to-transparent blur-2xl"></div>
//             <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 overflow-hidden">
//               <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
//                 {/* Browser Chrome */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="flex gap-1.5">
//                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
//                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
//                   </div>
//                   <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 mx-4">
//                     CollabHub.com
//                   </div>
//                 </div>

//                 {/* Dashboard Content */}
//                 <div className="bg-white rounded-lg p-6 shadow-lg">
//                   <div className="grid md:grid-cols-3 gap-4 mb-6">
//                     <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
//                       <div className="text-blue-600 text-sm font-semibold mb-1">ACTIVE PROJECTS</div>
//                       <div className="text-3xl font-bold text-gray-900">24</div>
//                       <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
//                       </div>
//                     </div>
//                     <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
//                       <div className="text-purple-600 text-sm font-semibold mb-1">TEAM MEMBERS</div>
//                       <div className="text-3xl font-bold text-gray-900">156</div>
//                       <div className="mt-3 h-2 bg-purple-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-purple-600 rounded-full" style={{ width: '90%' }}></div>
//                       </div>
//                     </div>
//                     <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
//                       <div className="text-green-600 text-sm font-semibold mb-1">COMPLETED</div>
//                       <div className="text-3xl font-bold text-gray-900">1,247</div>
//                       <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-green-600 rounded-full" style={{ width: '95%' }}></div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Task List Preview */}
//                   <div className="space-y-3">
//                     {[
//                       { title: 'Design new landing page', status: 'In Progress', color: 'bg-blue-100 text-blue-700' },
//                       { title: 'Review Q4 marketing strategy', status: 'Review', color: 'bg-yellow-100 text-yellow-700' },
//                       { title: 'Update API documentation', status: 'Completed', color: 'bg-green-100 text-green-700' }
//                     ].map((task, idx) => (
//                       <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
//                         <div className="flex items-center gap-3">
//                           <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
//                           <span className="font-medium text-gray-900">{task.title}</span>
//                         </div>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.color}`}>
//                           {task.status}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Proof */}
//       <section className="relative py-16 px-6 z-10 bg-white border-y border-gray-200">
//         <div className="max-w-7xl mx-auto">
//           <p className="text-center text-gray-500 text-sm font-medium mb-8">TRUSTED BY LEADING TEAMS WORLDWIDE</p>
//           <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
//             {['TechCorp', 'StartupHub', 'DesignCo', 'DataFlow', 'CloudSync'].map((company, idx) => (
//               <div key={idx} className="text-2xl font-bold text-gray-400">{company}</div>
//             ))}
//           </div>
//           <div className="text-center mt-8">
//             <p className="text-3xl font-bold text-gray-900">50,000+ <span className="text-gray-600 font-normal">teams collaborate daily</span></p>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="relative py-24 px-6 z-10">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Everything your team needs
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Powerful features designed to streamline your workflow and boost productivity
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: '🎯',
//                 title: 'Task Management',
//                 desc: 'Create, assign, and track tasks with ease. Set priorities, deadlines, and dependencies.',
//                 color: 'from-blue-500 to-blue-600'
//               },
//               {
//                 icon: '👥',
//                 title: 'Team Collaboration',
//                 desc: 'Real-time chat, file sharing, and comments keep everyone on the same page.',
//                 color: 'from-purple-500 to-purple-600'
//               },
//               {
//                 icon: '📊',
//                 title: 'Visual Dashboards',
//                 desc: 'Beautiful charts and reports give you instant insights into project progress.',
//                 color: 'from-green-500 to-green-600'
//               },
//               {
//                 icon: '🔔',
//                 title: 'Smart Notifications',
//                 desc: 'Stay updated with intelligent alerts that keep you informed without overwhelming.',
//                 color: 'from-orange-500 to-orange-600'
//               },
//               {
//                 icon: '⚡',
//                 title: 'Automation',
//                 desc: 'Automate repetitive tasks and workflows to save time and reduce errors.',
//                 color: 'from-red-500 to-red-600'
//               },
//               {
//                 icon: '🔒',
//                 title: 'Enterprise Security',
//                 desc: 'Bank-level encryption, SSO, and compliance certifications keep your data safe.',
//                 color: 'from-indigo-500 to-indigo-600'
//               }
//             ].map((feature, idx) => (
//               <div 
//                 key={idx}
//                 className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
//               >
//                 <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
//                 <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="relative py-24 px-6 z-10 bg-gradient-to-b from-blue-50 to-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Get started in minutes
//             </h2>
//             <p className="text-xl text-gray-600">
//               Simple setup, powerful results
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: '01',
//                 title: 'Create Your Workspace',
//                 desc: 'Sign up and set up your team workspace in seconds. Invite team members and customize your settings.'
//               },
//               {
//                 step: '02',
//                 title: 'Add Your Projects',
//                 desc: 'Create projects, break them down into tasks, and organize everything with boards, lists, or timelines.'
//               },
//               {
//                 step: '03',
//                 title: 'Collaborate & Deliver',
//                 desc: 'Work together in real-time, track progress, and deliver exceptional results on schedule.'
//               }
//             ].map((item, idx) => (
//               <div key={idx} className="relative">
//                 <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
//                   <div className="text-5xl font-black text-blue-100 mb-4">{item.step}</div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
//                   <p className="text-gray-600 leading-relaxed">{item.desc}</p>
//                 </div>
//                 {idx < 2 && (
//                   <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
//                     <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section
//       <section id="pricing" className="relative py-24 px-6 z-10">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Simple, transparent pricing
//             </h2>
//             <p className="text-xl text-gray-600">
//               Choose the perfect plan for your team
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {[
//               {
//                 name: 'Starter',
//                 price: '$0',
//                 desc: 'Perfect for small teams getting started',
//                 features: ['Up to 5 team members', '10 projects', 'Basic features', 'Community support'],
//                 cta: 'Start Free',
//                 highlighted: false
//               },
//               {
//                 name: 'Professional',
//                 price: '$12',
//                 desc: 'For growing teams that need more',
//                 features: ['Unlimited team members', 'Unlimited projects', 'Advanced features', 'Priority support', 'Custom integrations'],
//                 cta: 'Start Trial',
//                 highlighted: true
//               },
//               {
//                 name: 'Enterprise',
//                 price: 'Custom',
//                 desc: 'For large organizations',
//                 features: ['Everything in Pro', 'Dedicated support', 'SLA guarantee', 'Advanced security', 'Custom training'],
//                 cta: 'Contact Sales',
//                 highlighted: false
//               }
//             ].map((plan, idx) => (
//               <div 
//                 key={idx}
//                 className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-2xl hover:-translate-y-2 ${
//                   plan.highlighted 
//                     ? 'border-blue-500 shadow-xl shadow-blue-100' 
//                     : 'border-gray-200'
//                 }`}
//               >
//                 {plan.highlighted && (
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
//                     Most Popular
//                   </div>
//                 )}
//                 <div className="text-center mb-6">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
//                   <div className="text-4xl font-black text-gray-900 mb-1">
//                     {plan.price}
//                     {plan.price !== 'Custom' && <span className="text-lg font-normal text-gray-500">/month</span>}
//                   </div>
//                   <p className="text-gray-600">{plan.desc}</p>
//                 </div>
//                 <ul className="space-y-3 mb-8">
//                   {plan.features.map((feature, fIdx) => (
//                     <li key={fIdx} className="flex items-start gap-3">
//                       <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       <span className="text-gray-700">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <button 
//                   className={`w-full py-3 rounded-xl font-semibold transition-all ${
//                     plan.highlighted
//                       ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
//                       : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
//                   }`}
//                 >
//                   {plan.cta}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* CTA Section */}
//       <section className="relative py-24 px-6 z-10 bg-gradient-to-br from-blue-600 to-indigo-700">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Ready to transform your team's workflow?
//           </h2>
//           <p className="text-xl text-blue-100 mb-10">
//             Join thousands of teams already working smarter with CollabHub
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
//               Start Free Trial
//             </button>
//             {/* <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-1">
//               Schedule Demo
//             </button> */}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative py-16 px-6 z-10 bg-gray-900 text-gray-300">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-5 gap-8 mb-12">
//             <div className="md:col-span-2">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-lg">C</span>
//                 </div>
//                 <span className="text-2xl font-bold text-white">CollabHub</span>
//               </div>
//               <p className="text-gray-400 mb-4">
//                 The all-in-one platform for teams to plan, track, and deliver exceptional work together.
//               </p>
//               <div className="flex gap-4">
//                 {['twitter', 'linkedin', 'github'].map((social, idx) => (
//                   <a key={idx} href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
//                     <span className="text-sm">🔗</span>
//                   </a>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <h4 className="font-bold text-white mb-4">Product</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="font-bold text-white mb-4">Company</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-white transition-colors">About</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="font-bold text-white mb-4">Resources</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">API</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-gray-400 text-sm">
//               &copy; 2025 CollabHub. All rights reserved.
//             </p>
//             <div className="flex gap-6 text-sm">
//               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
//               <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


export default function Home(){
  return (
    <>
    <NavBar/>
    <Hero/>
   <section id="social">
        <SocialProof />
      </section>
    <section id="features">
    <Features/>
    </section>
     <section id="works"> <Works/></section>
   
    <CTA/>
    <Footer/>

    </>
  );
}
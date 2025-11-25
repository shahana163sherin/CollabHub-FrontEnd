import githubIcon from '../../assets/Images/github.png';
import discordIcon from '../../assets/Images/discord (2).png';
import instagramIcon from '../../assets/Images/instagram.png';
import xIcon from '../../assets/Images/x.png';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: githubIcon, url: 'https://github.com' },
    { name: 'Discord', icon: discordIcon, url: 'https://discord.com' },
    { name: 'Instagram', icon: instagramIcon, url: 'https://instagram.com' },
    { name: 'X', icon: xIcon, url: 'https://x.com' },
  ];

  const featureLinks = [
    { name: 'Features', url: '#features' },
    { name: 'How it Works', url: '#works' },
    {name:'Social Proof',url:'#social'},
   
  ];



  return (
    <footer className="relative py-16 px-6 z-10 bg-black text-gray-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
         
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="src/assets/Images/smallBlack.jpg" width={200} alt="CollabHub Logo" />
            </div>
            <p className="text-gray-400 mb-6">
              CollabHub is your all-in-one platform to manage projects, collaborate with your team,
              and deliver work efficiently. Organize tasks, track progress, and achieve goals together.
            </p>
            <div className="flex gap-6">
             {socialLinks.map((social, idx) => (
  <a
    key={idx}
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all transform hover:scale-110"
    title={social.name}
  >
    <img src={social.icon} alt={social.name} className="w-8 h-8" />
  </a>
))}

            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {featureLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} className="hover:text-white transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          {/* <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((res, idx) => (
                <li key={idx}>
                  <a href={res.url} className="hover:text-white transition-colors">{res.name}</a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div id='contact'>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: <a href="mailto:info@collabhub.com" className="hover:text-white">info@collabhub.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-white">+1 234 567 890</a></li>
              <li>Address: 123 Collab St, Worktown, USA</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
       <div className="border-t border-gray-800 pt-8 flex flex-col items-center gap-4">
        <p className="text-gray-400 text-sm text-center">
            &copy; 2025 CollabHub. All rights reserved.
        </p>
  {/* <div className="flex gap-6 text-sm">
    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
  </div> */}
     </div>

      </div>
    </footer>
  );
}

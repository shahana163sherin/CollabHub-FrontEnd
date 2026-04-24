

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>, url: 'https://github.com' },
    { name: 'Discord', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 127.14 96.36"><path d="M107.7 8.07A105.15 105.15 0 0081.47 0a72.06 72.06 0 00-3.36 6.83 97.68 97.68 0 00-29.11 0A72.37 72.37 0 0045.64 0a105.89 105.89 0 00-26.25 8.09C2.79 32.65-1.54 56.6 .22 80.21a105.73 105.73 0 0032.27 16.15 77.7 77.7 0 006.89-11.11 68.42 68.42 0 01-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0064.32 0c.87.71 1.76 1.39 2.68 2a67.68 67.68 0 01-10.87 5.19 77 77 0 006.89 11.1 105.25 105.25 0 0032.28-16.15c2.08-26.69-3.23-50.02-18.78-72.14zm-64.84 62c-6.19 0-11.28-5.69-11.28-12.65 0-6.93 4.96-12.64 11.28-12.64 6.37 0 11.4 5.75 11.28 12.64 0 6.96-4.96 12.65-11.28 12.65zm41.42 0c-6.19 0-11.28-5.69-11.28-12.65 0-6.93 4.96-12.64 11.28-12.64 6.37 0 11.4 5.75 11.28 12.64 0 6.96-4.96 12.65-11.28 12.65z" /></svg>, url: 'https://discord.com' },
    { name: 'Instagram', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>, url: 'https://instagram.com' },
    { name: 'X', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, url: 'https://x.com' },
  ];

  const featureLinks = [
    { name: 'Features', url: '#features' },
    { name: 'How it Works', url: '#works' },
    { name: 'Social Proof', url: '#social' },
  ];

  return (
    <footer className="relative py-24 px-6 z-10 bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                CollabHub
              </span>
            </div>
            <p className="mb-8 leading-relaxed max-w-sm text-lg">
              CollabHub is your all-in-one platform to manage projects, collaborate with your team,
              and deliver work efficiently.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all hover:-translate-y-1"
                  title={social.name}
                >
                  <span className="opacity-70 group-hover:opacity-100 transition-all text-zinc-300 group-hover:text-emerald-400">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-zinc-100 mb-6">Product</h4>
            <ul className="space-y-3">
              {featureLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} className="hover:text-emerald-400 transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div id='contact'>
            <h4 className="font-bold text-zinc-100 mb-6">Contact</h4>
            <ul className="space-y-4 text-base">
              <li><a href="mailto:info@collabhub.com" className="hover:text-emerald-400 transition-colors">info@collabhub.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-emerald-400 transition-colors">+1 234 567 890</a></li>
              <li>123 Collab St, Worktown, USA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-8 flex flex-col items-center">
          <p className="text-base text-zinc-500">
            &copy; {new Date().getFullYear()} CollabHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Menu, X, Code, Palette, Smartphone } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility
  const [showNDAPopup, setShowNDAPopup] = useState(false); // State to manage the visibility of the NDA popu
  const [activeSection, setActiveSection] = useState('home'); //tracks which section user is using currently. Home as default
  const [isVisible, setIsVisible] = useState<Record<'home' | 'about' | 'projects' | 'contact', boolean>>({
    home: false,
    about: false,
    projects: false,
    contact: false,
  });// State to track visibility of sections for animations. Start with empty object/section

  useEffect(() => {
    const observer = new IntersectionObserver( // Intersection Observer API to detect when sections are in view
      (entries) => { // Callback function to handle visibility changes
        entries.forEach((entry) => { //loop through each entry
          setIsVisible(prev => ({ // Update visibility state for each section
            ...prev,
            [entry.target.id]: entry.isIntersecting //Sets the section's ID as a key with a boolean value (true if visible, false if not)
          }));
          
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); //if the section is visible, update the active section state
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));// Cleanup observer on component unmount
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleNDAClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowNDAPopup(true);
  };

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  alert("No live view available for this project due to work in progress.");
};

  const projects = [
    {
      title: "Appointment Booking System",
      description: "A full-stack appointment booking system with real-time availability and notifications.",
      // description: "Full-stack e-commerce solution with Next.js, Stripe integration, and real-time inventory management.",
      tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
      image: "./nail-background.jpg",
      github: "https://github.com/Rafiat-B/nail-salon-next",
      live: "https://nail-salon-next-61k4.vercel.app/"
    },
    {
      title: "Machine Learning Web Application",
      description: "A web application that uses machine learning tailoreed for nuerodivergent users, providing personalized recommendations and insights.",
      tech: ["Next.Js", "Figma", "LLaMa", "DynamoDB"],
      image: "./autinerary.jpg",
      github: "#",
      live: "#",
      isNDA: true
    },
    {
      title: "Simple Team Portfolio Website",
      description: "A simple team portfolio website showcasing team members, projects, and contact information.",
      tech: ["HTML5", "CSS", "JavaScript"],
      image: "./team.jpg",
      github: "https://github.com/DT2024/Tech-Nova",
      live: "https://technova.software/"
    },
    {
      title: "Toronto Hairstylist Website",
      description: "Working on developing a personal affordable Hairstylist Hub using React and HTML/CSS. Project is inspired by the struggle of finding a hairstylist in a new city.",
      tech: ["React", "TailwindCSS", "Prisma", "PostgreSQL"],
      image: "./hair-portfolio.jpg",
      github: "https://github.com/Rafiat-B/Hairstylist-project",
      live: "#",
      noLive: true // Indicates that the live link is not available yet
    }
  ];

  const skills = [
    { name: "Frontend Development", icon: Code, items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Thymeleaf"] },
    { name: "Backend Development", icon: Code, items: ["Node.js", "Spring", "Java", "PostgreSQL", "MongoDB", "MySQL"] },
    { name: "Design & UX", icon: Palette, items: ["Figma", "Adobe XD", "Design Systems"] },
    { name: "Mobile Development", icon: Smartphone, items: ["Android"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              rafiat.dev
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8"> {/*Navigation buttons for desktop; hidden on mobile*/} 
              {['home', 'about', 'projects', 'contact'].map((item) => ( //map through each section
                <button  
                  key={item}
                  onClick={() => scrollToSection(item)} //scrolls to the section when clicked
                  className={`capitalize transition-all duration-300 hover:text-blue-400 ${
                    activeSection === item ? 'text-blue-400' : 'text-gray-300'
                  }`} //if section is active, change text color to blue and otherwise gray
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden" //hides the button on medium screens and above. Visible on mobile
              onClick={() => setIsMenuOpen(!isMenuOpen)} //updates the state of the menu when clicked
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />} {/*if the menu is open, show the X icon, otherwise show the Menu icon(hamburger)*/}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && ( //if the mobile menu is open, display the buttons
        <div className="md:hidden bg-black/40 backdrop-blur-md"> {/*Hidden on medium screens+, visible on mobile */}
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 capitalize text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Rafiat Bolaji
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Frontend Developer  
            </p>
            <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
              A passionate Front-End Developer turning designs into delightful user experiences. 
              Enthusiastic about building accessible and scalable applications that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border border-blue-400 rounded-full hover:bg-blue-400 hover:text-black transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-blue-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                <p className="text-gray-300 mb-6">
                  Hi, I’m Rafiat Bolaji 
                  — a front-end developer with a unique background in finance, 
                  customer service, and digital marketing.
                    
                  I build clean, accessible, and user-focused web applications using tools like Next.js, 
                  Tailwind CSS, TypeScript, .NET, and Spring Boot. My previous roles taught me how to 
                  understand real user needs,8 this now helps me create interfaces that are not only 
                  functional but meaningful.
                    
                  Whether it’s designing appointment booking systems or building ML-driven accessibility 
                  tools, I love solving real-world problems through code and thoughtful design.
                  Currently, I’m growing my portfolio and always excited to work on projects that make a 
                  positive impact.
                </p>
                <p className="text-gray-300">
                  I believe in continuous learning and staying up-to-date with the latest 
                  technologies to deliver cutting-edge solutions that exceed expectations.
                </p>
              </div>
              <div className="relative">
                {/* Floating particles around image */}
                  <div className="absolute inset-0 animate-pulse">
                    <div className="absolute top-4 left-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="absolute top-16 right-12 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-20 left-4 w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-8 right-8 w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-32 left-16 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                  </div>
                <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                    <img 
                      src="./rafiat.jpeg" 
                      alt="Profile"
                      className="w-72 h-72 rounded-full object-cover"
                    />
                    {/* Sparkle overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div> 
               
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <skill.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h4 className="text-lg font-semibold mb-3">{skill.name}</h4>
                  <ul className="space-y-1">
                    {skill.items.map((item, i) => (
                      <li key={i} className="text-gray-400 text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-100">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {project.isNDA ? (
                        <>
                          <button 
                            onClick={handleNDAClick}
                            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                          >
                            <Github size={16} />
                            <span className="text-sm">Code</span>
                          </button>
                          <button 
                            onClick={handleNDAClick}
                            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                          >
                            <ExternalLink size={16} />
                            <span className="text-sm">Live</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <a href={project.github} className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                            <Github size={16} />
                            <span className="text-sm">Code</span>
                          </a>
                          {project.noLive ? (
                            <button 
                              onClick={handleNoClick}
                              className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                            >
                              <ExternalLink size={16} />
                              <span className="text-sm">Live</span>
                            </button>
                          ) : (
                            <a href={project.live} className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                              <ExternalLink size={16} />
                              <span className="text-sm">Live</span>
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let’s Connect
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Have an idea in mind? Let’s bring it to life together!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a href="mailto:bolajirafiat@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Mail size={20} />
                <span>bolajirafiat@gmail.com</span>
              </a>
            </div>
            
            <div className="flex gap-6 justify-center">
              <a href="https://github.com/Rafiat-B" className="p-3 bg-white/10 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/rafiat-bolaji/" className="p-3 bg-white/10 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Rafiat Bolaji. Built with Next.js and passion.
          </p>
        </div>
      </footer>

      {/* NDA Popup */}
      {showNDAPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowNDAPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
      
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-5V9.5M15 4.5L12 2L9 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
        
              <h3 className="text-xl font-semibold text-white mb-3">
                Protected Project
              </h3>
        
              <p className="text-gray-300 mb-6 leading-relaxed">
                Due to the Non-Disclosure Agreement signed, you can’t access the source code or live demo for this project.
              </p>
        
              <button
                onClick={() => setShowNDAPopup(false)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
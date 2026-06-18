import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Crosshair, Terminal, Network, Code2, Database, Rocket, ExternalLink, Activity } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './index.css';

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const App = () => {
  return (
    <>
      {/* Background Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="app-container">
        
        {/* Left Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sidebar"
        >
          <div className="glass profile-card" style={{ flexGrow: 1 }}>
            <div className="avatar-container">
              LS
            </div>
            
            <div>
              <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '8px' }}>
                Lithika<br/>Saravanakumar
              </h1>
              <p className="font-mono text-gradient-cyan" style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
                AI & ML / UAV Nav Engineer
              </p>
              
              <div className="status-badge">
                <div className="status-dot"></div>
                SYSTEMS ONLINE
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Specializing in GPS-denied navigation, swarm coordination, and computer vision for autonomous robotics. Tech Lead at Drone MatrX.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Location</span>
                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Ahmedabad, IN</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Education</span>
                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>B.Tech AI & ML (9.0)</span>
              </div>
            </div>

            <div className="social-links">
              <a href="https://github.com/Lithika07" target="_blank" rel="noreferrer" className="social-icon">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/lithika-s-a8bb23294" target="_blank" rel="noreferrer" className="social-icon">
                <FaLinkedin size={20} />
              </a>
              <a href="mailto:sarvanan2907@gmail.com" className="social-icon">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.aside>

        {/* Main Dashboard Area */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="dashboard custom-scrollbar"
        >
          <div className="bento-grid">
            
            {/* Tech Stack Bento */}
            <motion.div variants={itemVariants} className="glass glass-interactive bento-card bento-wide">
              <div className="card-header">
                <h2 className="card-title"><Terminal className="card-icon" /> Core Architecture</h2>
              </div>
              <div className="tech-pills">
                <div className="pill"><Crosshair size={16} /> ROS2 / MAVLink</div>
                <div className="pill"><Network size={16} /> TensorFlow / PyTorch</div>
                <div className="pill"><Code2 size={16} /> OpenCV / DeepSORT</div>
                <div className="pill"><Cpu size={16} /> Ardupilot / Pixhawk</div>
                <div className="pill"><Database size={16} /> Python / C++</div>
                <div className="pill"><Terminal size={16} /> Next.js / React</div>
              </div>
            </motion.div>

            {/* Experience & Missions */}
            <motion.div variants={itemVariants} className="glass bento-card bento-wide">
              <div className="card-header">
                <h2 className="card-title"><Rocket className="card-icon" /> Active Deployments & Missions</h2>
              </div>
              
              <div className="mission-list">
                
                <div className="mission-item">
                  <div className="mission-header">
                    <div>
                      <h3 className="mission-title">Drone Simulation Automation</h3>
                      <div className="font-mono mission-meta">Gazebo SITL • ROS2 • Bash</div>
                    </div>
                    <div className="status-badge" style={{ background: 'rgba(0,240,255,0.1)', color: 'var(--accent-cyan)', borderColor: 'rgba(0,240,255,0.3)' }}>
                      COMPLETE
                    </div>
                  </div>
                  <p className="mission-desc">
                    Engineered a robust Bash automation framework for multi-node UAV simulations via Gazebo and ROS2, integrating system health monitoring and reducing diagnostic time by 40%.
                  </p>
                  <a href="https://github.com/Lithika07/DroneSim" target="_blank" rel="noreferrer" className="mission-link">
                    <ExternalLink size={14} /> View Repository
                  </a>
                </div>

                <div className="mission-item">
                  <div className="mission-header">
                    <div>
                      <h3 className="mission-title">Autonomous UAV Docking System</h3>
                      <div className="font-mono mission-meta">AprilTag • MAVLink • Offboard Control</div>
                    </div>
                    <div className="status-badge">
                      <div className="status-dot"></div> ACTIVE DEV
                    </div>
                  </div>
                  <p className="mission-desc">
                    Developing a precision visual localization pipeline using AprilTags for autonomous offboard control and precision landing in GPS-denied environments. (ISRO IRoC 2026 targeted).
                  </p>
                </div>

                <div className="mission-item">
                  <div className="mission-header">
                    <div>
                      <h3 className="mission-title">Genesis Funding: Drone MatrX</h3>
                      <div className="font-mono mission-meta">Tech Lead • Swarm Coordination</div>
                    </div>
                    <div className="status-badge" style={{ background: 'rgba(224,36,255,0.1)', color: 'var(--accent-magenta)', borderColor: 'rgba(224,36,255,0.3)' }}>
                      SECURED
                    </div>
                  </div>
                  <p className="mission-desc">
                    Secured ₹4 Lakh funding from MeitY (GOI). Leading the technical architecture for a commercial multi-UAV swarm coordination and edge-processing platform.
                  </p>
                </div>

              </div>
            </motion.div>

            {/* Contact / Comms */}
            <motion.div variants={itemVariants} className="glass bento-card bento-wide">
              <div className="card-header">
                <h2 className="card-title"><Activity className="card-icon" /> Establish Uplink</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem' }}>
                Secure channel open. Send a transmission to establish contact for collaborations, recruitment, or technical inquiries.
              </p>
              
              <form action="https://formsubmit.co/sarvanan2907@gmail.com" method="POST" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Transmission Payload</label>
                  <textarea name="message" className="form-input" rows="3" placeholder="Enter message payload..." required></textarea>
                </div>

                <div className="form-group">
                  <label>Callsign / Name</label>
                  <input type="text" name="name" className="form-input" placeholder="Your name" required />
                </div>
                
                <div className="form-group">
                  <label>Return Frequency / Email</label>
                  <input type="email" name="email" className="form-input" placeholder="Your email address" required />
                </div>

                <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                  <button type="submit" className="form-button">
                    <Activity size={18} /> Transmit Message
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        </motion.main>

      </div>
    </>
  );
};

export default App;

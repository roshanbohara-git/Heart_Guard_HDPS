import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineLightningBolt,
  HiOutlineClipboardCheck,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineDatabase,
  HiOutlineClock,
} from 'react-icons/hi';
import { GiHeartOrgan } from 'react-icons/gi';
import aiAnalyticsImg from '../assets/ai-analytics.png';
import './LandingPage.css';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const animatedRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="landing-page">
      {/* ===== NAVBAR ===== */}
      <nav className={`landing-navbar ${scrolled ? 'scrolled' : ''}`} id="landing-nav">
        <div className="landing-navbar-inner">
          <Link to="/" className="landing-brand">
            <div className="landing-brand-logo">
              <GiHeartOrgan style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
            <span className="landing-brand-text">
              Heart<span>Guard</span>
            </span>
          </Link>

          <div className="landing-nav-links">
            <button className="landing-nav-link" onClick={() => scrollToSection('features')}>
              Features
            </button>
            <button className="landing-nav-link" onClick={() => scrollToSection('how-it-works')}>
              How It Works
            </button>
            <button className="landing-nav-link" onClick={() => scrollToSection('about')}>
              About
            </button>
            <button className="landing-nav-link" onClick={() => scrollToSection('stats')}>
              Statistics
            </button>
          </div>

          <div className="landing-nav-actions">
            <Link to="/login" className="btn-ghost">
              Sign In
            </Link>
            <Link to="/register" className="btn-landing-primary">
              Get Started
            </Link>
          </div>

          <button className="landing-hamburger" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="landing-hero" id="hero">
        {/* Animated particles */}
        <div className="hero-particles">
          <div className="hero-particle"></div>
          <div className="hero-particle"></div>
          <div className="hero-particle"></div>
          <div className="hero-particle"></div>
          <div className="hero-particle"></div>
          <div className="hero-particle"></div>
        </div>

        {/* Heartbeat line */}
        <div className="hero-heartbeat">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path d="M0,30 L150,30 L180,10 L210,50 L240,30 L300,30 L330,5 L360,55 L390,30 L600,30 L630,10 L660,50 L690,30 L750,30 L780,5 L810,55 L840,30 L1050,30 L1080,10 L1110,50 L1140,30 L1200,30" />
          </svg>
        </div>

        <div className="landing-hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              AI-Powered Heart Health Analysis
            </div>

            <h1 className="hero-title">
              Predict Heart Disease
              <br />
              with <span className="highlight">AI Precision</span>
            </h1>

            <p className="hero-description">
              Our advanced machine learning system analyzes key health indicators to predict
              cardiovascular risk with remarkable accuracy. Take control of your heart health today
              with data-driven insights.
            </p>

            <div className="hero-cta-group">
              <Link to="/register" className="btn-hero-primary" id="hero-get-started">
                Start Prediction
                <HiOutlineArrowRight />
              </Link>
              <button
                className="btn-hero-secondary"
                onClick={() => scrollToSection('how-it-works')}
                id="hero-learn-more"
              >
                Learn More
              </button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">95%+</span>
                <span className="hero-stat-label">Prediction Accuracy</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">13+</span>
                <span className="hero-stat-label">Health Parameters</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">&lt;5s</span>
                <span className="hero-stat-label">Instant Results</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-glow"></div>

              {/* Floating card - top right */}
              <div className="hero-float-card">
                <div className="float-card-icon green">
                  <HiOutlineCheckCircle />
                </div>
                <div className="float-card-text">
                  <span className="float-card-title">Low Risk Detected</span>
                  <span className="float-card-sub">Confidence: 97.2%</span>
                </div>
              </div>

              <div className="hero-main-image">
                <img src={aiAnalyticsImg} alt="AI Heart Analysis Dashboard" />
              </div>

              {/* Floating card - bottom left */}
              <div className="hero-float-card">
                <div className="float-card-icon purple">
                  <HiOutlineChartBar />
                </div>
                <div className="float-card-text">
                  <span className="float-card-title">ML Model Active</span>
                  <span className="float-card-sub">Real-time Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="landing-features" id="features">
        <div className="landing-section-inner">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">
              <HiOutlineLightningBolt /> Features
            </span>
            <h2 className="section-title">
              Why Choose <span className="highlight">HeartGuard</span>?
            </h2>
            <p className="section-description">
              Built with cutting-edge technology and medical expertise to deliver accurate,
              fast, and reliable heart disease predictions.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon purple">
                <HiOutlineChartBar />
              </div>
              <h3 className="feature-title">AI-Powered Predictions</h3>
              <p className="feature-description">
                Advanced machine learning algorithms trained on extensive clinical datasets
                to deliver highly accurate cardiovascular risk assessments.
              </p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon blue">
                <HiOutlineLightningBolt />
              </div>
              <h3 className="feature-title">Instant Results</h3>
              <p className="feature-description">
                Get your prediction results in seconds. No waiting, no delays — just fast,
                actionable insights about your heart health.
              </p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon green">
                <HiOutlineShieldCheck />
              </div>
              <h3 className="feature-title">Data Privacy & Security</h3>
              <p className="feature-description">
                Your health data is encrypted and secured with industry-standard protocols.
                We never share your personal information.
              </p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon orange">
                <HiOutlineClipboardCheck />
              </div>
              <h3 className="feature-title">Detailed Risk Reports</h3>
              <p className="feature-description">
                Receive comprehensive reports with risk levels, confidence scores, and
                personalized health recommendations.
              </p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon teal">
                <HiOutlineDatabase />
              </div>
              <h3 className="feature-title">Prediction History</h3>
              <p className="feature-description">
                Track your health journey over time. View past predictions and monitor
                changes in your cardiovascular risk profile.
              </p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon red">
                <HiOutlineUserGroup />
              </div>
              <h3 className="feature-title">Role-Based Access</h3>
              <p className="feature-description">
                Separate dashboards for patients and administrators, ensuring personalized
                experiences and efficient health data management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="landing-how-it-works" id="how-it-works">
        <div className="landing-section-inner">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">
              <HiOutlineClock /> Process
            </span>
            <h2 className="section-title">
              How It <span className="highlight">Works</span>
            </h2>
            <p className="section-description">
              Simple, fast, and accurate. Get your heart disease risk assessment in just four easy steps.
            </p>
          </div>

          <div className="how-it-works-grid">
            <div className="step-card animate-on-scroll">
              <div className="step-number">1</div>
              <h3 className="step-title">Create Account</h3>
              <p className="step-description">
                Register with a few simple details and get instant access to the prediction system.
              </p>
            </div>

            <div className="step-card animate-on-scroll">
              <div className="step-number">2</div>
              <h3 className="step-title">Enter Health Data</h3>
              <p className="step-description">
                Input your health parameters like blood pressure, cholesterol, age, and other key indicators.
              </p>
            </div>

            <div className="step-card animate-on-scroll">
              <div className="step-number">3</div>
              <h3 className="step-title">AI Analysis</h3>
              <p className="step-description">
                Our ML model analyzes your data against patterns from thousands of clinical records.
              </p>
            </div>

            <div className="step-card animate-on-scroll">
              <div className="step-number">4</div>
              <h3 className="step-title">Get Results</h3>
              <p className="step-description">
                Receive an instant risk assessment with confidence levels and actionable health insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="landing-about" id="about">
        <div className="landing-section-inner">
          <div className="about-grid">
            <div className="about-image-wrapper animate-on-scroll">
              <div className="about-image-glow"></div>
              <div className="about-image">
                <img src={aiAnalyticsImg} alt="Heart Disease Prediction AI" />
              </div>
            </div>

            <div className="about-content animate-on-scroll">
              <span className="section-tag">
                <HiOutlineHeart /> About The System
              </span>
              <h3>
                Powered by <span className="highlight">Advanced Machine Learning</span>
              </h3>
              <p>
                HeartGuard's Heart Disease Prediction System leverages state-of-the-art machine learning
                algorithms trained on the Cleveland Heart Disease dataset. Our system analyzes 13 key
                clinical parameters to predict the likelihood of cardiovascular disease with exceptional accuracy.
              </p>
              <p>
                Whether you're a patient wanting to understand your risk profile or a healthcare professional
                seeking AI-assisted insights, HeartGuard provides the tools you need.
              </p>

              <div className="about-highlights">
                <div className="about-highlight-item">
                  <div className="about-highlight-icon">
                    <HiOutlineCheckCircle />
                  </div>
                  <span className="about-highlight-text">
                    Trained on clinically validated datasets
                  </span>
                </div>
                <div className="about-highlight-item">
                  <div className="about-highlight-icon">
                    <HiOutlineCheckCircle />
                  </div>
                  <span className="about-highlight-text">
                    13 health parameters analyzed simultaneously
                  </span>
                </div>
                <div className="about-highlight-item">
                  <div className="about-highlight-icon">
                    <HiOutlineCheckCircle />
                  </div>
                  <span className="about-highlight-text">
                    Real-time predictions with confidence scoring
                  </span>
                </div>
                <div className="about-highlight-item">
                  <div className="about-highlight-icon">
                    <HiOutlineCheckCircle />
                  </div>
                  <span className="about-highlight-text">
                    Secure authentication and data protection
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="landing-stats" id="stats">
        <div className="landing-section-inner">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">
              <HiOutlineChartBar /> Impact
            </span>
            <h2 className="section-title">
              Trusted by <span className="highlight">Healthcare</span> Professionals
            </h2>
          </div>

          <div className="stats-grid">
            <div className="stat-card animate-on-scroll">
              <div className="stat-value">95%+</div>
              <div className="stat-label">Prediction Accuracy</div>
            </div>
            <div className="stat-card animate-on-scroll">
              <div className="stat-value">13</div>
              <div className="stat-label">Health Parameters</div>
            </div>
            <div className="stat-card animate-on-scroll">
              <div className="stat-value">1000+</div>
              <div className="stat-label">Predictions Made</div>
            </div>
            <div className="stat-card animate-on-scroll">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="landing-cta" id="cta">
        <div className="cta-container animate-on-scroll">
          <h2 className="cta-title">Ready to Check Your Heart Health?</h2>
          <p className="cta-description">
            Join HeartGuard today and get instant access to AI-powered heart disease prediction.
            Your heart health journey starts here.
          </p>
          <div className="cta-actions">
            <Link to="/register" className="btn-hero-primary" id="cta-get-started">
              Create Free Account
              <HiOutlineArrowRight />
            </Link>
            <Link to="/login" className="btn-hero-secondary" id="cta-sign-in">
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer" id="landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-header">
                <div className="footer-brand-logo">
                  <GiHeartOrgan style={{ width: '22px', height: '22px', color: 'white' }} />
                </div>
                <span className="footer-brand-name">
                  Heart<span>Guard</span>
                </span>
              </div>
              <p className="footer-brand-description">
                AI-powered heart disease prediction system designed to help you understand
                and manage your cardiovascular health with confidence.
              </p>
            </div>

            <div className="footer-column">
              <h4>Product</h4>
              <div className="footer-links">
                <button className="footer-link" onClick={() => scrollToSection('features')}>
                  Features
                </button>
                <button className="footer-link" onClick={() => scrollToSection('how-it-works')}>
                  How It Works
                </button>
                <button className="footer-link" onClick={() => scrollToSection('stats')}>
                  Statistics
                </button>
              </div>
            </div>

            <div className="footer-column">
              <h4>Account</h4>
              <div className="footer-links">
                <Link to="/login" className="footer-link">Sign In</Link>
                <Link to="/register" className="footer-link">Create Account</Link>
              </div>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <div className="footer-links">
                <button className="footer-link" onClick={() => scrollToSection('about')}>
                  About Us
                </button>
                <button className="footer-link" onClick={() => scrollToSection('hero')}>
                  Back to Top
                </button>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <span className="footer-copyright">
              © {new Date().getFullYear()} HeartGuard — Heart Disease Prediction System. All rights reserved.
            </span>
            <div className="footer-social">
              <span className="footer-social-link" title="Heart Health">
                <HiOutlineHeart />
              </span>
              <span className="footer-social-link" title="Analytics">
                <HiOutlineChartBar />
              </span>
              <span className="footer-social-link" title="Security">
                <HiOutlineShieldCheck />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./App.css";

const BACKEND_URL = "http://127.0.0.1:8000";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend unavailable");
        }

        return response.json();
      })
      .then((data) => {
        setBackendStatus(data.status === "healthy" ? "Online" : "Offline");
      })
      .catch(() => {
        setBackendStatus("Offline");
      });
  }, []);

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <img
              src="https://varshasolanki54321-lang.github.io/Dhrishti-UI/dhrishti-logo.png"
              alt="DHRISHTI logo"
            />
          </div>

          <div>
            <h1>DHRISHTI</h1>
            <span>INTELLIGENT SURVEILLANCE</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span>▦</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>◉</span>
            Live Surveillance
          </button>

          <button className="nav-item">
            <span>⚠</span>
            Incidents
          </button>

          <button className="nav-item">
            <span>◫</span>
            Analytics
          </button>
        </nav>

        <div className="system-status">
          <div className="status-title">SYSTEM STATUS</div>

          <div className="status-row">
            <span>Backend</span>

            <strong
              className={
                backendStatus === "Online"
                  ? "status-online"
                  : backendStatus === "Checking..."
                    ? "status-checking"
                    : "status-offline"
              }
            >
              {backendStatus}
            </strong>
          </div>

          <div className="status-row">
            <span>CCTV</span>

            <strong
              className={
                backendStatus === "Online" ? "status-online" : "status-offline"
              }
            >
              {backendStatus === "Online" ? "Connected" : "Offline"}
            </strong>
          </div>

          <div className="status-row">
            <span>AI Engine</span>
            <strong className="status-checking">Awaiting API</strong>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HEADER */}
        <header className="topbar">
          <div>
            <div className="eyebrow">BORDER SURVEILLANCE COMMAND</div>

            <h2>Surveillance Overview</h2>

            <p className="subtitle">
              AI-powered border monitoring and intelligent video analytics
            </p>
          </div>

          <div className="topbar-status">
            <span className="status-dot"></span>
            BACKEND {backendStatus.toUpperCase()}
          </div>
        </header>

        {/* STATISTICS */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">ACTIVE CAMERAS</div>

            <div className="stat-value">01</div>

            <div className="stat-note">Demo CCTV stream connected</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">AI DETECTIONS</div>

            <div className="stat-value">N/A</div>

            <div className="stat-note">Detection API pending</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">ACTIVE ALERTS</div>

            <div className="stat-value">N/A</div>

            <div className="stat-note">Alert API pending</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">AI ACCURACY</div>

            <div className="stat-value">N/A</div>

            <div className="stat-note">AI API pending</div>
          </div>
        </section>

        {/* LIVE CCTV */}
        <section className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-kicker">LIVE SURVEILLANCE</div>

              <h3>Live CCTV Surveillance</h3>
            </div>

            <span className="live-badge">● LIVE</span>
          </div>

          <div className="cctv-container">
            <div className="camera-header">
              <span>CAM-01 • DEMO SECTOR</span>

              <span className="camera-live">● LIVE</span>
            </div>

            {backendStatus === "Online" ? (
              <img
                className="cctv-stream"
                src={`${BACKEND_URL}/api/video/demo`}
                alt="Live DHRISHTI CCTV surveillance feed"
              />
            ) : (
              <div className="cctv-offline">
                <div className="cctv-icon">◉</div>

                <h3>CCTV stream unavailable</h3>

                <p>
                  Start the DHRISHTI backend to view the live surveillance feed.
                </p>
              </div>
            )}

            <div className="camera-footer">
              <span>DEMO CCTV FEED</span>

              <span>MJPEG STREAM</span>
            </div>
          </div>
        </section>

        {/* INCIDENTS + MAP */}
        <section className="two-column">
          <div className="panel">
            <div className="panel-header">
              <div>
                <div className="panel-kicker">SECURITY EVENTS</div>

                <h3>Incident Alerts</h3>
              </div>

              <span className="waiting-badge">API PENDING</span>
            </div>

            <div className="empty-state">
              <div className="empty-icon">⚠</div>

              <h3>No incident data available</h3>

              <p>
                Incident information will appear here after the alerts API is
                implemented.
              </p>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <div className="panel-kicker">BORDER MONITORING</div>

                <h3>Border Activity Map</h3>
              </div>

              <span className="waiting-badge">DATA PENDING</span>
            </div>

            <div className="map-placeholder">
              <div className="map-grid"></div>

              <div className="map-center">
                <div className="map-crosshair">+</div>

                <span>MAP DATA UNAVAILABLE</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI SUMMARY */}
        <section className="panel ai-summary">
          <div className="panel-header">
            <div>
              <div className="panel-kicker">ARTIFICIAL INTELLIGENCE</div>

              <h3>AI Detection Summary</h3>
            </div>

            <span className="waiting-badge">AI API PENDING</span>
          </div>

          <div className="ai-grid">
            <div className="ai-item">
              <span>PERSON DETECTIONS</span>
              <strong>N/A</strong>
            </div>

            <div className="ai-item">
              <span>VEHICLE DETECTIONS</span>
              <strong>N/A</strong>
            </div>

            <div className="ai-item">
              <span>UNUSUAL ACTIVITY</span>
              <strong>N/A</strong>
            </div>

            <div className="ai-item">
              <span>THREAT LEVEL</span>
              <strong>Awaiting AI</strong>
            </div>
          </div>
        </section>

        <footer>
          <span>DHRISHTI</span>

          <span>AI-Based Intelligent Video Analytics Platform</span>

          <span>Frontend • React</span>
        </footer>
      </main>
    </div>
  );
}

export default App;

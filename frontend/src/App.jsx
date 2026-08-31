import "./App.css";

const cameras = [
  {
    id: "CAM-01",
    location: "MAIN BORDER GATE",
    status: "DEMO MODE",
  },
  {
    id: "CAM-02",
    location: "BORDER SECTOR A",
    status: "DEMO MODE",
  },
  {
    id: "CAM-03",
    location: "VEHICLE CHECKPOINT",
    status: "DEMO MODE",
  },
  {
    id: "CAM-04",
    location: "BORDER SECTOR B",
    status: "DEMO MODE",
  },
];

const alerts = [
  {
    icon: "△",
    title: "Awaiting AI events",
    location: "Backend connection required",
  },
  {
    icon: "●",
    title: "Detection events",
    location: "Not available yet",
  },
  {
    icon: "□",
    title: "Tracking events",
    location: "Not available yet",
  },
  {
    icon: "⌁",
    title: "Intrusion events",
    location: "Not available yet",
  },
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <img
              src="https://varshasolanki54321-lang.github.io/Dhrishti-UI/dhrishti-logo.png"
              alt="DHRISHTI logo"
            />
          </div>

          <div>
            <h2>DHRISHTI</h2>
            <p>
              INTELLIGENT
              <br />
              SURVEILLANCE
            </p>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="section-label">COMMAND CENTER</p>

          <nav className="navigation">
            <button className="nav-item active">
              <span className="nav-icon">▦</span>
              <span>Dashboard</span>
            </button>

            <button className="nav-item">
              <span className="nav-icon">◉</span>
              <span>Live Surveillance</span>
            </button>

            <button className="nav-item">
              <span className="nav-icon">⌁</span>
              <span>AI Detection</span>
            </button>

            <button className="nav-item">
              <span className="nav-icon">△</span>
              <span>Incident Alerts</span>
              <span className="alert-count">N/A</span>
            </button>

            <button className="nav-item">
              <span className="nav-icon">✧</span>
              <span>Border Map</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-section analytics-section">
          <p className="section-label">ANALYTICS</p>

          <nav className="navigation">
            <button className="nav-item">
              <span className="nav-icon">▤</span>
              <span>Analytics</span>
            </button>

            <button className="nav-item">
              <span className="nav-icon">◷</span>
              <span>Activity Logs</span>
            </button>

            <button className="nav-item">
              <span className="nav-icon">⚙</span>
              <span>System Settings</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="system-card">
            <p>Infrastructure Status</p>
            <div className="system-status">
              <span className="status-dot"></span>
              <span>Demo Interface Ready</span>
            </div>
          </div>

          <div className="secure-system">
            <span className="secure-icon">◇</span>
            <div>
              <strong>SECURE SYSTEM</strong>
              <p>Encrypted surveillance network</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">• BORDER SURVEILLANCE COMMAND</p>
            <h1>Surveillance Overview</h1>
            <p className="subtitle">
              AI-powered border monitoring and intelligent video analytics
            </p>
          </div>

          <div className="operator-area">
            <div className="engine-status">
              <span>•</span> AI ENGINE ONLINE
            </div>

            <div className="operator-time">--:--:--</div>

            <div className="operator">
              <div className="operator-avatar">OP</div>
              <div>
                <strong>OPERATOR</strong>
                <span>Control Room</span>
              </div>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">□</div>
            <div>
              <p>ACTIVE CAMERAS</p>
              <strong>N/A</strong>
              <span>Backend data pending</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⌁</div>
            <div>
              <p>AI DETECTIONS</p>
              <strong>N/A</strong>
              <span>Backend data pending</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">△</div>
            <div>
              <p>ACTIVE ALERTS</p>
              <strong>N/A</strong>
              <span>Backend data pending</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">◎</div>
            <div>
              <p>AI ACCURACY</p>
              <strong>N/A</strong>
              <span>Backend data pending</span>
            </div>
          </div>
        </section>

        <section className="monitoring-layout">
          <div className="panel cctv-panel">
            <div className="panel-header">
              <div>
                <h2>Live CCTV Surveillance</h2>
                <p>Existing infrastructure • AI analysis active</p>
              </div>

              <span className="live-badge">
                <span></span> DEMO
              </span>
            </div>

            <div className="camera-grid">
              {cameras.map((camera) => (
                <div className="camera-card" key={camera.id}>
                  <div className="camera-screen">
                    <div className="camera-top">
                      <span className="camera-id">
                        {camera.id} - {camera.location}
                      </span>

                      <span className="camera-live">
                        <span></span> {camera.status}
                      </span>
                    </div>

                    <div className="camera-placeholder">
                      <div className="camera-crosshair">
                        <span></span>
                      </div>

                      <p>LIVE CCTV FEED</p>
                      <small>STREAM WILL CONNECT IN LATER STEP</small>
                    </div>
                  </div>

                  <div className="camera-footer">
                    <strong>{camera.location}</strong>
                    <span>AI ANALYSIS AWAITING BACKEND</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel alerts-panel">
            <div className="panel-header">
              <div>
                <h2>AI Incident Alerts</h2>
                <p>Real-time detection events</p>
              </div>

              <span className="alert-badge">N/A</span>
            </div>

            <div className="alerts-list">
              {alerts.map((alert, index) => (
                <div className="alert-item" key={index}>
                  <div className="alert-icon">{alert.icon}</div>

                  <div className="alert-content">
                    <strong>{alert.title}</strong>
                    <span>{alert.location}</span>
                  </div>

                  <button className="view-button" type="button">
                    VIEW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel bottom-panel">
            <div className="panel-header">
              <div>
                <h2>Border Activity Map</h2>
                <p>Monitoring zones and surveillance coverage</p>
              </div>
            </div>

            <div className="map-placeholder">
              <div className="map-grid"></div>
              <span>BORDER MAP MODULE</span>
              <small>Future backend integration</small>
            </div>
          </div>

          <div className="panel bottom-panel">
            <div className="panel-header">
              <div>
                <h2>AI Detection Summary</h2>
                <p>Object detection overview</p>
              </div>
            </div>

            <div className="summary-list">
              <div>
                <span>PERSON</span>
                <strong>N/A</strong>
              </div>

              <div>
                <span>VEHICLE</span>
                <strong>N/A</strong>
              </div>

              <div>
                <span>TRACKING</span>
                <strong>N/A</strong>
              </div>

              <div>
                <span>INTRUSION</span>
                <strong>N/A</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";

const BACKEND_URL = "http://127.0.0.1:8000";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [detections, setDetections] = useState([]);
  const [intrusions, setIntrusions] = useState([]);
  const [fence, setFence] = useState(null);
  const [apiError, setApiError] = useState(false);

  // -----------------------------
  // HEALTH
  // -----------------------------
  const checkHealth = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/health`);

      if (!response.ok) {
        throw new Error("Backend unavailable");
      }

      const data = await response.json();

      setBackendStatus(data.status === "healthy" ? "Online" : "Offline");

      setApiError(false);
    } catch (error) {
      setBackendStatus("Offline");
      setApiError(true);
    }
  };

  // -----------------------------
  // DETECTIONS
  // -----------------------------
  const fetchDetections = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/detections`);

      if (!response.ok) {
        throw new Error("Detection API unavailable");
      }

      const data = await response.json();

      /*
       * Backend may return either:
       * an array directly
       * or { detections: [...] }
       */
      if (Array.isArray(data)) {
        setDetections(data);
      } else {
        setDetections(data.detections || []);
      }
    } catch (error) {
      setDetections([]);
    }
  };

  // -----------------------------
  // INTRUSIONS
  // -----------------------------
  const fetchIntrusions = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/intrusions`);

      if (!response.ok) {
        throw new Error("Intrusion API unavailable");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setIntrusions(data);
      } else {
        setIntrusions(data.intrusions || []);
      }
    } catch (error) {
      setIntrusions([]);
    }
  };

  // -----------------------------
  // FENCE
  // -----------------------------
  const fetchFence = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/fence`);

      if (!response.ok) {
        throw new Error("Fence API unavailable");
      }

      const data = await response.json();

      setFence(data);
    } catch (error) {
      setFence(null);
    }
  };

  // -----------------------------
  // INITIAL LOAD + REFRESH
  // -----------------------------
  useEffect(() => {
    checkHealth();
    fetchDetections();
    fetchIntrusions();
    fetchFence();

    const interval = setInterval(() => {
      checkHealth();
      fetchDetections();
      fetchIntrusions();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const detectionCount = detections.length;
  const intrusionCount = intrusions.length;

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
          <button
            className="nav-item active"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() =>
              document.getElementById("live-surveillance")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <span>◉</span>
            Live Surveillance
          </button>

          <button
            className="nav-item"
            onClick={() =>
              document.getElementById("incidents")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <span>⚠</span>
            Incidents
          </button>

          <button
            className="nav-item"
            onClick={() =>
              document.getElementById("analytics")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <span>◫</span>
            Analytics
          </button>
        </nav>

        {/* SYSTEM STATUS */}
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

            <strong
              className={
                detectionCount > 0 ? "status-online" : "status-checking"
              }
            >
              {detectionCount > 0 ? "Active" : "Monitoring"}
            </strong>
          </div>
        </div>
      </aside>

      {/* MAIN */}
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
            <span
              className={
                backendStatus === "Online" ? "status-dot" : "status-dot offline"
              }
            ></span>
            BACKEND {backendStatus.toUpperCase()}
          </div>
        </header>

        {/* STATISTICS */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">ACTIVE CAMERAS</div>

            <div className="stat-value">01</div>

            <div className="stat-note">Live CCTV stream</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">AI DETECTIONS</div>

            <div className="stat-value">{detectionCount}</div>

            <div className="stat-note">Real YOLO detections</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">ACTIVE INTRUSIONS</div>

            <div className="stat-value">{intrusionCount}</div>

            <div className="stat-note">Restricted-zone entries</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">AI ENGINE</div>

            <div className="stat-value ai-status">
              {detectionCount > 0 ? "ON" : "READY"}
            </div>

            <div className="stat-note">Live backend status</div>
          </div>
        </section>

        {/* CCTV */}
        <section id="live-surveillance" className="panel">
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

        {/* INCIDENTS */}
        <section id="incidents" className="two-column">
          <div className="panel">
            <div className="panel-header">
              <div>
                <div className="panel-kicker">SECURITY EVENTS</div>

                <h3>Restricted Area Intrusions</h3>
              </div>

              <span
                className={
                  intrusionCount > 0 ? "danger-badge" : "waiting-badge"
                }
              >
                {intrusionCount > 0
                  ? `${intrusionCount} ACTIVE`
                  : "NO INTRUSIONS"}
              </span>
            </div>

            {intrusionCount > 0 ? (
              <div className="incident-list">
                {intrusions.map((intrusion, index) => (
                  <div className="incident-item" key={intrusion.id || index}>
                    <div className="incident-icon">⚠</div>

                    <div className="incident-info">
                      <strong>Person detected in restricted area</strong>

                      <span>
                        Track ID:{" "}
                        {intrusion.track_id || intrusion.id || "Unknown"}
                      </span>
                    </div>

                    <div className="incident-time">ACTIVE</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">✓</div>

                <h3>No active intrusions</h3>

                <p>
                  No tracked persons are currently reported inside the
                  restricted area.
                </p>
              </div>
            )}
          </div>

          {/* FENCE */}
          <div className="panel">
            <div className="panel-header">
              <div>
                <div className="panel-kicker">BORDER MONITORING</div>

                <h3>Restricted Zone</h3>
              </div>

              <span className="waiting-badge">
                {fence ? "ZONE ACTIVE" : "LOADING"}
              </span>
            </div>

            <div className="map-placeholder">
              <div className="map-grid"></div>

              <div className="map-center">
                <div className="map-crosshair">+</div>

                <span>
                  {fence ? "RESTRICTED POLYGON ACTIVE" : "LOADING FENCE DATA"}
                </span>

                <small>
                  {fence
                    ? "Live /api/fence response received"
                    : "Waiting for backend"}
                </small>
              </div>
            </div>
          </div>
        </section>

        {/* ANALYTICS */}
        <section id="analytics" className="panel ai-summary">
          <div className="panel-header">
            <div>
              <div className="panel-kicker">ARTIFICIAL INTELLIGENCE</div>

              <h3>Live Detection Summary</h3>
            </div>

            <span className="live-badge">REAL DATA</span>
          </div>

          <div className="ai-grid">
            <div className="ai-item">
              <span>PERSON DETECTIONS</span>

              <strong>{detectionCount}</strong>
            </div>

            <div className="ai-item">
              <span>ACTIVE INTRUSIONS</span>

              <strong>{intrusionCount}</strong>
            </div>

            <div className="ai-item">
              <span>RESTRICTED ZONE</span>

              <strong>{fence ? "ACTIVE" : "LOADING"}</strong>
            </div>

            <div className="ai-item">
              <span>BACKEND</span>

              <strong>{backendStatus}</strong>
            </div>
          </div>

          {/* DETECTION DETAILS */}
          <div className="detection-details">
            <div className="detection-title">CURRENT YOLO DETECTIONS</div>

            {detectionCount > 0 ? (
              <div className="detection-list">
                {detections.map((detection, index) => (
                  <div className="detection-row" key={detection.id || index}>
                    <span>Person #{index + 1}</span>

                    <span>
                      {detection.confidence !== undefined
                        ? `${(Number(detection.confidence) * 100).toFixed(1)}%`
                        : "Detected"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-detections">
                No person detections currently reported by the AI API.
              </div>
            )}
          </div>
        </section>

        {apiError && (
          <div className="api-warning">
            Backend connection unavailable. Make sure FastAPI is running on
            127.0.0.1:8000.
          </div>
        )}

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

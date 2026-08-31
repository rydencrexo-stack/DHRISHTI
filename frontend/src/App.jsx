import { useEffect, useState } from "react";
import "./App.css";

const BACKEND_URL = "http://127.0.0.1:8000";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [detections, setDetections] = useState([]);
  const [intrusions, setIntrusions] = useState([]);
  const [fence, setFence] = useState(null);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [cctvError, setCctvError] = useState(false);

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
    } catch {
      setBackendStatus("Offline");
    }
  };

  // -----------------------------
  // REAL YOLO DETECTIONS
  // -----------------------------
  const fetchDetections = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/detections`);

      if (!response.ok) {
        throw new Error("Detection API unavailable");
      }

      const data = await response.json();

      setDetections(data.detections || []);
      setAiEnabled(Boolean(data.ai_enabled));
    } catch {
      setDetections([]);
      setAiEnabled(false);
    }
  };

  // -----------------------------
  // REAL INTRUSIONS
  // -----------------------------
  const fetchIntrusions = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/intrusions`);

      if (!response.ok) {
        throw new Error("Intrusion API unavailable");
      }

      const data = await response.json();

      setIntrusions(data.intrusions || []);
    } catch {
      setIntrusions([]);
    }
  };

  // -----------------------------
  // REAL FENCE
  // -----------------------------
  const fetchFence = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/fence`);

      if (!response.ok) {
        throw new Error("Fence API unavailable");
      }

      const data = await response.json();

      setFence(data);
    } catch {
      setFence(null);
    }
  };

  // -----------------------------
  // API POLLING
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const detectionCount = detections.length;
  const intrusionCount = intrusions.length;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="app">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">
            <img
              src="https://varshasolanki54321-lang.github.io/Dhrishti-UI/dhrishti-logo.png"
              alt="DHRISHTI"
            />
          </div>

          <div className="brand-text">
            <h1>DHRISHTI</h1>
            <span>INTELLIGENT</span>
            <span>SURVEILLANCE</span>
          </div>
        </div>

        <div className="nav-section-title">COMMAND CENTER</div>

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
            <span className="nav-icon">▦</span>
            Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() => scrollToSection("live-surveillance")}
          >
            <span className="nav-icon">◉</span>
            Live Surveillance
          </button>

          <button
            className="nav-item"
            onClick={() => scrollToSection("ai-detection")}
          >
            <span className="nav-icon">⌁</span>
            AI Detection
          </button>

          <button
            className="nav-item"
            onClick={() => scrollToSection("incidents")}
          >
            <span className="nav-icon">⚠</span>
            Incident Alerts
            {intrusionCount > 0 && (
              <span className="nav-count">
                {String(intrusionCount).padStart(2, "0")}
              </span>
            )}
          </button>

          <button
            className="nav-item"
            onClick={() => scrollToSection("border-map")}
          >
            <span className="nav-icon">✦</span>
            Border Map
          </button>
        </nav>

        <div className="nav-section-title analytics-title">ANALYTICS</div>

        <nav className="sidebar-nav">
          <button
            className="nav-item"
            onClick={() => scrollToSection("ai-detection")}
          >
            <span className="nav-icon">▤</span>
            Analytics
          </button>

          <button
            className="nav-item"
            onClick={() => scrollToSection("incidents")}
          >
            <span className="nav-icon">◷</span>
            Activity Logs
          </button>

          <button
            className="nav-item"
            onClick={() => scrollToSection("system-status")}
          >
            <span className="nav-icon">⚙</span>
            System Settings
          </button>
        </nav>

        {/* SYSTEM STATUS */}
        <div className="system-status" id="system-status">
          <div className="system-status-title">Infrastructure Status</div>

          <div className="system-online">
            <span className="online-dot"></span>

            <span>
              {backendStatus === "Online"
                ? "All systems operational"
                : "System connection issue"}
            </span>
          </div>

          <div className="system-lines">
            <div>
              <span>Backend</span>
              <strong
                className={
                  backendStatus === "Online" ? "online-text" : "offline-text"
                }
              >
                {backendStatus}
              </strong>
            </div>

            <div>
              <span>CCTV</span>
              <strong
                className={
                  backendStatus === "Online" ? "online-text" : "offline-text"
                }
              >
                {backendStatus === "Online" ? "Connected" : "Offline"}
              </strong>
            </div>

            <div>
              <span>AI Engine</span>
              <strong className={aiEnabled ? "online-text" : "offline-text"}>
                {aiEnabled ? "Online" : "Disabled"}
              </strong>
            </div>
          </div>
        </div>

        <div className="secure-system">
          <div className="secure-icon">◇</div>

          <div>
            <strong>SECURE SYSTEM</strong>
            <span>Encrypted surveillance network</span>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="main-content">
        {/* TOP HEADER */}
        <header className="topbar">
          <div>
            <div className="eyebrow">• BORDER SURVEILLANCE COMMAND</div>

            <h2>Surveillance Overview</h2>

            <p>AI-powered border monitoring and intelligent video analytics</p>
          </div>

          <div className="operator-area">
            <div
              className={
                backendStatus === "Online"
                  ? "engine-badge"
                  : "engine-badge offline"
              }
            >
              <span>•</span>
              AI ENGINE {aiEnabled ? "ONLINE" : "STANDBY"}
            </div>

            <div className="clock">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </div>

            <div className="operator-avatar">OP</div>

            <div className="operator-info">
              <strong>OPERATOR</strong>
              <span>Control Room</span>
            </div>
          </div>
        </header>

        {/* =====================================================
            STAT CARDS
        ===================================================== */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">▣</div>

            <div className="stat-content">
              <span>ACTIVE CAMERAS</span>

              <strong>01</strong>

              <small>• 1 / 1 operational</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⌁</div>

            <div className="stat-content">
              <span>AI DETECTIONS</span>

              <strong>{detectionCount}</strong>

              <small>
                {aiEnabled ? "↑ Real YOLO detections" : "AI model unavailable"}
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">△</div>

            <div className="stat-content">
              <span>ACTIVE ALERTS</span>

              <strong>{String(intrusionCount).padStart(2, "0")}</strong>

              <small>
                {intrusionCount > 0
                  ? "Restricted area intrusion"
                  : "No active intrusion"}
              </small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">◎</div>

            <div className="stat-content">
              <span>AI ENGINE</span>

              <strong className="ai-card-status">
                {aiEnabled ? "ON" : "OFF"}
              </strong>

              <small>
                {aiEnabled
                  ? "Real-time analysis active"
                  : "Model not available"}
              </small>
            </div>
          </div>
        </section>

        {/* =====================================================
            LIVE CCTV + INCIDENTS
        ===================================================== */}
        <section className="main-monitor-grid" id="live-surveillance">
          {/* CCTV PANEL */}
          <div className="panel cctv-panel">
            <div className="panel-header">
              <div>
                <div className="panel-kicker">LIVE SURVEILLANCE</div>

                <h3>Live CCTV Surveillance</h3>

                <p>Existing infrastructure • AI analysis active</p>
              </div>

              <span className="live-badge">• LIVE</span>
            </div>

            <div className="cctv-wrapper">
              <div className="camera-top">
                <span>CAM-01 • DEMO SECTOR</span>

                <span className="camera-live">• LIVE</span>
              </div>

              <div className="cctv-screen">
                {backendStatus === "Online" && !cctvError ? (
                  <img
                    src={`${BACKEND_URL}/api/video/demo`}
                    alt="DHRISHTI live CCTV"
                    className="cctv-stream"
                    onError={() => setCctvError(true)}
                  />
                ) : (
                  <div className="cctv-offline">
                    <div className="offline-camera-icon">◉</div>

                    <h3>CCTV STREAM UNAVAILABLE</h3>

                    <p>
                      Start the FastAPI backend to view the live surveillance
                      feed.
                    </p>
                  </div>
                )}

                {/* LIVE LABEL */}
                {backendStatus === "Online" && !cctvError && (
                  <div className="feed-label">LIVE FEED</div>
                )}
              </div>

              <div className="camera-bottom">
                <div>
                  <strong>Demo Sector Surveillance</strong>

                  <span>
                    {aiEnabled
                      ? "AI PERSON DETECTION ACTIVE"
                      : "AI ANALYSIS STANDBY"}
                  </span>
                </div>

                <div className="stream-type">MJPEG STREAM</div>
              </div>
            </div>
          </div>

          {/* INCIDENT PANEL */}
          <div className="panel incidents-panel" id="incidents">
            <div className="panel-header">
              <div>
                <div className="panel-kicker">SECURITY EVENTS</div>

                <h3>AI Incident Alerts</h3>

                <p>Real-time detection events</p>
              </div>

              <span
                className={intrusionCount > 0 ? "danger-badge" : "safe-badge"}
              >
                {intrusionCount > 0
                  ? `${String(intrusionCount).padStart(2, "0")} ACTIVE`
                  : "0 ACTIVE"}
              </span>
            </div>

            <div className="incident-list">
              {intrusionCount > 0 ? (
                intrusions.map((intrusion, index) => (
                  <div
                    className="incident-item"
                    key={intrusion.track_id || index}
                  >
                    <div className="incident-icon danger">⚠</div>

                    <div className="incident-info">
                      <strong>Restricted Area Intrusion</strong>

                      <span>Track ID: {intrusion.track_id ?? "Unknown"}</span>

                      <small>
                        Confidence:{" "}
                        {intrusion.confidence !== undefined
                          ? `${(Number(intrusion.confidence) * 100).toFixed(
                              1,
                            )}%`
                          : "N/A"}
                      </small>
                    </div>

                    <div className="incident-active">ACTIVE</div>
                  </div>
                ))
              ) : (
                <div className="no-incidents">
                  <div className="safe-check">✓</div>

                  <strong>No Active Intrusions</strong>

                  <span>
                    No tracked person is currently inside the restricted area.
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            AI DETECTION
        ===================================================== */}
        <section className="panel detection-panel" id="ai-detection">
          <div className="panel-header">
            <div>
              <div className="panel-kicker">ARTIFICIAL INTELLIGENCE</div>

              <h3>Live Detection Summary</h3>

              <p>Real YOLO detection data from FastAPI</p>
            </div>

            <span className="live-badge">
              {aiEnabled ? "REAL DATA" : "AI OFF"}
            </span>
          </div>

          <div className="detection-summary-grid">
            <div className="summary-box">
              <span>PERSON DETECTIONS</span>
              <strong>{detectionCount}</strong>
            </div>

            <div className="summary-box">
              <span>ACTIVE INTRUSIONS</span>
              <strong>{intrusionCount}</strong>
            </div>

            <div className="summary-box">
              <span>TRACKED PERSONS</span>
              <strong>
                {
                  detections.filter((item) => item.track_id !== undefined)
                    .length
                }
              </strong>
            </div>

            <div className="summary-box">
              <span>AI STATUS</span>
              <strong>{aiEnabled ? "ACTIVE" : "OFF"}</strong>
            </div>
          </div>

          <div className="detection-details">
            <div className="details-heading">CURRENT YOLO DETECTIONS</div>

            {detectionCount > 0 ? (
              <div className="detection-table">
                <div className="table-header">
                  <span>TRACK ID</span>
                  <span>OBJECT</span>
                  <span>CONFIDENCE</span>
                  <span>STATUS</span>
                </div>

                {detections.map((detection, index) => (
                  <div className="table-row" key={detection.track_id ?? index}>
                    <span className="track-id">
                      #{detection.track_id ?? "N/A"}
                    </span>

                    <span>{detection.class_name || "person"}</span>

                    <span>
                      {detection.confidence !== undefined
                        ? `${(Number(detection.confidence) * 100).toFixed(1)}%`
                        : "N/A"}
                    </span>

                    <span className="detected-status">DETECTED</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-detection-data">
                <div className="no-data-icon">◎</div>

                <strong>
                  {aiEnabled
                    ? "No persons currently detected"
                    : "AI detection unavailable"}
                </strong>

                <span>
                  {aiEnabled
                    ? "The backend is running, but no person is currently visible to YOLO."
                    : "The backend is running without the YOLO model."}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            BORDER MAP / FENCE
        ===================================================== */}
        <section className="panel border-panel" id="border-map">
          <div className="panel-header">
            <div>
              <div className="panel-kicker">BORDER MONITORING</div>

              <h3>Restricted Zone</h3>

              <p>Virtual fence configuration</p>
            </div>

            <span className={fence ? "safe-badge" : "waiting-badge"}>
              {fence ? "ZONE ACTIVE" : "LOADING"}
            </span>
          </div>

          <div className="border-map">
            <div className="map-grid"></div>

            <div className="map-radar"></div>

            <div className="fence-shape">
              <div className="fence-label">RESTRICTED AREA</div>

              <span className="fence-point p1"></span>
              <span className="fence-point p2"></span>
              <span className="fence-point p3"></span>
              <span className="fence-point p4"></span>
            </div>

            <div className="map-center">
              <div className="map-crosshair">+</div>

              <strong>
                {fence ? "RESTRICTED POLYGON ACTIVE" : "WAITING FOR FENCE DATA"}
              </strong>

              <span>
                {fence
                  ? `${fence.polygon?.length || 0} boundary points received`
                  : "Connecting to /api/fence"}
              </span>
            </div>
          </div>

          {fence?.polygon && (
            <div className="fence-coordinates">
              <span>LIVE FENCE COORDINATES</span>

              <div>
                {fence.polygon.map((point, index) => (
                  <code key={index}>
                    P{index + 1} [{point[0]}, {point[1]}]
                  </code>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <footer>
          <div>
            <strong>DHRISHTI</strong>
            <span>AI-Based Intelligent Video Analytics Platform</span>
          </div>

          <div>
            <span>FRONTEND • REACT</span>
            <span>BACKEND • FASTAPI</span>
            <span>AI • YOLO</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

// app/page.jsx
"use client";

import { useEffect, useState, useCallback } from "react";

const API_URL = "/api/channel";

export default function Page() {
  const [data, setData] = useState(null);
  const [state, setState] = useState({
    loading: true,
    error: "",
  });

  const loadData = useCallback(async () => {
    setState({ loading: true, error: "" });

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal memuat data dari server.");

      const json = await res.json();
      if (!json.status) {
        throw new Error(json.message || "Status API false.");
      }

      setData(json);
      setState({ loading: false, error: "" });
    } catch (err) {
      setState({
        loading: false,
        error: err.message || "Terjadi kesalahan saat memuat data.",
      });
      setData(null);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const reactions = data?.info?.reaction_used
    ? data.info.reaction_used.split(",").map((r) => r.trim())
    : [];

  return (
    <div className="page-bg">
      {/* glow floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <main className="shell">
        <header className="hero">
          <div className="hero-tagline">React Channel Message</div>
          <h1 className="hero-title">
            Saluran <span>Biru</span> Bercahaya
          </h1>
          <p className="hero-subtitle">
            Pantau reaksi yang masuk ke saluranmu dengan tampilan futuristik
            bertema biru bercahaya.
          </p>
        </header>

        {/* Glass card di tengah biar background foto tetap kelihatan */}
        <section className="glass-wrapper">
          {/* layer bawah untuk efek reflection */}
          <div className="glass-reflection" />

          <div className="card channel-card">
            <div className="card-glow" />

            {state.loading && (
              <LoaderSection text="Mengambil pesan saluran..." />
            )}

            {!state.loading && state.error && (
              <ErrorSection error={state.error} onRetry={loadData} />
            )}

            {!state.loading && !state.error && data && (
              <>
                <div className="card-header">
                  <div>
                    <h2>Pesan Saluran</h2>
                    <p className="card-header-subtitle">
                      Reaksi berhasil diproses, cek detail lengkap di bawah.
                    </p>
                  </div>

                  <span
                    className={
                      "status-badge " +
                      (data.status
                        ? "status-badge--ok"
                        : "status-badge--fail")
                    }
                  >
                    {data.status ? "Aktif" : "Tidak Aktif"}
                  </span>
                </div>

                <p className="card-message">{data.message}</p>

                {reactions.length > 0 && (
                  <div className="reactions">
                    {reactions.map((emoji, idx) => (
                      <span
                        key={idx}
                        className="reaction-emoji"
                        style={{ "--i": idx }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}

                <div className="note-block">
                  <span className="note-label">Catatan</span>
                  <p>{data.info?.note}</p>
                </div>

                <a
                  href={data.info?.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-btn primary-btn--glow"
                >
                  Buka Channel WhatsApp
                  <span className="primary-btn__shine" />
                </a>

                <div className="meta-row">
                  <span>Dibuat oleh {data.creator || "Faa"}</span>
                  <span>Reaksi digunakan: {data.info?.reaction_used}</span>
                </div>
              </>
            )}
          </div>
        </section>

        <footer className="footer">
          <span>
            Powered by Next.js &amp; Vercel • API by {data?.creator || "Faa"}
          </span>
        </footer>
      </main>
    </div>
  );
}

function LoaderSection({ text }) {
  return (
    <div className="loader-section">
      <div className="loader-orbit">
        <span className="orbit orbit-1" />
        <span className="orbit orbit-2" />
        <span className="orbit orbit-3" />
        <span className="orbit-core" />
      </div>
      <p className="loader-text">{text}</p>
    </div>
  );
}

function ErrorSection({ error, onRetry }) {
  return (
    <div className="error-card-inner">
      <h2>Ups, ada masalah</h2>
      <p>{error}</p>
      <button className="primary-btn" onClick={onRetry}>
        Coba Lagi
        <span className="primary-btn__shine" />
      </button>
    </div>
  );
}

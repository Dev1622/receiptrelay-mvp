import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownToLine, ArrowRight, Check, CheckCheck, ClipboardList,
  Copy, FileText, Plus, Search, Send, Sparkles, Trash2, Users, X
} from "lucide-react";
import "./styles.css";


const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

function LandingPage({ onTryDemo }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function submitWaitlist(e) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const signup = {
      email: email.trim(),
      role: role || "Not specified",
      source: "ReceiptRelay landing page",
      createdAt: new Date().toISOString()
    };

    if (FORMSPREE_ENDPOINT) {
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(signup)
        });
        if (!response.ok) throw new Error("Signup request failed");
        setStatus("success");
        setMessage("You're on the waitlist! We'll be in touch when early access opens.");
        setEmail("");
        setRole("");
      } catch {
        setStatus("error");
        setMessage("We couldn't submit your signup. Please try again in a moment.");
      }
      return;
    }

    // Local-only fallback for previewing the form. This does not send the signup to the owner.
    try {
      const previous = JSON.parse(localStorage.getItem("receiptrelay_waitlist_preview") || "[]");
      localStorage.setItem("receiptrelay_waitlist_preview", JSON.stringify([...previous, signup]));
      setStatus("preview");
      setMessage("Preview only: this signup is saved in this browser, not sent to the ReceiptRelay team. Configure VITE_FORMSPREE_ENDPOINT to collect real signups.");
      setEmail("");
      setRole("");
    } catch {
      setStatus("error");
      setMessage("This preview could not save the signup. Configure a waitlist endpoint before launch.");
    }
  }

  return (
    <div className="landing-shell">
      <header className="topbar landing-topbar">
        <a className="brand" href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="ReceiptRelay home">
          <span className="brand-mark"><ClipboardList size={20} /></span>
          <span>Receipt<span className="brand-light">Relay</span></span>
        </a>
        <div className="top-actions">
          <a className="nav-link" href="#how-it-works">How it works</a>
          <button className="btn btn-primary" onClick={onTryDemo}>Try the demo <ArrowRight size={15}/></button>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-inner">
            <div className="eyebrow"><Sparkles size={14}/> MADE FOR BOOKKEEPERS</div>
            <h1>Close the books.<br/><span>Not another email thread.</span></h1>
            <p className="landing-lead">Keep track of missing client documents and draft clear follow-up messages in seconds—without another complicated accounting platform.</p>
            <div className="landing-actions">
              <button className="btn btn-primary btn-large" onClick={onTryDemo}>Try the demo <ArrowRight size={17}/></button>
              <a className="btn btn-quiet btn-large" href="#waitlist">Join the early-access waitlist</a>
            </div>
            <p className="hero-note"><CheckCircleInline/> Free to explore the prototype. No account required.</p>
          </div>
          <div className="landing-preview" aria-label="ReceiptRelay product preview">
            <div className="preview-window">
              <div className="preview-window-bar"><span/><span/><span/><strong>ReceiptRelay / Client checklist</strong></div>
              <div className="preview-window-body">
                <div className="preview-eyebrow">OCTOBER CLOSE <span>3 ITEMS</span></div>
                <h3>Northstar Studio</h3>
                <p className="preview-muted">A little less chasing. A little more closing.</p>
                <div className="preview-check-row"><span className="fake-check checked"><Check size={12}/></span><span className="strike">Office equipment invoice</span><b className="received-tag">Received</b></div>
                <div className="preview-check-row"><span className="fake-check"></span><span>September bank statement</span><b className="missing-tag">Missing</b></div>
                <div className="preview-check-row"><span className="fake-check"></span><span>Marketing expense receipts</span><b className="missing-tag">Missing</b></div>
                <div className="preview-message"><div><span className="preview-dot"/> FOLLOW-UP DRAFT</div><p>Hi Northstar Studio team, just a quick follow-up. Could you please share the remaining documents when you get a chance?</p></div>
              </div>
            </div>
            <div className="preview-floating"><span className="floating-icon"><CheckCheck size={17}/></span><span><strong>One clear checklist</strong><small>Instead of another email thread</small></span></div>
          </div>
        </section>

        <section className="landing-how section-wrap" id="how-it-works">
          <div className="section-intro"><span className="section-kicker">A SMALL TOOL FOR A RECURRING TASK</span><h2>Less chasing. Clearer month-end.</h2><p>ReceiptRelay focuses on the follow-up work that happens before the books can be closed.</p></div>
          <div className="feature-grid">
            <article className="feature-card"><span className="feature-icon"><ClipboardList size={21}/></span><h3>One checklist per client</h3><p>Write down the missing receipts, invoices and statements. See what's still outstanding at a glance.</p></article>
            <article className="feature-card"><span className="feature-icon"><Send size={21}/></span><h3>Ready-to-copy reminders</h3><p>Draft a friendly or direct follow-up for email or WhatsApp. Review it, then send it yourself.</p></article>
            <article className="feature-card"><span className="feature-icon"><CheckCheck size={21}/></span><h3>Simple status tracking</h3><p>Mark items received and export the checklist when you need a quick overview.</p></article>
          </div>
        </section>

        <section className="landing-cta section-wrap" id="waitlist">
          <div className="waitlist-copy">
            <span className="section-kicker">HELP SHAPE THE FIRST VERSION</span>
            <h2>Get early access to ReceiptRelay.</h2>
            <p>Try the prototype today. Join the waitlist if you'd like to hear when the fuller version is ready.</p>
            <div className="price-plan"><span className="price-symbol">$</span><strong>1</strong><span><b>Planned early-access offer</b><small>Not available for purchase yet. No payment is collected on this page.</small></span></div>
          </div>
          <form className="waitlist-form" onSubmit={submitWaitlist}>
            <div className="form-heading"><h3>Join the waitlist</h3><p>We'll only use your details about ReceiptRelay early access.</p></div>
            <label htmlFor="waitlist-email">Email address <span>*</span></label>
            <input id="waitlist-email" type="email" required autoComplete="email" placeholder="you@yourfirm.com" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="waitlist-role">Your role <small>(optional)</small></label>
            <select id="waitlist-role" value={role} onChange={e => setRole(e.target.value)}>
              <option value="">Choose your role</option>
              <option>Bookkeeper</option>
              <option>Accountant</option>
              <option>Accounting firm owner</option>
              <option>Freelancer</option>
              <option>Other</option>
            </select>
            <button className="btn btn-primary btn-large waitlist-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Joining..." : "Join the waitlist"} <ArrowRight size={16}/></button>
            {message && <p className={`form-message ${status}`} role="status">{message}</p>}
            <p className="form-privacy">By signing up, you agree to receive occasional updates about ReceiptRelay. You can ask to be removed at any time.</p>
          </form>
        </section>

        <section className="prototype-notice section-wrap">
          <span className="notice-icon"><FileText size={19}/></span>
          <div><strong>Prototype notice</strong><p>ReceiptRelay is an early prototype for feedback, not a production service. The demo uses sample data and browser-local storage. It has no accounts, cloud sync, automated sending or checkout. Please don't enter real client financial information.</p></div>
        </section>
      </main>
      <footer className="landing-footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><ClipboardList size={17}/></span><span>Receipt<span className="brand-light">Relay</span></span></a><span>Built for calmer month-end follow-ups.</span><a href="#waitlist">Early access</a></footer>
    </div>
  );
}

function CheckCircleInline() {
  return <span className="inline-check"><Check size={12}/></span>;
}

const STORAGE_KEY = "receiptrelay_mvp_v1";
const starter = {
  clients: [
    {
      id: "demo-client",
      name: "Northstar Studio",
      email: "accounts@example.com",
      period: "October 2026",
      deadline: "2026-10-31",
      items: [
        { id: "a1", name: "September bank statement", received: false },
        { id: "a2", name: "Marketing expense receipts", received: false },
        { id: "a3", name: "Office equipment invoice", received: true }
      ]
    }
  ]
};

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starter;
  } catch {
    return starter;
  }
}

function App() {
  const [view, setView] = useState("landing");
  const [data, setData] = useState(loadData);
  const [selectedId, setSelectedId] = useState(() => loadData().clients[0]?.id || "");
  const [query, setQuery] = useState("");
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", email: "", period: "October 2026", deadline: "" });
  const [newItem, setNewItem] = useState("");
  const [channel, setChannel] = useState("Email");
  const [tone, setTone] = useState("Friendly");
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (!data.clients.some(c => c.id === selectedId)) {
      setSelectedId(data.clients[0]?.id || "");
    }
  }, [data, selectedId]);

  const client = data.clients.find(c => c.id === selectedId) || null;
  const filteredClients = data.clients.filter(c =>
    `${c.name} ${c.email}`.toLowerCase().includes(query.toLowerCase())
  );
  const outstanding = client?.items.filter(i => !i.received) || [];
  const receivedCount = client?.items.filter(i => i.received).length || 0;
  const totalItems = client?.items.length || 0;
  const totalOutstanding = data.clients.reduce((sum, c) => sum + c.items.filter(i => !i.received).length, 0);

  const reminder = useMemo(() => {
    if (!client) return "";
    const greeting = client.name.trim() ? `Hi ${client.name.trim()} team,` : "Hello,";
    const list = outstanding.length
      ? outstanding.map(i => `• ${i.name}`).join("\n")
      : "Everything on our checklist has been marked as received.";
    const friendly = `Just a quick follow-up for ${client.period || "this period"}. Could you please share the following items when you get a chance?\n\n${list}\n\n${client.deadline ? `If possible, please send these by ${new Date(`${client.deadline}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}. ` : ""}Let me know if anything is unclear. Thanks!`;
    const direct = `We're preparing the books for ${client.period || "the current period"} and still need the items below:\n\n${list}\n\n${client.deadline ? `Please send them by ${new Date(`${client.deadline}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} so we can keep the close on schedule. ` : ""}Please reply if an item isn't available. Thank you.`;
    const body = tone === "Direct" ? direct : friendly;
    if (channel === "WhatsApp") return `${greeting}\n${body}`;
    return `Subject: Missing documents for ${client.period || "month-end"}\n\n${greeting}\n\n${body}`;
  }, [client, outstanding, channel, tone]);

  function updateClient(id, updater) {
    setData(prev => ({ ...prev, clients: prev.clients.map(c => c.id === id ? updater(c) : c) }));
  }

  function addClient(e) {
    e.preventDefault();
    if (!newClient.name.trim()) return;
    const c = {
      id: crypto.randomUUID(),
      name: newClient.name.trim(),
      email: newClient.email.trim(),
      period: newClient.period.trim() || "Current period",
      deadline: newClient.deadline,
      items: []
    };
    setData(prev => ({ ...prev, clients: [c, ...prev.clients] }));
    setSelectedId(c.id);
    setNewClient({ name: "", email: "", period: "October 2026", deadline: "" });
    setShowAddClient(false);
    setNotice("Client added");
  }

  function addItem(e) {
    e.preventDefault();
    if (!client || !newItem.trim()) return;
    updateClient(client.id, c => ({
      ...c,
      items: [...c.items, { id: crypto.randomUUID(), name: newItem.trim(), received: false }]
    }));
    setNewItem("");
  }

  function toggleItem(itemId) {
    if (!client) return;
    updateClient(client.id, c => ({
      ...c,
      items: c.items.map(i => i.id === itemId ? { ...i, received: !i.received } : i)
    }));
  }

  function deleteItem(itemId) {
    if (!client) return;
    updateClient(client.id, c => ({ ...c, items: c.items.filter(i => i.id !== itemId) }));
  }

  async function copyReminder() {
    try {
      await navigator.clipboard.writeText(reminder);
      setCopied(true);
      setNotice("Reminder copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setNotice("Clipboard access was blocked. Select and copy the reminder text manually.");
    }
  }

  function exportCsv() {
    const rows = [["Client", "Email", "Period", "Deadline", "Document", "Status"]];
    data.clients.forEach(c => c.items.forEach(i => rows.push([
      c.name, c.email, c.period, c.deadline, i.name, i.received ? "Received" : "Missing"
    ])));
    const csv = rows.map(row => row.map(v => `"${String(v ?? "").replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url; a.download = "receiptrelay-checklist.csv"; a.click();
    URL.revokeObjectURL(url);
    setNotice("CSV exported");
  }

  function deleteClient() {
    if (!client) return;
    if (!window.confirm(`Delete ${client.name} and its checklist from this browser?`)) return;
    setData(prev => ({ ...prev, clients: prev.clients.filter(c => c.id !== client.id) }));
    setNotice("Client deleted");
  }

  if (view === "landing") return <LandingPage onTryDemo={() => { setView("demo"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="ReceiptRelay home">
          <span className="brand-mark"><ClipboardList size={20} /></span>
          <span>Receipt<span className="brand-light">Relay</span></span>
        </a>
        <div className="top-actions">
          <button className="btn btn-quiet" onClick={() => { setView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>← Landing page</button>
          <span className="local-badge"><span className="dot" /> Browser demo</span>
          <button className="btn btn-quiet" onClick={exportCsv}><ArrowDownToLine size={16} /> Export CSV</button>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div>
            <div className="eyebrow"><Sparkles size={14} /> MONTH-END, WITH LESS CHASING</div>
            <h1>Close the books.<br /><span>Not another email thread.</span></h1>
            <p className="hero-copy">Keep missing client documents in one tidy checklist and create a follow-up message in seconds.</p>
          </div>
          <div className="hero-stats">
            <div className="stat-card"><span className="stat-label">Clients tracked</span><strong>{data.clients.length}</strong><span className="stat-foot">in this browser</span></div>
            <div className="stat-card"><span className="stat-label">Items outstanding</span><strong>{totalOutstanding}</strong><span className="stat-foot">across all clients</span></div>
          </div>
        </section>

        <div className="workspace">
          <aside className="sidebar panel">
            <div className="side-heading">
              <div><span className="section-kicker">WORKSPACE</span><h2>Clients <span className="count">{data.clients.length}</span></h2></div>
              <button className="icon-btn add-btn" onClick={() => setShowAddClient(true)} aria-label="Add client" title="Add client"><Plus size={18}/></button>
            </div>
            <label className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a client..." /></label>
            <div className="client-list">
              {filteredClients.map(c => {
                const pending = c.items.filter(i => !i.received).length;
                return <button key={c.id} className={`client-row ${c.id === selectedId ? "selected" : ""}`} onClick={() => setSelectedId(c.id)}>
                  <span className="avatar">{c.name.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase()}</span>
                  <span className="client-meta"><strong>{c.name}</strong><small>{c.period || "Current period"}</small></span>
                  <span className={`pending-pill ${pending === 0 ? "clear" : ""}`}>{pending}</span>
                </button>;
              })}
              {filteredClients.length === 0 && <div className="empty-small">No clients match that search.</div>}
            </div>
            <div className="sidebar-bottom"><Users size={15}/><span>Simple follow-up tracking</span></div>
          </aside>

          <section className="content-column">
            {!client ? (
              <div className="panel empty-state">
                <span className="empty-icon"><Users size={25}/></span>
                <h2>Your client list starts here</h2>
                <p>Add a client to build a missing-document checklist and draft your first reminder.</p>
                <button className="btn btn-primary" onClick={() => setShowAddClient(true)}><Plus size={16}/> Add your first client</button>
              </div>
            ) : (
              <>
                <section className="panel client-overview">
                  <div className="overview-top">
                    <div className="client-title-wrap">
                      <span className="avatar avatar-large">{client.name.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase()}</span>
                      <div><span className="section-kicker">CLIENT OVERVIEW</span><h2>{client.name}</h2><p>{client.email || "No email added"} <span className="separator">·</span> {client.period}</p></div>
                    </div>
                    <button className="icon-btn danger-icon" title="Delete client" aria-label="Delete client" onClick={deleteClient}><Trash2 size={17}/></button>
                  </div>
                  <div className="progress-head"><span>Document checklist</span><strong>{receivedCount} of {totalItems} received</strong></div>
                  <div className="progress-track"><span style={{width: `${totalItems ? receivedCount / totalItems * 100 : 0}%`}} /></div>
                  <div className="mini-stats">
                    <div><span className="mini-dot amber" /><span>Missing</span><strong>{outstanding.length}</strong></div>
                    <div><span className="mini-dot green" /><span>Received</span><strong>{receivedCount}</strong></div>
                    <div><FileText size={15}/><span>Period</span><strong>{client.period || "—"}</strong></div>
                  </div>
                </section>

                <section className="panel checklist-panel">
                  <div className="panel-heading"><div><span className="section-kicker">TRACKER</span><h2>Requested documents</h2></div><span className="subtle-count">{totalItems} total</span></div>
                  {client.items.length === 0 ? <div className="empty-inline">No documents yet. Add the first missing item below.</div> : (
                    <div className="item-list">
                      {client.items.map(item => <div className={`document-row ${item.received ? "is-received" : ""}`} key={item.id}>
                        <button className={`check-control ${item.received ? "checked" : ""}`} onClick={() => toggleItem(item.id)} aria-label={item.received ? "Mark as missing" : "Mark as received"}>{item.received && <Check size={15}/>}</button>
                        <span className="document-name">{item.name}</span>
                        <span className={`status-label ${item.received ? "status-done" : "status-pending"}`}>{item.received ? "Received" : "Missing"}</span>
                        <button className="tiny-delete" onClick={() => deleteItem(item.id)} aria-label={`Delete ${item.name}`}><X size={15}/></button>
                      </div>)}
                    </div>
                  )}
                  <form className="add-item-form" onSubmit={addItem}>
                    <input value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="e.g. October bank statement" aria-label="New document name" />
                    <button className="btn btn-dark" type="submit" disabled={!newItem.trim()}><Plus size={16}/> Add item</button>
                  </form>
                  {client.deadline && <p className="deadline-note"><span className="mini-dot amber"/><strong>Target date:</strong> {new Date(`${client.deadline}T12:00:00`).toLocaleDateString(undefined, {month:"long", day:"numeric", year:"numeric"})}</p>}
                </section>

                <section className="panel reminder-panel">
                  <div className="panel-heading"><div><span className="section-kicker">READY-TO-SEND DRAFT</span><h2>Draft a follow-up</h2></div><span className="draft-tag"><Sparkles size={13}/> No AI required</span></div>
                  <div className="controls-row">
                    <label>Channel<select value={channel} onChange={e => setChannel(e.target.value)}><option>Email</option><option>WhatsApp</option></select></label>
                    <label>Tone<select value={tone} onChange={e => setTone(e.target.value)}><option>Friendly</option><option>Direct</option></select></label>
                  </div>
                  <div className="message-preview"><div className="preview-label"><span className="preview-dot"/> MESSAGE PREVIEW</div><pre>{reminder}</pre></div>
                  <div className="reminder-footer"><span>Review the draft before sending.</span><button className="btn btn-primary" onClick={copyReminder}>{copied ? <CheckCheck size={16}/> : <Copy size={16}/>} {copied ? "Copied!" : "Copy reminder"}</button></div>
                </section>
              </>
            )}
          </section>
        </div>
        <footer className="footer"><span>ReceiptRelay <span className="footer-dot">·</span> Early MVP</span><span>Demo data is stored in this browser only.</span></footer>
      </main>

      {showAddClient && <div className="modal-backdrop" role="presentation" onMouseDown={e => {if(e.target === e.currentTarget) setShowAddClient(false);}}>
        <form className="modal" onSubmit={addClient}>
          <div className="modal-head"><div><span className="section-kicker">NEW RECORD</span><h2>Add a client</h2></div><button type="button" className="icon-btn" onClick={() => setShowAddClient(false)} aria-label="Close"><X size={18}/></button></div>
          <label>Client or business name *<input autoFocus required value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} placeholder="e.g. Acme Studio"/></label>
          <label>Contact email (optional)<input type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} placeholder="accounts@company.com"/></label>
          <div className="modal-grid"><label>Period<input value={newClient.period} onChange={e => setNewClient({...newClient, period: e.target.value})} placeholder="October 2026"/></label><label>Target date<input type="date" value={newClient.deadline} onChange={e => setNewClient({...newClient, deadline: e.target.value})}/></label></div>
          <div className="modal-actions"><button type="button" className="btn btn-quiet" onClick={() => setShowAddClient(false)}>Cancel</button><button type="submit" className="btn btn-primary"><Plus size={16}/> Create client</button></div>
        </form>
      </div>}
      {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={14}/></button></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

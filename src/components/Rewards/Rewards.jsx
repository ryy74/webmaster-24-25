import React, { useState } from "react";

// very basic client for webmaster-backend-production.up.railway.app
// drop this component into any react app (e.g. create‑react‑app) and render it.
// no state management, no routing — just fetch calls with the required X‑User header.

const BASE_URL = "https://webmaster-backend-production.up.railway.app";

export default function Rewards() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);

  // helper to build headers; attach X‑User when a protected route is hit
  const headers = (needsAuth = false) => {
    const h = { "Content-Type": "application/json" };
    if (needsAuth && username) h["X-User"] = username;
    return h;
  };

  // generic fetch wrapper
  const call = async (path, method = "GET", body = null, needsAuth = false) => {
    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: headers(needsAuth),
        body: body ? JSON.stringify(body) : undefined,
      });
      setResponse(await res.json());
    } catch (err) {
      console.error(err);
      setResponse({ error: err.message });
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "2rem auto" }}>
      <h2>green bites api demo</h2>

      <section>
        <h3>auth</h3>
        <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div style={{ marginTop: "0.5rem" }}>
          <button onClick={() => call("/auth/signup", "POST", { username, email, password })}>sign‑up</button>
          <button onClick={() => call("/auth/login", "POST", { username, password })}>login</button>
        </div>
      </section>

      <section style={{ marginTop: "1rem" }}>
        <h3>profile</h3>
        <button onClick={() => call("/users/me", "GET", null, true)}>get my profile</button>
      </section>

      <section style={{ marginTop: "1rem" }}>
        <h3>orders</h3>
        <button onClick={() => call("/orders/mine", "GET", null, true)}>my orders</button>
        <button onClick={() => call("/orders", "POST", { items_json: "[]", subtotal: 0 }, true)}>place dummy order</button>
      </section>

      {response && (
        <pre style={{ whiteSpace: "pre-wrap", background: "#eee", padding: "1rem", marginTop: "1rem" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

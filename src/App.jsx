 
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:1111/bikes";

const emptyBike = {
  bikeName: "",
  brand: "",
  model: "",
  registrationNumber: "",
  bikeType: "Sports",
  pricePerHour: "",
  availability: true,
  color: "",
  year: new Date().getFullYear(),
};

const bikeImages = [
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85",
];

function App() {
  const [bikes, setBikes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState(emptyBike);
  const [editingId, setEditingId] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadBikes() {
    try {
      const response = await fetch(`${API}/Get`);
      if (!response.ok) throw new Error("Unable to load bikes");
      setBikes(await response.json());
    } catch (error) {
      setMessage("Cannot connect to the API. Check that Spring Boot is running on port 1111.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBikes();
  }, []);

  const filteredBikes = bikes.filter((bike) => {
    const term = search.toLowerCase();
    const matchesSearch = [
      bike.bikeName,
      bike.brand,
      bike.model,
      bike.registrationNumber,
      bike.bikeType,
    ].some((value) => String(value ?? "").toLowerCase().includes(term));

    const matchesFilter =
      filter === "All" ||
      (filter === "Available" && bike.availability === true) ||
      (filter === "Unavailable" && bike.availability === false);

    return matchesSearch && matchesFilter;
  });

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyBike });
    setMessage("");
    setModal(true);
  }

  function openEdit(bike) {
    setEditingId(bike.bikeId);
    setForm({
      bikeName: bike.bikeName ?? "",
      brand: bike.brand ?? "",
      model: bike.model ?? "",
      registrationNumber: bike.registrationNumber ?? "",
      bikeType: bike.bikeType ?? "Sports",
      pricePerHour: bike.pricePerHour ?? "",
      availability: bike.availability ?? true,
      color: bike.color ?? "",
      year: bike.year ?? new Date().getFullYear(),
    });
    setMessage("");
    setModal(true);
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function saveBike(event) {
    event.preventDefault();
    setMessage("");

    const payload = {
      ...form,
      pricePerHour: Number(form.pricePerHour),
      year: Number(form.year),
      availability: Boolean(form.availability),
    };

    try {
      const response = await fetch(
        editingId !== null
          ? `${API}/Update/${editingId}`
          : `${API}/Post`,
        {
          method: editingId !== null ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Save failed (${response.status})`);
      }

      setModal(false);
      setMessage(editingId !== null ? "Bike updated successfully!" : "Bike added successfully!");
      await loadBikes();
    } catch (error) {
      setMessage(error.message || "Unable to save bike.");
    }
  }

  async function deleteBike(id) {
    if (!window.confirm("Are you sure you want to delete this bike?")) return;

    try {
      const response = await fetch(`${API}/Delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      setBikes((previous) => previous.filter((bike) => bike.bikeId !== id));
      setMessage("Bike deleted successfully!");
    } catch (error) {
      setMessage(error.message || "Unable to delete bike.");
    }
  }

  const availableCount = bikes.filter((bike) => bike.availability === true).length;

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">
          <span className="logo-icon">🏍</span>
          <span>Bike<span className="orange">Rental</span>
            <small>RIDE MORE · PAY LESS</small>
          </span>
        </a>

        <nav>
          <a className="nav-active" href="#home">⌂ Home</a>
          <a href="#bikes">🏍 Bikes</a>
          <a href="#bikes" onClick={() => setFilter("Available")}>▣ Available</a>
          <a href="#footer">ⓘ About</a>
        </nav>

        <a className="rent-button" href="#bikes">Explore Bikes ↗</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">EXPLORE &nbsp;•&nbsp; TRAVEL &nbsp;•&nbsp; RIDE</p>
            <h1>PREMIUM BIKE<br /><span>RENTAL SERVICE</span></h1>
            <p className="hero-description">
              Find your perfect ride for your next adventure.
            </p>
            <p className="hero-features">Safe <span>|</span> Affordable <span>|</span> Reliable</p>
            <a className="primary-button" href="#bikes">Browse Bikes&nbsp; →</a>
          </div>
          <div className="hero-badges">
            <div><span>✓</span><p><b>Verified Bikes</b><small>Well maintained</small></p></div>
            <div><span>₹</span><p><b>Best Prices</b><small>Affordable rentals</small></p></div>
            <div><span>◉</span><p><b>Support</b><small>Here to help</small></p></div>
          </div>
        </section>

        <section className="bike-section" id="bikes">
          <div className="section-top">
            <div className="section-heading">
              <span className="heading-icon">🏍</span>
              <div>
                <h2>Our <span className="orange">Bikes</span></h2>
                <p>Find the ride that matches your style.</p>
              </div>
            </div>
            <div className="toolbar">
              <input
                className="search-input"
                placeholder="⌕  Search by name, brand or model..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button className="primary-button add-button" onClick={openAdd}>＋ Add Bike</button>
            </div>
          </div>

          <div className="stats">
            <div><span>Total Bikes</span><b>{bikes.length}</b></div>
            <div><span>Available</span><b className="green-text">{availableCount}</b></div>
            <div><span>Currently Unavailable</span><b className="red-text">{bikes.length - availableCount}</b></div>
          </div>

          <div className="filter-row">
            {["All", "Available", "Unavailable"].map((item) => (
              <button
                key={item}
                className={`filter-button ${filter === item ? "selected" : ""}`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
            <button className="refresh-button" onClick={loadBikes}>↻ Refresh</button>
          </div>

          {message && <div className="notice">{message}</div>}

          {loading ? (
            <div className="empty-state">Loading bikes...</div>
          ) : filteredBikes.length === 0 ? (
            <div className="empty-state">
              <span>🏍</span>
              <h3>No bikes found</h3>
              <p>Add a bike or change your search filters.</p>
              <button className="primary-button" onClick={openAdd}>＋ Add Your First Bike</button>
            </div>
          ) : (
            <div className="bike-grid">
              {filteredBikes.map((bike, index) => (
                <article className="bike-card" key={bike.bikeId}>
                  <div className="bike-image">
                    <img
                      src={bikeImages[index % bikeImages.length]}
                      alt={`${bike.brand} ${bike.model}`}
                    />
                    <span className={`availability ${bike.availability ? "is-available" : "is-unavailable"}`}>
                      <span className="status-dot"></span>
                      {bike.availability ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="bike-details">
                    <div className="bike-title-row">
                      <div>
                        <h3>{bike.bikeName}</h3>
                        <p>{bike.brand} · {bike.model}</p>
                      </div>
                      <span className="bike-id">#{bike.bikeId}</span>
                    </div>

                    <div className="price">₹ {bike.pricePerHour ?? 0} <small>/ hour</small></div>

                    <div className="bike-specs">
                      <span>◈ {bike.bikeType || "Bike"}</span>
                      <span>● {bike.color || "—"}</span>
                      <span>▦ {bike.year || "—"}</span>
                    </div>

                    <p className="registration">Registration: {bike.registrationNumber || "—"}</p>

                    <div className="card-actions">
                      <button className="edit-button" onClick={() => openEdit(bike)}>✎ Edit</button>
                      <button className="delete-button" onClick={() => deleteBike(bike.bikeId)}>▤ Delete</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer id="footer">
        <span>🏍 Bike<span className="orange">Rental</span></span>
        <p>Your next adventure starts here.</p>
        <small>Bike Rental Management · React + Spring Boot</small>
      </footer>

      {modal && (
        <div className="modal-backdrop" onClick={(event) => {
          if (event.target === event.currentTarget) setModal(false);
        }}>
          <div className="bike-modal">
            <div className="modal-header">
              <div>
                <p className="eyebrow">BIKE MANAGEMENT</p>
                <h2>{editingId !== null ? "Edit Bike" : "Add New Bike"}</h2>
              </div>
              <button className="close-button" onClick={() => setModal(false)}>✕</button>
            </div>

            <form onSubmit={saveBike}>
              <div className="form-grid">
                <label>Bike Name *
                  <input name="bikeName" value={form.bikeName} onChange={handleChange} required />
                </label>
                <label>Brand *
                  <input name="brand" value={form.brand} onChange={handleChange} required />
                </label>
                <label>Model *
                  <input name="model" value={form.model} onChange={handleChange} required />
                </label>
                <label>Registration Number *
                  <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} required />
                </label>
                <label>Bike Type
                  <select name="bikeType" value={form.bikeType} onChange={handleChange}>
                    <option>Sports</option>
                    <option>Cruiser</option>
                    <option>Adventure</option>
                    <option>Commuter</option>
                    <option>Scooter</option>
                    <option>Electric</option>
                  </select>
                </label>
                <label>Price Per Hour (₹) *
                  <input type="number" name="pricePerHour" min="0" step="0.01" value={form.pricePerHour} onChange={handleChange} required />
                </label>
                <label>Color
                  <input name="color" value={form.color} onChange={handleChange} />
                </label>
                <label>Year *
                  <input type="number" name="year" min="1900" max="2100" value={form.year} onChange={handleChange} required />
                </label>
              </div>

              <label className="availability-check">
                <input type="checkbox" name="availability" checked={form.availability} onChange={handleChange} />
                Bike is available for rental
              </label>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="primary-button">{editingId !== null ? "Save Changes" : "Add Bike"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

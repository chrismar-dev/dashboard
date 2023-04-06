import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
function Dashboard() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchCats() {
      const response = await axios.get("https://api.thecatapi.com/v1/breeds");
      setCats(response.data);
      setFilteredCats(response.data);
    }
    fetchCats();
  }, []);

  useEffect(() => {
    const filtered = cats.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCats(filtered);
  }, [searchTerm, cats]);

  useEffect(() => {
    const filtered = cats.filter((cat) =>
      cat.origin.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCats(filtered);
  }, [filter, cats]);

  const totalCats = filteredCats.length;
  const meanLifeSpan = Math.round(
    filteredCats.reduce((total, cat) => {
      const lifeSpan = parseInt(cat.life_span);
      return isNaN(lifeSpan) ? total : total + lifeSpan;
    }, 0) / totalCats
  );
  const medianWeight = findMedian(
    filteredCats.map((cat) => cat.weight.metric)
  );

  function findMedian(arr) {
    const sorted = arr.sort();
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  return (
    <div>
      <h1>Cat Breeds Dashboard</h1>
      <div>
        <h2>Summary Statistics</h2>
        <p>Total number of cats: {totalCats}</p>
        <p>Mean life span: {meanLifeSpan} years</p>
        <p>Median weight: {medianWeight} kg</p>
      </div>
      <div>
        <h2>Cat Breeds List</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Filter by origin</option>
          
          {[
            ...new Set(
              cats.map((cat) => cat.origin).filter((origin) => origin !== "")
            ),
          ].map((origin) => (
            <option key={origin} value={origin}>
              {origin}
            </option>
          ))}
          
        </select>
        <ul>
          {filteredCats.map((cat) => (
            <li key={cat.id}>
              <h3>{cat.name}</h3>
              <p>Origin: {cat.origin}</p>
              <p>Life span: {cat.life_span} years</p>
              <p>Weight: {cat.weight.metric} kg</p>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

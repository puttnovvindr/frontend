//Cell.jsx versi CityPage//

import React from "react";

// Peta nama kota ke nama file gambar
const cityImages = {
  Azure: "/assets/gedungBiru02.png",
  Zenith: "/assets/gedungMerah.jpg",
  Apex: "/assets/poorMarket.jpg",
  Vertex: "/assets/fancyBuilding.jpg",
  Nexus: "/assets/blueMarket.jpg",
  Haven: "/assets/brownHouse.jpg",
  Solace: "/assets/blueBuilding.jpg",
  Beacon: "/assets/greenMarket.jpg",
  Summit: "/assets/orangeHouse.jpg",
  Horizon: "/assets/prettyBuilding.jpg",
  Pinnacle: "/assets/pinnacle.jpg",
  Spire: "/assets/spire.jpg",
  Ardent: "/assets/ardent.jpg",
  Aurora: "/assets/aurora.jpg",
  Eclipse: "/assets/eclipse.jpg",
  Genesis: "/assets/genesis.jpg",
  Mirage: "/assets/mirage.jpg",
  Nimbus: "/assets/nimbus.jpg",
  Arcadia: "/assets/arcadia.jpg",
  Serene: "/assets/serene.jpg",
  Cascade: "/assets/cascade.jpg",
  Paradigm: "/assets/paradigm.jpg",
  Radiant: "/assets/radiant.jpg",
};

const Cell = ({ value, onChange, validCities }) => {
  const handleChange = (e) => {
    const selectedCity = e.target.value;

    onChange(selectedCity);
  };

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        textAlign: "center",
        border: "1px solid #ccc",
        position: "relative",
        backgroundColor: value ? "white" : "transparent", 
      }}
    >
      {value && cityImages[value] ? (
        <img
          src={cityImages[value]}
          alt={value}
          style={{
            width: "80%",
            height: "80%",
            objectFit: "contain",
            position: "absolute",
            top: "10%", 
            left: "10%", 
          }}
        />
      ) : null}

<select
  value={value}
  onChange={handleChange}
  style={{
    width: "100%",
    height: "100%",
    opacity: value ? 0 : 1,
    zIndex: value ? -1 : 1,
    textAlign: "center",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "12px",
    overflowY: "scroll",
  }}
>
  <option value="">--Select--</option>
  {validCities.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
</select>

    </div>
  );
};

export default Cell;
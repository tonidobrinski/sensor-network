// app/api/telescopes/db.ts

export type Telescope = {
  id: number;
  name: string;
  network: string;
  location: string;
  latitude: number;
  longitude: number;
  elevation: number;
  status: string;
  lastObservation: string;
  image?: string;
  description?: string;
};

export type Task = { id: number; name: string; date: string };

export const telescopes: Telescope[] = [
  {
    id: 1,
    name: "Hubble Space Telescope",
    network: "NASA",
    location: "Earth Orbit",
    latitude: 28.5,
    longitude: -80.6,
    elevation: 0,
    status: "Active",
    lastObservation: "2025-03-01",
    image: "/hubble.jpeg",
    description: "Hubble is a space telescope launched by NASA.",
  },
  {
    id: 2,
    name: "Very Large Telescope",
    network: "ESO",
    location: "Chile",
    latitude: -24.6,
    longitude: -70.4,
    elevation: 2635,
    status: "Offline",
    lastObservation: "2025-03-05",
    image: "/vlt.jpg",
    description:
      "The Very Large Telescope (VLT) is operated by ESO in Chile.",
  },
  {
    id: 3,
    name: "Keck Observatory",
    network: "Mauna Kea",
    location: "Hawaii",
    latitude: 19.8,
    longitude: -155.5,
    elevation: 4205,
    status: "Active",
    lastObservation: "2025-02-15",
    image: "/keck.png",
    description:
      "The Keck Observatory consists of two large telescopes in Hawaii.",
  },
];

export const tasksDB: Record<number, Task[]> = {
  1: [{ id: 101, name: "Galaxy Survey", date: "2025-04-01" }],
  2: [{ id: 102, name: "Exoplanet Study", date: "2025-04-10" }],
  3: [{ id: 103, name: "Supernova Observation", date: "2025-03-25" }],
};

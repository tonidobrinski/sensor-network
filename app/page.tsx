"use client";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ObservatoryMap from "./components/ObservatoryMap";
import TelescopeTable from "./components/TelescopeTable";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Header />
      <ObservatoryMap />
      <TelescopeTable />
    </div>
  );
}

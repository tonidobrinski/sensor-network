import NavBar from "./components/NavBar";
import ObservatoryMap from "./components/ObservatoryMap";
import TelescopeTable from "./components/TelescopeTable";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1>Observatory Network</h1>
      <ObservatoryMap />
      <TelescopeTable />
    </div>
  );
}

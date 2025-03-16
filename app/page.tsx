import ObservatoryMap from "./components/ObservatoryMap";
import TelescopeTable from "./components/TelescopeTable";

export default function Home() {
  return (
    <div>
      <h1>Observatory Network</h1>
      <ObservatoryMap />
      <TelescopeTable />
    </div>
  );
}

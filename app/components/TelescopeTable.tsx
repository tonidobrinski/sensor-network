"use client";

import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const fetchTelescopes = async () => {
  const response = await axios.get("/api/telescopes");
  return response.data;
};

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "network", headerName: "Network", flex: 1 },
  { field: "location", headerName: "Location", flex: 1 },
  { field: "latitude", headerName: "Latitude", flex: 1 },
  { field: "longitude", headerName: "Longitude", flex: 1 },
  { field: "elevation", headerName: "Elevation (m)", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "lastObservation", headerName: "Last Observation", flex: 1 },
];

const TelescopeTable = () => {
  const router = useRouter();
  const { data: telescopes = [], isLoading } = useQuery({
    queryKey: ["telescopes"],
    queryFn: fetchTelescopes,
    refetchInterval: 5000,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box sx={{ height: 400, width: "100%", mt: 4 }}>
      <DataGrid
        rows={telescopes}
        columns={columns}
        pageSizeOptions={[5, 10]}
        onRowClick={(row) => router.push(`/telescopes/${row.id}`)}
      />
    </Box>
  );
};

export default TelescopeTable;

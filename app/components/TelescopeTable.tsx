"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

const fetchTelescopes = async () => {
  const response = await axios.get("/api/telescopes");
  return response.data;
};

const TelescopeTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selectedTelescope, setSelectedTelescope] = useState<TelescopeDetails>();
  const { user } = useContext(AuthContext)!;

  const { data: telescopes = [], isLoading } = useQuery({
    queryKey: ["telescopes"],
    queryFn: fetchTelescopes,
    refetchInterval: 5000,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete("/api/telescopes", { data: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["telescopes"]);
      setOpen(false);
    },
  });

  const handleDeleteClick = (telescope: TelescopeDetails) => {
    setSelectedTelescope(telescope);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTelescope) {
      deleteMutation.mutate(selectedTelescope.id);
    }
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
    ...(user
      ? [
          {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteClick(params.row)}
              >
                Delete
              </Button>
            ),
          },
        ]
      : []),
  ];

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box sx={{ height: "auto", width: "100%", mt: 4 }}>
      <DataGrid
        rows={telescopes}
        columns={columns}
        pageSizeOptions={[5, 10]}
        onCellClick={(params) => {
          if (params.field === "name") {
            router.push(`/telescopes/${params.row.id}`);
          }
        }}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete
          <strong>{selectedTelescope?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TelescopeTable;

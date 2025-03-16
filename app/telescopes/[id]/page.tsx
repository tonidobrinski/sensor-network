"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const TelescopeDetails = () => {
  const { id } = useParams();
  const [telescope, setTelescope] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    await axios.get(`/api/telescopes/${id}`).then((res) => {
      console.log(res.data);
      setTelescope(res.data);
    });
    await axios
      .get(`/api/telescopes/${id}/tasks`)
      .then((res) => setTasks(res.data));
  };

  useEffect(() => {
    if (id) {
      fetchData();
      console.log("RESPONSE: ", id);
    }
  }, [id, refresh]);

  const handleRefetch = () => {
    setRefresh((prev) => !prev);
  };

  if (!telescope) return <p>Loading...</p>;

  return (
    <Box sx={{ p: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4">{telescope.name}</Typography>
          <img
            src={telescope.image}
            alt={telescope.name}
            width="100%"
            style={{ borderRadius: 8, marginTop: 16 }}
          />
          <Typography variant="body1">Network: {telescope.network}</Typography>
          <Typography variant="body1">
            Location: {telescope.location}
          </Typography>
          <Typography variant="body1">
            Latitude: {telescope.latitude}
          </Typography>
          <Typography variant="body1">
            Longitude: {telescope.longitude}
          </Typography>
          <Typography variant="body1">
            Elevation: {telescope.elevation}m
          </Typography>
          <Typography variant="body1">Status: {telescope.status}</Typography>
          <Typography variant="body1">
            Last Observation: {telescope.lastObservation}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {telescope.description}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Scheduled Observations</Typography>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card key={task.id} sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="body1">{task.name}</Typography>
                <Typography variant="body2">{task.date}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No upcoming tasks.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleRefetch}>
          Refetch Data
        </Button>
      </Box>
    </Box>
  );
};

export default TelescopeDetails;

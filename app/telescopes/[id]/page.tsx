"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import "../../styles/components/TelescopeDetails.scss";

const TelescopeDetails = () => {
  const { id } = useParams();
  const [telescope, setTelescope] = useState([]);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

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
    }
  }, [id]);

  const handleRedirect = () => {
    router.push("/");
  };

  if (!telescope) return <p>Loading...</p>;

  return (
    <Box sx={{ p: 4 }} className="detail-page">
      <Card>
        <CardContent className="card-content">
          <div className="detail-header">
            <Typography variant="h4">{telescope.name}</Typography>
          </div>
          <img
            src={telescope.image}
            alt={telescope.name}
            width="100%"
            className="telescopes_image"
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
        <Typography variant="h5" className="section-title">
          Scheduled Observations
        </Typography>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card key={task.id} className="task-card">
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

      <Box sx={{ mt: 4 }} className="back-button">
        <Button variant="contained" onClick={handleRedirect}>
          Back to Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default TelescopeDetails;

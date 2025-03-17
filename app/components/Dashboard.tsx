"use client";
import { useRouter } from "next/navigation";
import { Button, Container, Typography } from "@mui/material";

export default function Dashboard() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" sx={{ mt: 4 }}>
        Welcome to the Dashboard!
      </Typography>
      <Button onClick={() => router.push("/")} variant="contained" color="secondary" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Container>
  );
}

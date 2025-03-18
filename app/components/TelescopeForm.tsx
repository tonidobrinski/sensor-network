"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import "../styles/components/TelescopeForm.scss";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  latitude: yup.number().required("Latitude is required"),
  longitude: yup.number().required("Longitude is required"),
  network: yup.string().required("Network is required"),
  elevation: yup.number().required("Elevation is required"),
});

const TelescopeForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [successMessage, setSuccessMessage] = useState<string>("");

  const onSubmit = async (data: TelescopeDetails) => {
    try {
      await axios.post("/api/telescopes", data);
      setSuccessMessage("Telescope added successfully!");
      reset();
      queryClient.invalidateQueries(["telescopes"]);
      router.push("/");
    } catch (error) {
      console.error("Error adding telescope:", error);
    }
  };

  return (
    <div className="telescope-form">
      <h1>Add a New Telescope</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Telescope Name" />
        <p>{errors.name?.message}</p>

        <input {...register("network")} placeholder="Network" />
        <p>{errors.network?.message}</p>

        <input {...register("location")} placeholder="Location" />
        <p>{errors.location?.message}</p>

        <input type="number" {...register("latitude")} placeholder="Latitude" />
        <p>{errors.latitude?.message}</p>

        <input
          type="number"
          {...register("longitude")}
          placeholder="Longitude"
        />
        <p>{errors.longitude?.message}</p>

        <input
          type="number"
          {...register("elevation")}
          placeholder="Elevation"
        />
        <p>{errors.elevation?.message}</p>

        <button type="submit">Add Telescope</button>
      </form>
    </div>
  );
};

export default TelescopeForm;

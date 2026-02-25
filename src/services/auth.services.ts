import { httpClient } from "@/lib/axios/httpClient";

const getDoctor = async () => {
  const doctor = await httpClient.get("/doctor");
  return doctor;
};

export const authServices = {
  getDoctor,
};
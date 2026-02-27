"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const getDoctor = async () => {
  const doctor = await httpClient.get("/doctors");
  return doctor;
};
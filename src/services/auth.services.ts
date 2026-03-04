import { httpClient } from "@/lib/axios/httpClient";

export interface IDoctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

export const getDoctor = async () => {
  const doctors = await httpClient.get<IDoctor[]>("/doctors");
  return doctors.data;
};

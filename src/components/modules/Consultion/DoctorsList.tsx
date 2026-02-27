/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getDoctor } from "@/app/(commonLayout)/consultion/_actions";
import { useQuery } from "@tanstack/react-query";

export default function DoctorsList() {
    const { data } = useQuery({
        queryKey: ["doctor"],
        queryFn: getDoctor,
    });
    console.log(data);
    return (
        <div>
            <h1>Doctors List</h1>
            <div className="flex flex-col gap-10">{data?.data?.map((doctor: any) => (
                <div className="border border-gray-300 p-4 rounded-lg mt-10" key={doctor.id}>
                    <h2>{doctor.user.name}</h2>
                    <p>{doctor.user.email}</p>
                    <p>{doctor.user.contactNumber}</p>
                    <p>{doctor.user.address}</p>
                    <p>{doctor.user.registrationNumber}</p>
                    <p>{doctor.user.experience}</p>
                    <p>{doctor.user.gender}</p>
                    <p>{doctor.user.appointmentFee}</p>
                    <p>{doctor.user.qualification}</p>
                    <p>{doctor.user.currentWorkingPlace}</p>
                    <p>{doctor.user.designation}</p>
                    <p>{doctor.user.averageRating}</p>
                    <p>{doctor.user.createdAt}</p>
                    <p>{doctor.user.updatedAt}</p>
                    <p>{doctor.user.userId}</p>
                    <p>{doctor.user.user}</p>
                    <p>{doctor.user.specialties}</p>
                </div>
                ))}</div>
        </div>
    )
}
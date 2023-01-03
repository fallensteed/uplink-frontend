/* eslint-disable @typescript-eslint/no-explicit-any */
import { Affiliation, Grade } from "common/types/user.types";
import { API_URL } from "../../../config/api";

export interface User {
    _id: string;
    p1Username: string;
    uplinkUsername: string;
    firstName: string;
    lastName: string;
    middleInitial?: string;
    dodin: string;
    email: string;
    affiliation: Affiliation;
    rank: Grade;
    alias?: string;
    birthday?: string;
    admin: Admin;
    sensitiveInformation?: SensitiveInformation;
}

export interface Admin {
    superAdmin?: boolean;
    uplink?: boolean;
    pii?: boolean;
    istApp?: boolean;
}

export interface SensitiveInformation {
    ssn: number;
}

export const USER_URL = `${API_URL}/common/user`;

export const user_self = async (): Promise<any> => {
    const response = await fetch(`${USER_URL}/self`, { method: "POST" });
    return response.json();
};

export const user_getByUsername = async (username: string): Promise<any> => {
    const response = await fetch(`${USER_URL}/${username}`);
    return response.json();
};

export const user_patchByUserId = async (data: User): Promise<any> => {
    const response = await fetch(`${USER_URL}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

/* eslint-disable @typescript-eslint/no-explicit-any */
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
    affiliation: string;
    rank: string;
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

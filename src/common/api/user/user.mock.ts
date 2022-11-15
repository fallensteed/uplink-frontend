import { User } from "./user.api";


export const mockUser1: User = {
    _id: "604013826726407dcc527ece",
    p1Username: "jdoe",
    uplinkUsername: "squirrelmaster",
    firstName: "John",
    lastName: "Doe",
    dodin: "1234567890",
    email: "john@mail.mil",
    affiliation: "US Space Force",
    rank: "O-3",
    alias: "JD",
    admin: {
        superAdmin: true,
        uplink: true,
        pii: true,
    },
};

export const mockUser2: User = {
    _id: "6074ce181b6933b04c4d3114",
    firstName: "Cyzarine",
    lastName: "Molotoff",
    dodin: "9876543210",
    email: "cyzarine.molotoff.2@spaceforce.mil",
    rank: "O-1",
    affiliation: "US Space Force",
    p1Username: "cyzMolo",
    uplinkUsername: "molotoss",
    admin: {
        superAdmin: false,
        uplink: false,
        pii: false,
    },
};
export interface UplinkUser {
    _id: string;
    userId: string;
    verificationStatus: "not-requested" | "requested" | "denied" | "verified";
    displayName?: string;
    default: "username" | "verified";
    followers?: string[];
    savedPosts?: string[];
    favCommunities?: string[];
    favUsers?: string[];
}

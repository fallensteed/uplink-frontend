import { API_URL } from "../../../../config/api";

export interface Comment {
    _id: string;
    text: string;
    commentOn?: string;
    post: string;
    user: string;
    upVotes?: string[];
    downVotes?: string[];
    editHistory?: CommentEditHistory[];
}

export interface CommentEditHistory {
    text: string;
    updatedAt: Date;
}

export const UPLINK_COMMENT_URL = `${API_URL}/uplink/comment`;

export const comment_getAll = async (): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMENT_URL}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const comment_getAllByPost = async (postId: string): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMENT_URL}/p/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const comment_getById = async (id: string): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMENT_URL}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const comment_postOne = async (data: Comment): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMENT_URL}/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const comment_patchById = async (data: Comment): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMENT_URL}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

export const comment_deleteById = async (id: string): Promise<any> => {
    const response = await fetch(`${UPLINK_COMMENT_URL}/`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    });
    return response.json();
};

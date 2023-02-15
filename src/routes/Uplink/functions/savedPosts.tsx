import { uplink_user_patch } from "../api/user/uplinkUser.api";
import { UplinkUser } from "../types/uplinkUser.interface";

export const savePost = async (uplinkUserId: string, savedPosts: string[] = [], addPost: string) => {
    const newSavedPosts = [...savedPosts];
    newSavedPosts.push(addPost);
    const data = {
        _id: uplinkUserId,
        savedPosts: newSavedPosts,
    } as UplinkUser;
    const response = await uplink_user_patch(data);
    return response;
};

export const unsavePost = async (uplinkUserId: string, savedPosts: string[] = [], removePost: string) => {
    const newSavedPosts = [...savedPosts];
    const index = newSavedPosts.indexOf(removePost);
    newSavedPosts.splice(index, 1);
    const data = {
        _id: uplinkUserId,
        savedPosts: newSavedPosts,
    } as UplinkUser;
    const response = await uplink_user_patch(data);
    return response;
};

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { uplink_user_self_2 } from "routes/Uplink/api/user/uplink_user.api";
import { UplinkUser } from "routes/Uplink/types/uplinkUser.interface";
import { User, user_self } from "../../api/user/user.api";

interface UserContextData {
    profile: User;
    uplink: UplinkUser;
    isLoading: boolean;
    getUserProfile: () => void;
}

const userProfileDefaultValue: User = {
    _id: "",
    p1Username: "",
    uplinkUsername: "",
    firstName: "",
    lastName: "",
    dodin: "",
    email: "",
    affiliation: "US Space Force",
    rank: "E-1",
    alias: "",
    admin: {},
};

const uplinkDefaultValue: UplinkUser = {
    _id: "",
    userId: "",
    verificationStatus: "not-requested",
    default: "username",
};

export const userContextDefaultValue = {
    profile: userProfileDefaultValue,
    uplink: uplinkDefaultValue,
    isLoading: true,
    getUserProfile: () => null,
};

const useProvideUser = () => {
    const [profile, setProfile] = useState<User>(userContextDefaultValue.profile);
    const [uplink, setUplink] = useState<UplinkUser>(userContextDefaultValue.uplink);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getData = () => {
        getUserProfile();
    };

    const getUserProfile = useCallback(() => {
        setIsLoading(true);
        user_self()
            .then((response) => {
                setProfile(response.data);
            })
            .then(() => {
                uplink_user_self_2().then((response2) => {
                    setUplink(response2.data);
                });
            })
            .finally(() => {
                return;
            });
    }, [setProfile]);

    useEffect(() => getData(), []);

    useEffect(() => {
        if (profile._id && uplink._id) setIsLoading(false);
    }, [profile, uplink]);

    return useMemo(
        () => ({ profile, uplink, isLoading, getUserProfile }),
        [profile, uplink, isLoading, getUserProfile],
    );
};

const UserContext = createContext<UserContextData>(userContextDefaultValue);

export const useUser = () => {
    return useContext(UserContext);
};

export const ProvideUser = (props: { children: ReactNode }) => {
    const { children } = props;
    const user = useProvideUser();
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

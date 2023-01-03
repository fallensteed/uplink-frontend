import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UplinkUser, uplink_user_self_2 } from "../../../routes/Uplink/api/user/uplink_user.api";

interface UplinkUserContextData {
    userData: UplinkUser;
    isLoading: boolean;
    getUplinkUser: () => void;
}

const uplinkUserContextDefaultValue: UplinkUserContextData = {
    userData: { _id: "", userId: "", verificationStatus: "not-requested", default: "username" },
    isLoading: true,
    getUplinkUser: () => null,
};

const useProvideUplinkUser = () => {
    const [userData, setUserData] = useState<UplinkUser>(uplinkUserContextDefaultValue.userData);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getUplinkUser = useCallback(() => {
        uplink_user_self_2()
            .then((response) => setUserData(response.data))
            .finally(() => setIsLoading(false));
    }, [setUserData]);

    useEffect(() => getUplinkUser(), []);

    return useMemo(
        () => ({
            userData,
            isLoading,
            getUplinkUser,
        }),
        [userData, isLoading, getUplinkUser],
    );
};

const UplinkUserContext = createContext<UplinkUserContextData>(uplinkUserContextDefaultValue);

export const useUplinkUser = () => {
    return useContext(UplinkUserContext);
};

export const ProvideUplinkUser = (props: { children: ReactNode }) => {
    const { children } = props;
    const uplinkUser = useProvideUplinkUser();
    return <UplinkUserContext.Provider value={uplinkUser}>{children}</UplinkUserContext.Provider>;
};

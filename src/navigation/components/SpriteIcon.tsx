import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import { FC, useContext } from "react";
import { UserContext } from "../../routes/Root";
import SVG from 'react-inlinesvg'

const SpriteIcon: FC = () => {
    const user = useContext(UserContext);
    const svg = createAvatar(style, { seed: `${user?.firstName}${user?.lastName}` });
    return <SVG src={svg} width={24} height="auto" title="Sprite" />;
};

export default SpriteIcon;

import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import { FC } from "react";
import SVG from "react-inlinesvg";

interface SpriteIconProps {
    seed: string;
    size: number;
}

const SpriteIcon: FC<SpriteIconProps> = (props: SpriteIconProps) => {
    const { seed, size } = props;
    const svg = createAvatar(style, { seed: seed });
    return <SVG src={svg} width={size} height={size} title="Sprite" />;
};

export default SpriteIcon;

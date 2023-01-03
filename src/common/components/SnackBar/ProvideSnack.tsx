import { useSnackbar, VariantType } from "notistack";

const useSnack = () => {
    const { enqueueSnackbar } = useSnackbar();

    const openSnack = (variant: VariantType, message: string) => {
        enqueueSnackbar(message, { variant });
    };

    return openSnack;
};

export default useSnack;

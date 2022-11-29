import { Box, Button, CircularProgress, Container, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import formInitialValues from "./FormModel/formInitialValues";
import istFormModel from "./FormModel/istFormModel";
import AddressForm from "./Forms/AddressForm";
import ContactForm from "./Forms/ContactForm";
import ExperienceForm from "./Forms/experienceForm";
import PersonalForm from "./Forms/PersonalForm";
import SecurityForm from "./Forms/SecurityForm";
import SpouseForm from "./Forms/SpouseForm";
import UnitForm from "./Forms/UnitForm";
import USSFForm from "./Forms/USSFForm";

const steps = [
    "Personal Data",
    "Contact Data",
    "Experience",
    "Address",
    "Security",
    "USSF Job",
    "Spouse",
    "Current Unit",
];
const { formId, formField } = istFormModel;

function _renderStepContent(step: any) {
    switch (step) {
        case 0:
            return <PersonalForm />;
        case 1:
            return <ContactForm />;
        case 2:
            return <ExperienceForm />;
        case 3:
            return <AddressForm />;
        case 4:
            return <SecurityForm />;
        case 5:
            return <USSFForm />;
        case 6:
            return <SpouseForm />;
        case 7:
            return <UnitForm />;
        default:
            return <Typography>Not Found</Typography>;
    }
}

const ISTForm: FC = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms: any) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function _submitForm(values: any, actions: any) {
        await _sleep(1000);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);

        setActiveStep(activeStep + 1);
    }

    function _handleSubmit(values: any, actions: any) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (
        <Container maxWidth="lg">
            <Typography component="h1" variant="h4" align="center">
                IST Application
            </Typography>
            <Paper
                sx={{
                    backgroundColor: theme.palette.backgroundLight.main,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    p: theme.spacing(2),
                    m: theme.spacing(3),
                }}
            >
                <Box sx={{ width: 250 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box sx={{ width: 1000 }}>
                    {activeStep === steps.length ? (
                        <Typography>You completed all the steps</Typography>
                    ) : (
                        <Formik initialValues={formInitialValues} onSubmit={_handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form id={formId}>
                                    {_renderStepContent(activeStep)}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            p: theme.spacing(2),
                                            width: "100%",
                                        }}
                                    >
                                        {activeStep !== 0 && <Button onClick={_handleBack}>Back</Button>}
                                        <Box>
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                {isLastStep ? "Submit" : "Next"}
                                            </Button>
                                            {isSubmitting && <CircularProgress size={24} />}
                                        </Box>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default ISTForm;

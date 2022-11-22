import { Button, CircularProgress, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { FC, useState } from "react";
import formInitialValues from "./FormModel/formInitialValues";
import istFormModel from "./FormModel/istFormModel";
import ContactForm from "./Forms/ContactForm";
import PersonalForm from "./Forms/PersonalForm";

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
            return <PersonalForm formField={formField} />;
        case 1:
            return <ContactForm />;
        default:
            return <Typography>Not Found</Typography>;
    }
}

const ISTForm: FC = () => {
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
        <React.Fragment>
            <Typography component="h1" variant="h4" align="center">
                IST Application
            </Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                    <Typography>You completed all the steps</Typography>
                ) : (
                    <Formik initialValues={formInitialValues} onSubmit={_handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form id={formId}>
                                {_renderStepContent(activeStep)}

                                <div>
                                    {activeStep !== 0 && <Button onClick={_handleBack}>Back</Button>}
                                    <div>
                                        <Button
                                            disabled={isSubmitting}
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            {isLastStep ? "Place order" : "Next"}
                                        </Button>
                                        {isSubmitting && <CircularProgress size={24} />}
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </React.Fragment>
        </React.Fragment>
    );
};

export default ISTForm;

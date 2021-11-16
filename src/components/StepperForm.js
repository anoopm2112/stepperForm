import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, Grid } from '@mui/material';
import IntroForm from './IntroForm';
import BasicForm from './BasicForm';
import Remarks from './Remarks';
import { withFormik } from 'formik'
import * as yup from 'yup';

const steps = ['Intro Form', 'Basic Details', 'Remarks'];

const validationSchema = yup.object({
    name: yup
        .string('Enter your name').min(3)
        .required('name is required'),
    about: yup
        .string('Enter About').min(3),
    remarks: yup
        .string('Enter Remarks').min(3)
        .required('remarks is required'),
});


const StepperForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
        ThemeSwitcher,
        setTouched
    } = props;
    console.log({ props });
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    console.log({ values });
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        if (activeStep === steps.length - 1) {
            handleSubmit()
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const returnForms = (active) => {
        switch (active) {
            case 0: return <IntroForm formik={{ values, handleChange, touched, errors, setTouched }} />
            case 1: return <BasicForm formik={{ values, handleChange, touched, errors, setTouched }} />
            case 2: return <Remarks formik={{ values, handleChange, touched, errors, setTouched }} />
            default: return <IntroForm />
        }
    }

    const disableNext = () => {
        if (activeStep === 0 && (errors?.name || values.name === '')) {
            console.log('name error');
            return true
        } else if (activeStep === 1 && (errors?.about)) {
            return true
        } else if (activeStep === 2 && (errors?.remarks || values.remarks === '')) {
            return true
        } else {
            console.log('no error');
            return false
        }
    }
    React.useEffect(() => {

    }, [errors])

    return (
        <Card sx={{ width: '100%', padding: '50px', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <Grid sx={{ width: '100%', border: '1px solid black', margin: '10px', marginBottom: '50px', padding: '15px' }}>{ThemeSwitcher}</Grid>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <Grid sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '15px' }}>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
          </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginTop: 'auto' }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </Grid>
            ) : (
                <Grid sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '15px' }}>

                    {returnForms(activeStep)}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginTop: 'auto' }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
            </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext} disabled={disableNext()}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Grid>
            )}
        </Card>
    );
}

export default withFormik({
    mapPropsToValues: () => ({ name: '', about: '', remarks: '' }),
    validationSchema,
    validateOnBlur: true,
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    displayName: 'BasicForm',
})(StepperForm);
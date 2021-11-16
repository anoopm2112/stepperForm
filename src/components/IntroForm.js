import { Grid, TextField, Typography } from '@mui/material';
import React from 'react'

const IntroForm = ({ formik }) => {
    const handleChange = (val) => {
        formik.handleChange(val)
        formik.setTouched({ name: true })
    }
    return (

        <Grid sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center', margin: 'auto 0' }}>
            <Typography sx={{ textAlign: 'center', fontSize: '20px', padding: '10px' }}>
                Whats your sweet name
            </Typography>
            <TextField
                fullWidth
                id="name"
                name="name"
                label="name"
                value={formik.values.name}
                onChange={handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
        </Grid>
    )
}

export default IntroForm;

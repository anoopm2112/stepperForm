import { Grid, TextField, Typography } from '@mui/material';
import React from 'react'

const BasicForm = ({ formik }) => {
    console.log({ formik });
    return (
        <Grid sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center', margin: 'auto 0' }}>
            <Typography sx={{ textAlign: 'center', fontSize: '20px', padding: '10px' }}>
                Tell us about  yourself
            </Typography>
            <TextField
                fullWidth
                id="about"
                name="about"
                label="about"
                value={formik.values.about}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.about)}
                helperText={formik.touched.name && formik.errors.about}
            />

        </Grid>
    )
}

export default BasicForm;

import { Grid, TextField, Typography } from '@mui/material';
import React from 'react'

const Remarks = ({ formik }) => {
    return (

        <Grid sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center', margin: 'auto 0' }}>
            <Typography sx={{ textAlign: 'center', fontSize: '20px', padding: '10px' }}>
                Remarks
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={3}
                id="remarks"
                name="remarks"
                label="Remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.remarks)}
                helperText={formik.touched.name && formik.errors.remarks}
            />
        </Grid>
    )
}

export default Remarks;

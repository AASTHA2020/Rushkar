import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import { api } from '../services/api';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await api.getEmployeeById(id);
        setEmployee(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employee details');
        console.error('Error fetching employee:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !employee) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" gutterBottom>
            {error || 'Employee not found'}
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Back to List
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            {employee.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {employee.position}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography>{employee.email}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Department
            </Typography>
            <Typography>{employee.department}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Salary
            </Typography>
            <Typography>${employee.salary.toLocaleString()}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Date of Birth
            </Typography>
            <Typography>{new Date(employee.dob).toLocaleDateString()}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Joining Date
            </Typography>
            <Typography>{new Date(employee.joiningDate).toLocaleDateString()}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Location
            </Typography>
            <Typography>{employee.location}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Last Increment Date
            </Typography>
            <Typography>{new Date(employee.lastIncrementDate).toLocaleDateString()}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Next Increment Date
            </Typography>
            <Typography>{new Date(employee.nextIncrementDate).toLocaleDateString()}</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Back to List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmployeeDetail; 
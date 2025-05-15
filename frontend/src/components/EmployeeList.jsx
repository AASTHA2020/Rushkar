import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';
import { api } from '../services/api';
import { encodeFilters, decodeFilters } from '../utils/urlUtils';
import debounce from 'lodash/debounce';

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'IT',
  'Customer Support'
];

const EmployeeList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0
  });

  const [filters, setFilters] = useState(() => {
    const encodedFilters = searchParams.get('filters');
    return encodedFilters ? decodeFilters(encodedFilters) : {
      search: '',
      department: [],
      minSalary: '',
      maxSalary: '',
      page: 1,
      pageSize: 10
    };
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getEmployees({
        search: filters.search,
        department: filters.department,
        minSalary: filters.minSalary,
        maxSalary: filters.maxSalary,
        page: filters.page,
        pageSize: filters.pageSize
      });
      setEmployees(response.employees);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch employees. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = debounce(fetchEmployees, 300);

  useEffect(() => {
    const encodedFilters = encodeFilters(filters);
    setSearchParams({ filters: encodedFilters });
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      page: 1 // Reset to first page on filter change
    }));
  };

  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
  };

  const handleViewEmployee = (id) => {
    navigate(`/employee/${id}`);
  };

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" mt={4}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Search by name or email"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                multiple
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
            <TextField
              fullWidth
              type="number"
              label="Min Salary"
              value={filters.minSalary}
              onChange={(e) => handleFilterChange('minSalary', e.target.value ? Number(e.target.value) : '')}
            />
          </Box>
          <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
            <TextField
              fullWidth
              type="number"
              label="Max Salary"
              value={filters.maxSalary}
              onChange={(e) => handleFilterChange('maxSalary', e.target.value ? Number(e.target.value) : '')}
            />
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee._id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>${employee.salary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleViewEmployee(employee._id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default EmployeeList; 
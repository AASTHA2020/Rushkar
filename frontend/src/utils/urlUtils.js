export const encodeFilters = (filters) => {
  return btoa(JSON.stringify(filters));
};

export const decodeFilters = (encodedFilters) => {
  try {
    return JSON.parse(atob(encodedFilters));
  } catch (error) {
    console.error('Error decoding filters:', error);
    return {
      search: '',
      department: [],
      minSalary: '',
      maxSalary: '',
      page: 1,
      pageSize: 10
    };
  }
}; 
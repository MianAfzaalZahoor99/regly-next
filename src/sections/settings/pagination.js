import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function Pagination({ page, count, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  const handleChangePage = (newPage) => {
    onPageChange(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   onRowsPerPageChange(parseInt(event.target.value, 10));
  //   onPageChange(0);
  // };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography>Page {page + 1} of {Math.ceil(count / rowsPerPage)}</Typography>
      </Box>
      <Box>
        <IconButton
          onClick={() => handleChangePage(0)}
          disabled={page === 0}
          aria-label="first page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={() => handleChangePage(Math.ceil(count / rowsPerPage) - 1)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPageIcon />
        </IconButton>
      </Box>
      <Box>
        <Typography>Go to Page</Typography>
        {/* Add your Go to Page component here */}
      </Box>
      <Box>
        <Typography>Records per page</Typography>
        {/* Add your Records per page component here */}
      </Box>
    </Box>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;

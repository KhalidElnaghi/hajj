import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useTranslate } from 'src/locales';
import { useLocale } from 'next-intl';

// Custom chevron icons using SVG
const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const ChevronDoubleLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 7.41L16.59 6l-6 6 6 6L18 16.59 12.83 12zm-7 0L9.59 6l-6 6 6 6L11 16.59 5.83 12z" />
  </svg>
);

const ChevronDoubleRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l1.41 1.41 6-6-6-6L6 7.41 10.59 12zm7 0l1.41 1.41 6-6-6-6L13 7.41 17.59 12z" />
  </svg>
);

interface CustomPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
}

export default function CustomPagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: CustomPaginationProps) {
  const { t } = useTranslate();
  const totalPages = Math.ceil(count / rowsPerPage);
  const currentPage = page + 1;
  const locale = useLocale();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i += 1) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // The useTable hook expects (event, newPage) signature
      onPageChange(null, newPage - 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1.5,
        px: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
        flexWrap: 'nowrap',
        minHeight: 52,
      }}
    >
      {/* Page info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 40,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1.5,
            overflow: 'hidden',
            minWidth: 130,
          }}
        >
          <Box
            sx={{
              px: 1.5,
              display: 'flex',
              alignItems: 'center',
              height: 1,
              borderRight: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {t('Label.page')}
          </Box>
          <TextField
            select
            variant="standard"
            value={currentPage}
            onChange={(event) => handlePageChange(Number(event.target.value))}
            InputProps={{ disableUnderline: true }}
            sx={{
              minWidth: 64,
              height: 1,
              '& .MuiInputBase-root': {
                height: 1,
                px: 1.5,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiSelect-select': {
                py: 0,
                textAlign: 'center',
              },
            }}
          >
            {Array.from({ length: totalPages }).map((_, idx) => (
              <MenuItem key={idx + 1} value={idx + 1} sx={{ fontSize: 14 }}>
                {idx + 1}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: 'nowrap', fontSize: 13, fontWeight: 500 }}
        >
          {t('Label.of').toUpperCase()} {totalPages}
        </Typography>
      </Box>

      {/* Pagination controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 0,
          flexShrink: 0,
          ml: 'auto',
          borderRadius: 1.5,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Previous button */}
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          sx={{
            color: 'text.primary',
            borderRadius: 0,
            minWidth: 68,
            height: 36,
            px: 1.5,
            fontSize: 13,
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box component="span" sx={{ ml: 0.5, fontSize: 13 }}>
            {t('Button.previous')}
          </Box>
        </IconButton>

        {/* Page numbers */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minWidth: 'fit-content',
          }}
        >
          {getPageNumbers().map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === '...' ? (
                <Box
                  sx={{
                    px: 0.75,
                    color: 'text.secondary',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 44,
                    height: 36,
                    fontSize: 13,
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  ...
                </Box>
              ) : (
                <Button
                  variant={pageNum === currentPage ? 'contained' : 'text'}
                  onClick={() => handlePageChange(pageNum as number)}
                  sx={{
                    minWidth: 44,
                    height: 36,
                    borderRadius: 0,
                    fontWeight: 500,
                    fontSize: 13,
                    lineHeight: 1,
                    px: 1.25,
                    color: pageNum === currentPage ? 'white' : 'text.primary',
                    bgcolor: pageNum === currentPage ? 'primary.main' : 'transparent',
                    borderLeft: '1px solid',
                    borderColor: pageNum === currentPage ? 'primary.main' : 'divider',
                    '&:hover': {
                      bgcolor: pageNum === currentPage ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  {pageNum}
                </Button>
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Next button */}
        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          sx={{
            color: 'text.primary',
            borderRadius: 0,
            minWidth: 68,
            height: 36,
            px: 1.5,
            fontSize: 13,
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box component="span" sx={{ mr: 0.5, fontSize: 13 }}>
            {t('Button.next')}
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
}

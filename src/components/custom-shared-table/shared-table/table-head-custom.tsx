import { useTranslate } from 'src/locales';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';

import { headCellType } from './types';

// ----------------------------------------------------------------------

type Props = {
  headLabel: headCellType[];
  headColor?: string;
};

export default function TableHeadCustom({ headLabel, headColor }: Props) {
  const { t } = useTranslate();
  return (
    <TableHead>
      <TableRow
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sx={{
              width: headCell.width,
              textWrap: 'nowrap',
              backgroundColor: 'transparent',
              color: 'text.secondary',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '12px',
              lineHeight: '150%',
              letterSpacing: '0.5px',
              border: 'none',
              borderBottom: '1px solid',
              borderColor: 'divider',
              padding: '12px 16px',
            }}
          >
            {headCell.id === 'rowsActions' ? (
              <Box
                component="img"
                src="/assets/icons/table/actions.svg"
                alt=""
                sx={{ width: 18, height: 18, display: 'block', mx: 'auto' }}
              />
            ) : (
              (() => {
                const label = headCell?.label;
                if (!label) return '';
                return label.includes('.') ? t(label) : label;
              })()
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

import styled from '@emotion/styled';

// mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

// mui icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const STableContainer = styled(TableContainer)`
  .bold {
    font-weight: 700;
  }
  .coin {
    width: 68px;
  }
  .remove-btn-cell {
    padding: 4px 16px;
  }
`

const SIconButton =  styled(IconButton)`
  padding: 8px;
`

export default function CoinTable(props) {
  return (
    <STableContainer component={Paper}>
      <Table aria-label="coin table">
        <TableHead>
          <TableRow>
            <TableCell className='bold coin'>Coin</TableCell>
            <TableCell className='bold'>Address</TableCell>
            <TableCell className='bold'>Balance</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.addresses.map((row) => (
            <TableRow
              key={row.uuid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.coin}
              </TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>
                {props.balances[row.uuid]}
              </TableCell>
              <TableCell 
                align="right"
                className="remove-btn-cell"
              >
                <SIconButton
                  aria-label="remove address" 
                  component="span"
                  onClick={()=>{props.removeAddress(row.uuid)}}
                >
                  <DeleteForeverIcon />
                </SIconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </STableContainer>
  );
}
import styled from "@emotion/styled";

// mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";

// mui icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// custom
import { CryptoIcon } from "../CryptoCoin";

// types
import { Uuid, AddressObj, BalanceObj } from "../../types";

const STableContainer = styled(TableContainer)`
  .bold {
    font-weight: 700;
  }
  .coin {
    width: 68px;
  }
  .coin-cell-content {
    display: inline-flex;
  }
  .address {
    width: 468px;
  }
  .remove-btn-cell {
    padding: 4px 16px;
  }
  .mobile-label {
    display: none;
  }
  @media (max-width: 768px) {
    thead.MuiTableHead-root {
      display: none;
    }
    .MuiTableBody-root .MuiTableRow-root {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid var(--divider);
    }
    .MuiTableCell-root {
      border-bottom: unset;
      padding: 8px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
    }
    .MuiTableCell-root:not(.remove-btn-cell){
      width: 80vw;
    }
    .mobile-label {
      display: block;
      font-weight: 700;
      margin-right: 8px;
    }
    .balance-cell{
      display: flex;
    } 
  }
`;

const SIconButton = styled(IconButton)`
  padding: 8px;
`;

type Props = {
  removeAddress: (uuid: Uuid) => void;
  addresses: AddressObj[];
  balances: BalanceObj;
};

export default function CoinTable(props: Props): JSX.Element {
  return (
    <STableContainer>
      <Table aria-label="coin table">
        <TableHead>
          <TableRow>
            <TableCell className="bold coin">Coin</TableCell>
            <TableCell className="bold address">Address</TableCell>
            <TableCell className="bold">Balance</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.addresses.map((row) => (
            <TableRow
              key={row.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className="coin-cell-content">
                  <CryptoIcon className={row.coin} /> {row.coin}
                </div>
              </TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell className="balance-cell">
                <span className="mobile-label">Balance: </span>
                {props.balances[row.uuid]}
              </TableCell>
              <TableCell align="right" className="remove-btn-cell">
                <SIconButton
                  aria-label="remove address"
                  onClick={() => {
                    props.removeAddress(row.uuid);
                  }}
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

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box,
    Pagination,
    Typography,
} from "@mui/material";

const TableComponent = ({
    columns = [],
    rows = [],
    actions = null,
    page,
    totalPages,
    onPageChange,
    loading = false,
    noDataText = "No records found.",
}) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.field}>{col.headerName}</TableCell>
                            ))}
                            {actions && <TableCell align="center">Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
                                    <Typography>Loading...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : rows.length > 0 ? (
                            rows.map((row) => (
                                <TableRow key={row._id || row.id}>
                                    {columns.map((col) => (
                                        <TableCell key={col.field}>
                                            {col.render ? col.render(row[col.field], row) : row[col.field]}
                                        </TableCell>
                                    ))}
                                    {actions && <TableCell align="center">{actions(row)}</TableCell>}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
                                    <Typography>{noDataText}</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {totalPages > 1 && (
                <Box mt={3} display="flex" justifyContent="center">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={onPageChange}
                        color="primary"
                    />
                </Box>
            )}
        </>
    );
}

export default TableComponent;

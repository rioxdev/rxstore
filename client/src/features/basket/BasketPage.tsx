import { Delete } from "@material-ui/icons";
import { Add, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/context";

export default function BasketPage() {

    const { basket, setBakset, removeItem } = useStoreContext();
    const [loading, setLoading] = useState(false);


    function handleAddItem(productId: number) {
        setLoading(true);

        agent.Basket.addItem(productId)
            .then(basket => setBakset(basket))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    function handleRemoveItem(productId: number, quantity: number = 1) {
        setLoading(true);

        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }
    

    if (!basket)
        return <Typography variant="h4">Your basket is empty</Typography>

    return (
        <>
            <h3>BuyerId : {basket.buyerId}</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((row) => (
                            <TableRow
                                key={row.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={row.pictureUrl} style={{ height: 50, marginRight: 20 }} alt={row.name} />
                                        {row.name}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(row.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton color="error" loading={loading}
                                        onClick={() => handleRemoveItem(row.productId)}  >
                                        <Remove />
                                    </LoadingButton>

                                    {row.quantity}
                                    <LoadingButton color="secondary" loading={loading}
                                        onClick={() => handleAddItem(row.productId)}>
                                        <Add />
                                    </LoadingButton>

                                </TableCell>
                                <TableCell align="right">${(row.quantity * row.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton color="error" loading={loading}
                                        onClick={() => handleRemoveItem(row.productId, row.quantity)} >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}
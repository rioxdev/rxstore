import { Delete } from "@material-ui/icons";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/basket";

export default function BasketPage() {
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        agent.Basket.get()
            .then(basket => setBasket(basket))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, []);

    if (loading)
        return <LoadingComponent message="Loadinng basket..." />

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
                            <TableCell align="right">Quantity</TableCell>
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
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">${(row.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">${(row.quantity * row.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="error">
                                    
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}
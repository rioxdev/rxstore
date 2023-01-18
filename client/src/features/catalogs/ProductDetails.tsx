import { LoadingButton } from "@mui/lab";
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/context";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {

    const { id } = useParams<{ id: string }>();
    // const [product, setProduct] = useState<Product | null>(null);
    // const [loading, setLoading] = useState(true);

    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const {status: productStatus} = useAppSelector(state => state.catalog);

    const [quantity, setQuantity] = useState(0);
    // const [submitting, setSubmitting] = useState(false);
    // const { basket, setBakset, removeItem } = useStoreContext();

    const { basket, status } = useAppSelector(state => state.basket);
    const dispatcher = useAppDispatch();

    const item = basket?.items.find(i => i.productId == product?.id);


    useEffect(() => {
        if (item)
            setQuantity(item.quantity);

        if (!product)
            dispatcher(fetchProductAsync(parseInt(id!)));    

    }, [id, item, , dispatcher, product]);

    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }

    }

    function handleUpdateCart() {

        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatcher(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));

        }
        else {
            const updatedQuantity = item.quantity - quantity;
            dispatcher(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        }
    }

    if (productStatus.includes('pending'))
        return (<LoadingComponent message="Loading product..." />)

    if (!product)
        return <h3>Product not found</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">
                    {product.name}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color={'secondary'}>
                    ${(product.price / 100).toFixed(2)}
                </Typography>

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            type='number'
                            label='Quantity in cart'
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton color="primary"
                            sx={{ height: '55px' }}
                            size='large'
                            variant='contained'
                            fullWidth
                            loading={status.includes('pendingRemoveItem' + item?.productId)}
                            onClick={handleUpdateCart}
                            disabled={quantity == 0}
                        >
                            {item ? 'Update quantity' : 'Addd to cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
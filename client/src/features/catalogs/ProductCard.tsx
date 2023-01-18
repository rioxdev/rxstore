import { Avatar, Button, Card, CardActions, CardContent, CardMedia, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from "../../app/context/context";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {

    // const [loading, setLoading] = useState(false);
    // const { setBakset } = useStoreContext();
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    // function handleAddItem(productId: number) {
    //     setLoading(true);
    //     agent.Basket.addItem(productId)
    //         .then(basket => dispatch(setBasket(basket)))
    //         .catch(err => toast.error(err))
    //         .finally(() => setLoading(false))
    // }

    return (
        <Card >
            <CardMedia
                sx={{ height: 140 }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" >
                    {product.name}
                </Typography>
                <Typography gutterBottom color='text.secondary' variant="h5">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton size="small" loading={status.includes('pendingAddItem' + product.id)} onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}>Add to cart</LoadingButton>

                <Button size="small" component={Link} to={`/catalog/${product.id}`} >View</Button>
            </CardActions>

        </Card>
    );
}
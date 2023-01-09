import { Avatar, Button, Card, CardActions, CardContent, CardMedia, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
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
                <Button size="small">Add to cart</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    );
}
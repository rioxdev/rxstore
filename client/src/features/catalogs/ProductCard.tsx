import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    return (
        <ListItem key={product.id} >
            <ListItemAvatar>
                <Avatar src={product.pictureUrl} />
            </ListItemAvatar>
            <ListItemButton>
                <ListItemText primary={product.name} />
            </ListItemButton>
        </ListItem>
    );
}
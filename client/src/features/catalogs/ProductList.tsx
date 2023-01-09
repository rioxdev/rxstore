
import { List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[]
}

export default function ProductList({ products }: Props) {
    return (
        <nav aria-label="secondary mailbox folders">
            <List>
                {products.map((item) => (
                <ProductCard product={item} />
                ))}
            </List>
        </nav>
    );
}
import Button from "@mui/material/Button"
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"

interface Prop {
    products: Product[],
    addProduct: () => void
}

export default function Catalog(props: Prop) {
    return (
        <>
            <h1>
                Catalog
            </h1>

            <p>
                <Button variant="contained" onClick={props.addProduct}>Add</Button>
            </p>

            <ProductList products={props.products} />
        </>
    )
}
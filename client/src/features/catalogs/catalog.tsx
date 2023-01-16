import Button from "@mui/material/Button"
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface Prop {
    products: Product[],
    addProduct: () => void
}


export default function Catalog() {
    //useState hook
    const [products, setProducts] = useState<Product[]>(
        []
    );

    const [loading, setLoading] = useState(true);

    //useEffect hook
    useEffect(() => {
        agent.Catalog.list()
            .then(data => setProducts(data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])


    if (loading)
        return (<LoadingComponent message="Loading products..."/>)


    return (
        <>
            <h1>
                Catalog
            </h1>

            {/* <p>
                <Button variant="contained" onClick={props.addProduct}>Add</Button>
            </p> */}

            <ProductList products={products} />
        </>
    )
}
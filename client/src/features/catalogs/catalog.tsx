import Button from "@mui/material/Button"
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";

interface Prop {
    products: Product[],
    addProduct: () => void
}


export default function Catalog() {

    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded)
            dispatch(fetchProductsAsync());


    }, [productsLoaded, dispatch])

    useEffect(() => {

        if (!filtersLoaded)
            dispatch(fetchFilters());

    }, [dispatch, filtersLoaded])

    if (status.includes('pending'))
        return (<LoadingComponent message="Loading products..." />)

    return (
        <ProductList products={products} />
    )
}
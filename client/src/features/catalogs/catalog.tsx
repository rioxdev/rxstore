import { Product } from "../../app/models/product"

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
                <button onClick={props.addProduct}>Add</button>
            </p>

            <ul>
                {props.products.map((item) => (
                    <li key={item.id}>
                        {` ${item.name}  $${item.price}`}
                    </li>
                ))}
            </ul>
        </>
    )
}
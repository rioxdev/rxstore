import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
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
                <Button variant="contained" onClick={props.addProduct}>Add</Button>
            </p>
            <nav aria-label="secondary mailbox folders">
                <List>
                    {props.products.map((item) => (
                        <ListItem key={item.id} >
                            <ListItemAvatar>
                                <Avatar src={item.pictureUrl} />
                            </ListItemAvatar>
                            <ListItemButton>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
        </>
    )
}
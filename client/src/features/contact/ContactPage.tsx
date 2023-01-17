import { Button, ButtonGroup, Typography } from "@mui/material";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { CounterState, DECREMENT_COUNTER, INCREMENT_COUNTER } from "./counterReducer";

export default function ContactPage() {
    const dispatch = useDispatch();
    const stateObject: CounterState = useSelector((state: CounterState) => state);

    return (
        <>
            <Typography variant="h3">
                Contact page
            </Typography>
            <p>
                Phasellus convallis a dui dapibus luctus.
                Cras scelerisque, dui ut vehicula iaculis, tortor turpis porttitor odio, vitae pellentesque dui metus vitae diam. Nulla quis aliquam eros. Praesent maximus turpis at est pharetra, vitae auctor orci rhoncus. Ut pellentesque consectetur mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a molestie tortor. Donec tempor enim nisi, sit amet pretium magna convallis at.
                Donec rhoncus enim orci, quis maximus justo luctus porttitor.
            </p>

            <Typography variant="h4">
                Test Redux
            </Typography>
            <p>
                Data : {stateObject.data}
            </p>
            <p>
                Title : {stateObject.title}
            </p>
            <div>
                <ButtonGroup>
                    <Button variant="contained" color="error"
                        onClick={() => dispatch({ type: DECREMENT_COUNTER })}>
                        Decrement
                    </Button>
                    <Button variant="contained" color="primary"
                        onClick={() => dispatch({ type: INCREMENT_COUNTER })}>
                        Increment
                    </Button>
                </ButtonGroup>
            </div>
        </>

    );
}
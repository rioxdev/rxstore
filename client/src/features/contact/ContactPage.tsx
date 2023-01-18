import { Button, ButtonGroup, Typography } from "@mui/material";
// import { useSelector } from "react-redux/es/exports";
// import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";
// import { CounterState, increment, decrement } from "./counterReducer";

export default function ContactPage() {

    // sans redux toolkit
    // const dispatch = useDispatch();
    // const stateObject: CounterState = useSelector((state: CounterState) => state);

    // avec redux toolkit
    const dispatch = useAppDispatch();
    const { data, title } = useAppSelector(state => state.counter);

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
                Data : {data}
            </p>
            <p>
                Title : {title}
            </p>
            <div>
                <ButtonGroup>
                    <Button variant="contained" color="error"
                        onClick={() => dispatch(decrement(1))}>
                        Decrement
                    </Button>
                    <Button variant="contained" color="primary"
                        onClick={() => dispatch(increment(1))}>
                        Increment
                    </Button>
                    <Button variant="contained" color="secondary"
                        onClick={() => dispatch(increment(10))}>
                        Incrementer par 10
                    </Button>
                </ButtonGroup>
            </div>
        </>

    );
}
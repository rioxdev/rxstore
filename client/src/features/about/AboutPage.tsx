import { Button, ButtonGroup, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage() {

    return (
        <>
            <Typography gutterBottom variant="h3">
                Testing Errors
            </Typography>

            <ButtonGroup fullWidth>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get400()}>
                    Test 400
                </Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get401()}>
                    Test 401
                </Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get404()}>
                    Test 404
                </Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get500()}>
                    Test 500
                </Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.getValidationError()}>
                    Test validation
                </Button>
            </ButtonGroup>

        </>

    );
}
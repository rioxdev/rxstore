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
                    onClick={() => agent.TestErrors.get400().catch(err => console.log(err))}>
                    Test 400
                </Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get401().catch(err => console.log(err))}>
                    Test 401
                </Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get404().catch(err => console.log(err))}>
                    Test 404
                </Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get500().catch(err => console.log(err))}>
                    Test 500
                </Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.getValidationError().catch(err => console.log(err))}>
                    Test validation
                </Button>
            </ButtonGroup>

        </>

    );
}
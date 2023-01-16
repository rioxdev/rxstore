import { Button, ButtonGroup, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidation() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('ok'))
            .catch(err => {
                setValidationErrors(err);
            });
    }

    return (
        <>
            <Typography gutterBottom variant="h3">
                Testing Errors
            </Typography>

            <ButtonGroup fullWidth>
                <Button variant="contained"
                    onClick={() => { setValidationErrors([]);  agent.TestErrors.get400().catch(err => console.log(err));}}>
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
                    onClick={getValidation}>
                    Test validation
                </Button>
            </ButtonGroup>
            {
                validationErrors.length > 0 &&
                <Alert severity="error">
                       <AlertTitle>Validation Errors</AlertTitle>
                        <List>
                            {
                                validationErrors.map(item=> (
                                     <ListItem key={item}>
                                          <ListItemText>{item}</ListItemText>  
                                     </ListItem>
                               
                                ))
                            }
                        </List>
                </Alert>
            }


        </>

    );
}
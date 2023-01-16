import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 400 }}>
            <Typography variant="h4" gutterBottom>
                Opps - Content not found
            </Typography>
            <Divider />
            <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button>
        </Container>

    )
}
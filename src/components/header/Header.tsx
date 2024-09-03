import { AppBar, Button, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white">
          BBANS RUN
        </Typography>
        <div>
          <Button color="inherit" className="mx-2">
            Home
          </Button>
          <Button color="inherit" className="mx-2">
            Crews
          </Button>
          <Button color="inherit" className="mx-2">
            Events
          </Button>
          <Button color="inherit" className="mx-2">
            Forum
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

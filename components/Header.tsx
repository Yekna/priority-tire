import Image from "next/image";
import Link from "next/link";
import { AppBar, IconButton, TextField, Toolbar } from "@mui/material";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import Hamburger from "./Hamburger";

const Header = () => {
  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Link href="/">
          <Image
            src="/Priority-Tire-Logo_1.webp"
            height={48}
            width={240}
            alt="home"
          />
        </Link>
        <div className="ml-auto flex items-end">
          <TextField
            className="hidden sm:block"
            label="Search"
            variant="standard"
          />
          <IconButton>
            <ShoppingCart />
          </IconButton>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
      <Toolbar className="flex justify-center">
        <Hamburger />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

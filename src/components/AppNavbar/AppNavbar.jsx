import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4, Brightness7, ShoppingBag } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartMenu from "../CartMenu/CartMenu";
import {
  pages,
  settingsNotSignIn,
  settingsSignIn,
} from "../../helpers/data-pages";
import { logOutUser } from "../../helpers/AuthFunctions";
import { storeProductsInServer } from "../../helpers/CartFunctions";
import { logOut } from "../../store/slices/userSlice";
import { getAuthFromLocalStorage } from "../../helpers/LocalStorageFunctions";
import { logOutCart } from "../../store/slices/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useGetWishData from "../../hooks/useGetWishData";
import "./AppNavbar.css";
import UseGetCartData from "../../hooks/useGetCartData";
import { useFetchSections } from "./../../hooks/useFetchSections";
import { logOutWishList } from "../../store/slices/wishListSlice";
import { storeProductsWishListInServer } from "../../helpers/WishListFunctions";
import Logo from "../Logo/Logo";

function AppNavbar() {
  const [settings, setSettings] = useState(settingsNotSignIn);
  //control with open or close menu cart
  const [cartMenu, setCartMenu] = useState({ right: false });
  const dispatch = useDispatch();
  //redirect to any page
  const navigate = useNavigate();
  //light and dark mode
  const theme = useTheme();

  //get all wishList data from store
  const [, totalItemsWishProducts] = useGetWishData();
  //get all cart data from store
  const [productsCart, totalItemsCartProducts] = UseGetCartData();
  const [preferredMode, setPreferredMode] = useState("light");
  //control to show settings menu
  useEffect(() => {
    const isAuth = getAuthFromLocalStorage();
    if (isAuth === true) setSettings(settingsSignIn);
    else setSettings(settingsNotSignIn);
  });
  //get current route
  // const route = useLocation();

  // control with cart side menu function
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setCartMenu({ [anchor]: open });
  };

  // store the products cart into the server when the cart menu disappears
  useEffect(() => {
    if (!cartMenu.right) {
      storeProductsInServer(productsCart);
    }
  }, [cartMenu]);
  // total Items in cart
  // const { totalItems } = useSelector((state) => state.cart);

  // Get the current page URL
  const currentPageUrl = window.location.href;

  // Find all navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  //* active navigation
  // Remove the "active" class from all links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Loop through the navigation links
  navLinks.forEach((link) => {
    // Check if the link's href matches the current page URL
    if (link.href === currentPageUrl) {
      // Add the active class to the link
      link.classList.add("active");
    }
  });
  // change mode the website
  const handleModeNew = () => {
    const root = document.documentElement;
    root.classList.toggle("dark-mode");
    // Store the current mode in local storage
    const isDarkMode = root.classList.contains("dark-mode");
    localStorage.setItem("preferredMode", isDarkMode ? "dark" : "light");
    const newMode = preferredMode === "light" ? "dark" : "light";
    setPreferredMode(newMode);
  };

  // Restore the preferred mode from local storage on page load
  window.addEventListener("load", function () {
    const root = document.documentElement;
    const preferredMode = localStorage.getItem("preferredMode");
    if (preferredMode === "dark") {
      root.classList.add("dark-mode");
    }
  });

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // console.log("anchorElUser", anchorElUser);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleMenuItemClick = (path) => {
    handleCloseNavMenu();
    navigate(path);
  };

  const [productsWish, ,] = useGetWishData();
  // console.log("productsWish", productsWish);
  //log out the user
  const handleUserMenu = (path) => {
    setAnchorElUser(null);
    storeProductsWishListInServer(productsWish);
    storeProductsInServer(productsCart);
    if (path === "logout") {
      dispatch(logOutWishList());
      dispatch(logOutCart());
      dispatch(logOut());
      setTimeout(() => {
        logOutUser();
        navigate("/");
      }, 1000);
    } else navigate(path);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProductsMenu = (path) => {
    setAnchorElUser(null);
    // if (path === "logout") {
    //   logOutUser();
    //   dispatch(logOut());
    //   dispatch(logOutCart());
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);
    // } else navigate(path);
  };

  const [listSections, setListSections] = useState([]);
  const [sections, setSections] = useFetchSections();

  // console.log(sections);

  useEffect(() => {
    const createListOfSections = (sections) => {
      const data = sections?.map((section) => {
        return {
          name: section.name,
          path: `products/${section.name}`,
        };
      });
      // console.log(data);
      setListSections(data);
      return data;
    };
    createListOfSections(sections);
  }, []);
  // console.log("listSections", listSections);

  return (
    <div className="appNavbar__container">
      <AppBar position="static" className="appNavbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                className="menuIcon"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => handleMenuItemClick(page.path)}
                    className="nav-link"
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Logo />
            <Box
              className="pages__container"
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages?.map((page) =>
                page.name === "Products" ? (
                  <>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      key={page.path}
                      className="nav-link"
                    >
                      {page.name}
                    </IconButton>

                    <Menu
                      sx={{ mt: "45px" }}
                      id=""
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {listSections?.map((section) => (
                        <MenuItem
                          key={section.name}
                          onClick={() => handleProductsMenu(section.path)}
                        >
                          <Typography textAlign="center">
                            {section.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="nav-link"
                    // onClick={() => navigate(page.path)}
                  >
                    {page.name}
                  </Link>
                )
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }} className="appNavbar__icons">
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => navigate("/wishList")}
                className="appNavbar__cartIcon"
              >
                <Badge badgeContent={totalItemsWishProducts} color="error">
                  {<FavoriteIcon />}
                </Badge>
              </IconButton>
              <IconButton
                sx={{ ml: 1 }}
                onClick={toggleDrawer("right", true)}
                className="appNavbar__cartIcon"
              >
                <Badge badgeContent={totalItemsCartProducts} color="error">
                  {<ShoppingBag />}
                </Badge>
              </IconButton>
              <CartMenu
                open={cartMenu.right}
                onClose={toggleDrawer("right", false)}
                anchor="right"
                setCartMenu={setCartMenu}
              />
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => handleModeNew()}
                className="appNavbar__mode"
              >
                {preferredMode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleUserMenu(setting.path)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default AppNavbar;

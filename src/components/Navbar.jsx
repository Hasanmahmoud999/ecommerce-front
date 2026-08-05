import { Badge } from "@material-ui/core";
import {
  Menu,
  ArrowDropDown,
  Search,
  ShoppingCartOutlined,
  ExitToAppOutlined,
  Home,
  LocalMallOutlined,
  LocalMall,
  LanguageOutlined,
  Dashboard,
} from "@material-ui/icons";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  lg,
  maxLg,
  maxMd,
  md,
  minLg,
  minmd,
  mobile,
  sm,
  xl,
  xs,
} from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutStart, logOutSuccess } from "../redux/slices/userSlice";
const Container = styled.div`
  height: 60px;
  border-bottom: solid 0.5px teal;
  position: sticky;
  top: ${(props) => (props.active === true ? "20px" : "0px")};
  z-index: 999;
  background-color: ${(props) =>
    props.active === true && " rgb(255 255 255 / 30%)"};
  backdrop-filter: blur(40px);
  width: ${(props) => (props.active ? "min(95%)" : "100%")};
  margin: ${(props) => props.active === true && "auto"};
  border-radius: ${(props) => props.active === true && "15px"};
  border: ${(props) => props.active === true && "solid 0.5px teal"};
  box-shadow: ${(props) =>
    props.active
      ? "0 10px 30px rgba(15, 118, 110, 0.16)"
      : "0 1px 2px rgba(15, 118, 110, 0.08)"};
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  ${md({
    width: `${(props) => (props.active ? "min(95%)" : "100%")}`,
    border: "solid 0.5px teal",
  })};
  ${mobile({
    height: "50px",
  })};
  ${xs({
    height: "50px",
  })};
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
  ${md({ padding: "0px 20px", height: "100%" })};
`;
const Left = styled.div`
  flex: 1;
  ${lg({ flex: 1 })};
`;
const Links = styled.ul`
  display: flex;
  // width: 100%;
  align-items: center;
  justify-content: space-evenly;
  ${md({
    padding: "0px",
    height: "100%",
    flexDirection: "column",
    width: "-webkit-fill-available",
  })};
  ${lg({
    padding: "0px",
    height: "100%",
    flexDirection: "column",
    width: "-webkit-fill-available",
    justifyContent: "space-evenly",
  })};  })}
`;
const LinksList = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  color: teal;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  transition: color 0.2s ease;
  &::after {
    position: absolute;
    right: 0;
    bottom: -10px;
    left: 0;
    width: 0;
    height: 2px;
    margin: auto;
    background: linear-gradient(90deg, teal, #0d9488);
    content: "";
    transition: width 0.25s ease;
  }
  &:hover::after,
  &:focus-within::after {
    width: 100%;
  }
  ${sm({ fontSize: "15px !important" })};
  ${mobile({ display: "none", width: "100px", fontSize: "15px!important" })};
  ${md({
    width: "100px",
    display: "flex",
    alignItems: "end",
    justifyContent: "start",
    fontSize: "20px",
  })};
  ${lg({
    width: "100px",
    display: "flex",
    alignItems: "end",
    justifyContent: "start",
    fontSize: "20px",
  })};
`;
const Language = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  ${mobile({ display: "flex" })};
`;
const LanguageMenu = styled.div`
  width: 100px;
  padding: 10px;
  -webkit-box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.66);
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.66);
  z-index: 1;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 30px;
  left: -14px;
`;
const LanguageType = styled.span`
  margin: 5px 0px;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  padding: 5px;
  &:hover {
    background-color: #e7e7e7;
  }
`;
const SearchContainer = styled.div`
  border: 1px solid teal;
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${sm({ marginLeft: "10px", display: "none" })}
  ${lg({ display: "none" })}
`;
const Input = styled.input`
  border: none;
  outline: none;
  padding-left: 10px;
  background-color: transparent;
  ${mobile({ width: "50px" })};
`;
const Center = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: center;
  flex: 3;
  ${md({ display: "none" })}
  ${lg({ display: "none" })}
`;
const Logo = styled.h1`
  font-weight: bold;
  color: teal;
  ${mobile({ fontSize: "20px", marginLeft: "10px" })};
  ${md({ fontSize: "24px", marginLeft: "10px" })};
`;
const Right = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ${mobile({ flex: 3 })};
  ${sm({ justifyContent: "end ", gap: "20px" })}
  ${md({ flex: 1, justifyContent: "end ", gap: "20px" })}
  ${lg({ flex: 1, justifyContent: "end ", gap: "20px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: teal;
  font-weight: 700;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  ${md({ display: "none", fontSize: "15px!important" })};
  ${sm({ display: "none", fontSize: "10px!important" })};
  ${mobile({ fontSize: "10px!important", marginLeft: "10px" })};
  ${xl({ fontSize: "10px", span: { fontSize: "10px" } })};
`;
const GhostButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: teal;
  border: 1px solid teal;
  border-radius: 999px;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.18s ease;
  svg {
    font-size: 17px !important;
  }
  &:hover {
    background-color: rgba(0, 128, 128, 0.1);
    transform: translateY(-1px);
  }
  ${md({ display: "none" })};
  ${minLg({ display: "flex" })};
  ${maxLg({ display: "none" })};
`;
const SolidButton = styled(GhostButton)`
  color: #fff;
  border-color: transparent;
  background: linear-gradient(90deg, #0f766e 0%, #115e59 100%);
  box-shadow: 0 8px 18px rgba(15, 118, 110, 0.28);
  &:hover {
    background: linear-gradient(90deg, #0d9488 0%, #0f766e 100%);
    color: #fff;
  }
`;
const MENUGhostButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: teal;
  border: 1px solid teal;
  border-radius: 999px;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.18s ease;
  svg {
    font-size: 17px !important;
  }
  &:hover {
    background-color: rgba(0, 128, 128, 0.1);
    transform: translateY(-1px);
  }
  ${md({ display: "flex" })};
  ${maxMd({
    display: "flex",
    fontSize: "20px",
    width: "130px",
    justifyContent: "center",
  })};
  ${maxLg({ display: "flex" })};
  ${minLg({ display: "none" })};
`;
const MENUSolidButton = styled(MENUGhostButton)`
  color: #fff;
  border-color: transparent;
  background: linear-gradient(90deg, #0f766e 0%, #115e59 100%);
  box-shadow: 0 8px 18px rgba(15, 118, 110, 0.28);
  &:hover {
    background: linear-gradient(90deg, #0d9488 0%, #0f766e 100%);
    color: #fff;
  }
`;

const LogoutContainer = styled.button`
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #0f766e 0%, #115e59 100%);
  border: 0.5px solid teal;
  font-size: 15px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 110, 84, 0.26);
    background: white;
    color: teal;
  }
  &:disabled {
    background-color: whitesmoke;
    color: teal;
    cursor: not-allowed;
  }
  ${md({ display: "none" })}
  ${lg({ display: "none" })}
  ${xl({ fontSize: "12px", svg: { fontSize: "15px" } })}
`;

const Button = styled.span`
  font-weight: 500;
  padding: 5px;
`;

const Media = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100vh;
  z-index: 110;
  background:
    radial-gradient(circle at top right, rgb(0 128 128 / 18%), transparent 42%),
    #ecf6f5;
  position: absolute;
  top: -30px;
  left: 0px;
`;

const IconContainer = styled.div`
  display: none;
  margin-left: 10px;
  ${md({
    display: "flex",
    "& :first-child": {
      fontSize: "30px",
      zIndex: 111,
    },
  })}
  ${lg({
    display: "flex",
    "& :first-child": {
      fontSize: "30px",
      zIndex: 111,
    },
  })};
`;

const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart);
  const { currentUser, isFetching } = useSelector((state) => state.user);
  // console.log(currentUser);
  const [languageChoosen, setLanguageChoosen] = useState("Language");
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const changeVisibility = () => {
    setShow(!show);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logOutStart());
    setTimeout(() => {
      dispatch(logOutSuccess());
      navigate("/login");
    }, 2000);
  };

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <Container active={active}>
      <Wrapper>
        {menu && (
          <Media>
            <Links>
              <LinksList onClick={() => setMenu(false)}>
                <HomeOutlinedIcon style={{ marginRight: "10px" }} />
                <Link className="link" to="/">
                  Home
                </Link>
              </LinksList>

              {currentUser?.isAdmin && (
                <LinksList>
                  <DashboardOutlinedIcon style={{ marginRight: "10px" }} />
                  <Link className="link" to="/">
                    Dashboard
                  </Link>
                </LinksList>
              )}
              <LinksList onClick={() => setMenu(false)}>
                <LocalMallOutlined style={{ marginRight: "10px" }} />
                <Link
                  className="link"
                  to={currentUser ? "/productsmenu" : "/register"}
                >
                  Products
                </Link>
              </LinksList>
              <LinksList>
                <LanguageOutlined style={{ marginRight: "10px" }} />
                <Language onClick={changeVisibility}>
                  {languageChoosen}
                  <ArrowDropDown />
                  {show && (
                    <LanguageMenu>
                      <LanguageType
                        onClick={() => {
                          (setLanguageChoosen("English"), setMenu(false));
                        }}
                      >
                        English
                      </LanguageType>
                      <LanguageType
                        onClick={() => {
                          (setLanguageChoosen("Arabic"), setMenu(false));
                        }}
                      >
                        Arabic
                      </LanguageType>
                    </LanguageMenu>
                  )}
                </Language>
              </LinksList>
              {!currentUser && (
                <>
                  <MenuItem as={MENUGhostButton}>
                    <Link className="link" to="/register">
                      REGISTER
                    </Link>
                  </MenuItem>
                  <MenuItem as={MENUSolidButton}>
                    <Link className="link" to="/login">
                      SIGN IN
                    </Link>
                  </MenuItem>
                </>
              )}
              {currentUser && (
                <LogoutContainer
                  onClick={handleLogout}
                  disabled={isFetching}
                  style={{
                    display: "flex",
                    fontWeight: "bold",
                    backgroundColor: "teal",
                    color: "white",
                    width: "max-content",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                    letterSpacing: "1px",
                  }}
                >
                  <ExitToAppOutlined style={{ padding: "5px" }} />
                  <Button>Log Out</Button>
                </LogoutContainer>
              )}
            </Links>
          </Media>
        )}

        <Left>
          <Logo>
            LUXE<span>.</span>
          </Logo>
        </Left>
        <Center>
          <Links>
            <LinksList>
              <Link className="link" to="/">
                Home
              </Link>
            </LinksList>

            {currentUser?.isAdmin && (
              <LinksList>
                <Link className="link" to="/">
                  Dashboard
                </Link>
              </LinksList>
            )}
            <LinksList>
              <Link
                className="link"
                to={currentUser ? "/productsmenu" : "/register"}
              >
                Products
              </Link>
            </LinksList>
            <LinksList>
              <Language onClick={changeVisibility}>
                {languageChoosen}
                <ArrowDropDown />
                {show && (
                  <LanguageMenu>
                    <LanguageType onClick={() => setLanguageChoosen("English")}>
                      English
                    </LanguageType>
                    <LanguageType onClick={() => setLanguageChoosen("Arabic")}>
                      Arabic
                    </LanguageType>
                  </LanguageMenu>
                )}
              </Language>
            </LinksList>
          </Links>
        </Center>
        <Right>
          {currentUser && (
            <>
              <SearchContainer>
                <Input placeholder="Search" />
                <Search
                  style={{
                    color: "teal",
                    fontSize: "20px",
                    fontWeight: "bold",
                    paddingRight: "5px",
                  }}
                />
              </SearchContainer>
            </>
          )}
          {!currentUser && (
            <>
              <MenuItem as={GhostButton} className="link" to="/register">
                <PersonAddOutlinedIcon /> REGISTER
              </MenuItem>
              <MenuItem as={SolidButton} className="link" to="/login">
                <ExitToAppIcon /> SIGN IN
              </MenuItem>
            </>
          )}

          {currentUser?.username && (
            <>
              <Link to="/cart" style={{ color: "black", display: "flex" }}>
                <MenuItem
                  style={{
                    margin: "0px",
                    display: "flex",
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Badge badgeContent={quantity} color="error">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
              <LogoutContainer onClick={handleLogout} disabled={isFetching}>
                <ExitToAppOutlined style={{ padding: "5px" }} />
                <Button>Log Out</Button>
              </LogoutContainer>
            </>
          )}
          <IconContainer onClick={handleClick}>
            <Menu />
          </IconContainer>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

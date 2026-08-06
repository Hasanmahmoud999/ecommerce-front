import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Announcment from "./../components/Announcment";
import Footer from "../components/Footer";
import { styled } from "styled-components";
import {
  Add,
  Remove,
  Edit,
  Delete,
  Close,
  // ShoppingBag,
} from "@material-ui/icons";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { lg, md, minLg, minMd, mobile, sm, xl, xs } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js"; // <-- changed
import { publicRequest, userRequest } from "../requestMethods";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  updateProduct,
} from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #fcfcfc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  padding: 30px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  flex: 1;
  ${sm({ padding: "15px" })}
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  font-size: 36px;
  letter-spacing: 2px;
  color: #111;
  margin-top: 10px;
  margin-bottom: 10px;
  ${md({ fontWeight: "bold" })}
  ${sm({ fontWeight: "bold", fontSize: "30px" })}
  ${mobile({ fontWeight: "bold", fontSize: "25px" })}
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 25px;
  ${md({ marginBottom: "15px" })}
`;
const TopButton = styled.button`
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  border: ${(props) => (props.type === "filled" ? "none" : "2px solid black")};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "black")};
  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "#222" : "black"};
    color: white;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(1px);
  }
  ${md({ letterSpacing: "1px", fontSize: "14px", padding: "10px 18px" })}
  ${sm({ letterSpacing: "0.5px", fontSize: "11px", padding: "8px 14px" })}
  ${mobile({ letterSpacing: "0px", fontSize: "10px", padding: "6px 10px" })}
`;
const TopTexts = styled.div`
  display: flex;
  gap: 20px;
  ${md({ fontWeight: "bold", letterSpacing: "1px" })}
  ${sm({ display: "none" })}
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  margin: 0px 10px;
  cursor: pointer;
  color: #555;
  &:hover {
    color: black;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  gap: 30px;
  ${md({ flexDirection: "column", gap: "25px" })};
  ${mobile({ flexDirection: "column", gap: "20px" })};
  ${minMd({ flexDirection: "column", gap: "20px" })};
  ${sm({ flexDirection: "column", gap: "20px" })};
  ${xs({ flexDirection: "column", gap: "20px" })};
  ${minLg({ flexDirection: "row", gap: "20px" })};
`;
const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  ${sm({ marginRight: "0px" })}
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin: 0px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.08);
  }
  ${md({ padding: "15px" })};
  ${sm({ padding: "10px" })};
  ${mobile({ flexDirection: "column" })};
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  gap: 20px;
  ${mobile({ flexDirection: "column", gap: "12px" })};
`;
const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  overflow: hidden;
  border-radius: 6px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f0f0;
  flex-shrink: 0;
  ${sm({ width: "110px", height: "110px" })}
  ${mobile({ width: "100%", height: "220px" })}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
const Details = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 6px;
  ${md({ fontSize: "16px" })}
  ${sm({ fontSize: "14px" })}
  ${mobile({ fontSize: "13px", marginBottom: "10px" })}
`;
const ProductName = styled.span`
  font-size: 16px;
  color: #111;
  b {
    color: #555;
    font-weight: 600;
  }
  ${md({ marginBottom: "5px" })}
  ${sm({ marginBottom: "5px" })}
  ${mobile({ marginBottom: "5px" })}
`;
const ProductId = styled.span`
  font-size: 13px;
  color: #777;
  font-family: monospace;
  b {
    color: #555;
    font-weight: 600;
  }
  ${md({ width: "max-content", marginBottom: "5px" })}
  ${sm({ marginBottom: "5px", width: "auto" })}
  ${mobile({ marginBottom: "5px" })}
`;
const ProductColorLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  b {
    color: #555;
    font-weight: 600;
  }
`;
const ProductColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: 1px solid #ddd;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  display: inline-block;
`;
const ColorName = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: 4px;
`;
const ProductSize = styled.span`
  font-size: 14px;
  color: #222;
  b {
    color: #555;
    font-weight: 600;
  }
  ${md({ marginTop: "5px" })}
  ${sm({ marginTop: "5px" })}
  ${mobile({ marginTop: "5px" })}
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  padding-left: 15px;
  border-left: 1px solid #f5f5f5;
  ${md({ justifyContent: "space-between", alignItems: "flex-end" })}
  ${mobile({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeft: "none",
    borderTop: "1px solid #f0f0f0",
    paddingTop: "15px",
    marginTop: "10px",
    paddingLeft: "0",
  })}
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 20px;
  padding: 4px 10px;
  border: 1px solid #eaeaea;
  ${sm({ margin: "0px" })}
`;
const QtyBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e0e0e0;
    color: black;
  }
`;
const ProductAmount = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 0 10px;
  min-width: 15px;
  text-align: center;
  ${md({ fontSize: "20px" })}
  ${sm({ fontSize: "16px" })}
  ${mobile({ margin: "5px 10px" })}
`;
const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #111;
  ${md({ fontSize: "24px", fontWeight: "bold" })}
  ${sm({ fontSize: "18px", fontWeight: "bold" })}
  ${mobile({ marginBottom: "0px" })}
`;
/* Edit & Delete buttons on cart products only */
const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  ${mobile({ marginTop: "0" })}
`;
const ActionButton = styled.button`
  background-color: white;
  border: 1px solid
    ${(props) => (props.$mode === "delete" ? "#fee2e2" : "#e5e5e5")};
  color: ${(props) => (props.$mode === "delete" ? "#dc2626" : "#444")};
  cursor: pointer;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) =>
      props.$mode === "delete" ? "#fef2f2" : "#f5f5f5"};
    border-color: ${(props) => (props.$mode === "delete" ? "#fca5a5" : "#ccc")};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;
const Hr = styled.hr`
  background-color: #c5c1c191;
  border: none;
  height: 1px;
  margin: 20px 20px;
`;
const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 24px;
  background-color: white;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.02);
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 100px;
  ${md({ minHeight: "auto" })}
  ${sm({ width: "auto" })}
  ${mobile({ margin: "0px" })}
`;
const SummaryTitle = styled.h1`
  font-weight: 300;
  font-size: 20px;
  letter-spacing: 1px;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  ${md({ fontSize: "24px", fontWeight: "bold" })}
  ${sm({ fontSize: "20px", fontWeight: "bold" })}
  ${mobile({ fontSize: "18px", fontWeight: "bold" })}
`;
const SummaryItem = styled.div`
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "20px"};
  color: ${(props) => (props.type === "total" ? "black" : "#444")};
  border-top: ${(props) => props.type === "total" && "1px solid #eaeaea"};
  padding-top: ${(props) => props.type === "total" && "15px"};
`;
const SummaryItemText = styled.span`
  font-size: 14px;
  color: #555;
  ${md({ fontSize: "16px", fontWeight: "600" })}
  ${sm({ fontSize: "14px", fontWeight: "600" })}
  ${mobile({ fontSize: "13px", fontWeight: "600" })}
`;
const SummaryItemPrice = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #111;
  ${md({ fontSize: "16px", fontWeight: "600" })}
  ${sm({ fontSize: "14px", fontWeight: "600" })}
  ${mobile({ fontSize: "13px", fontWeight: "600" })}
`;
const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  &:hover {
    background-color: #222;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }
  ${md({ fontSize: "18px", letterSpacing: "1px" })}
  ${sm({ fontSize: "14px", letterSpacing: "1px" })}
  ${mobile({ fontSize: "13px", letterSpacing: "1px" })}
`;
/* -------- Empty State -------- */
const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  text-align: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.02);
`;
const EmptyIconWrapper = styled.div`
  background-color: #f7f7f7;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  margin-bottom: 20px;
`;
const EmptyTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #222;
  margin-bottom: 10px;
`;
const EmptySub = styled.p`
  font-size: 14px;
  color: #666;
  max-width: 360px;
  margin-bottom: 25px;
  line-height: 1.5;
`;
/* -------- Toast -------- */
const AlertBanner = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #16a34a;
  color: white;
  padding: 14px 24px;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  font-size: 14px;
  font-weight: 500;
  max-width: 380px;
  animation: slideInUp 0.3s ease;
  @keyframes slideInUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  ${mobile({
    bottom: "16px",
    right: "16px",
    left: "16px",
    fontSize: "12px",
    padding: "12px 16px",
  })}
`;
/* -------- Edit Product Modal -------- */
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;
const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  box-sizing: border-box;
  animation: modalIn 0.25s ease-out;
  @keyframes modalIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  ${sm({ padding: "20px" })}
`;
const ModalCloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover {
    background-color: #f0f0f0;
    color: black;
  }
`;
const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 20px;
  color: #111;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ModalSection = styled.div`
  margin-bottom: 20px;
`;
const ModalLabel = styled.span`
  display: block;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;
const ColorGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
const ColorCircleOption = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: ${(props) =>
    props.$selected ? "3px solid black" : "1px solid #ccc"};
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.15);
  &:hover {
    transform: scale(1.1);
  }
`;
const SizeGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const SizeBoxOption = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1.5px solid ${(props) => (props.$selected ? "black" : "#e5e5e5")};
  background-color: ${(props) => (props.$selected ? "black" : "white")};
  color: ${(props) => (props.$selected ? "white" : "#444")};
  &:hover {
    border-color: black;
  }
`;
const ModalActionFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 25px;
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
`;
const ModalBtn = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  border: ${(props) =>
    props.$variant === "primary" ? "none" : "1px solid #ccc"};
  background-color: ${(props) =>
    props.$variant === "primary" ? "black" : "transparent"};
  color: ${(props) => (props.$variant === "primary" ? "white" : "#555")};
  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary" ? "#222" : "#f5f5f5"};
    color: ${(props) => (props.$variant === "primary" ? "white" : "black")};
  }
`;

const KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Load Stripe once, outside the component (recommended by Stripe)
const stripePromise = loadStripe(KEY);

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  console.log(cart);

  const dispatch = useDispatch();
  // Edit modal state (UI only)
  const [allProducts, setAllProducts] = useState();
  const [orginalProduct, setOrginalProduct] = useState();
  const [editingProduct, setEditingProduct] = useState(null);
  const [editColor, setEditColor] = useState("");
  const [editSize, setEditSize] = useState("");
  const [editQty, setEditQuantity] = useState(1);
  const [alertMsg, setAlertMsg] = useState("");
  const [orderStatus, setOrderStatus] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        // console.log(res.data);
        setAllProducts(res.data);
        // console.log(allProducts);
      } catch (err) {}
    };
    getProducts();
  }, []);
  useEffect(() => {
    if (editingProduct) {
      setEditColor(editingProduct.color);
      setEditSize(editingProduct.size);
      setEditQuantity(editingProduct.quantity);
    }
  }, [editingProduct]);
  const triggerAlert = (msg) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(""), 3500);
  };
  const handleSaveProductEdits = () => {
    if (!editingProduct) return;

    dispatch(
      updateProduct({
        product1: editingProduct,
        _id: editingProduct._id,
        color: editColor,
        size: editSize,
        quantity: editQty,
      }),
    );
    setEditingProduct(null);
    triggerAlert(
      `Successfully updated preferences for ${editingProduct.title}!`,
    );
  };
  const handleDeleteProduct = (uniqueId, title) => {
    dispatch(removeProduct(uniqueId));
    triggerAlert(`"${title}" has been deleted from your bag.`);
  };

  const handleCheckout = async () => {
    setOrderStatus(true);
    try {
      const res = await userRequest.post("/checkout/payment", {
        products: cart.products,
        amount: cart.total * 100,
      });
      console.log(res.data.url);
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
    }
  };
  const handelOrder = async () => {
    const productOrdered = cart.products.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    }));
    try {
      if (orderStatus) {
        const orders = await userRequest.post(
          "/orders",
          {
            headers: { token: `Bearer ${TOKEN}` },
          },
          {
            userId: currentUser._id,
            products: productOrdered,
            amount: cart.quantity,
            address: {},
            status: "Approved",
          },
        );
        console.log(orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handelOrder();
  const handleEdite = (product) => {
    setEditingProduct(product);
    setOrginalProduct(
      allProducts.filter((product1) => product1._id === product._id),
    );
  };
  return (
    <Container>
      <Announcment />

      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/productsmenu" className="link">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ... ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={handleCheckout}>
            CHECKOUT NOW
          </TopButton>
        </Top>
        {cart.products.length === 0 ? (
          <EmptyCartContainer>
            <EmptyIconWrapper>
              <ShoppingCartOutlinedIcon size={42} />
            </EmptyIconWrapper>
            <EmptyTitle>Your Bag is Empty</EmptyTitle>
            <EmptySub>
              You haven't added any products to your cart yet. Browse our
              handpicked fashion collection to find trends you'll love!
            </EmptySub>
          </EmptyCartContainer>
        ) : (
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product key={product.uniqueId}>
                  <ProductDetail>
                    <ImageContainer>
                      <Image src={product.img} />
                    </ImageContainer>
                    <Details>
                      <ProductName>
                        <b style={{ marginRight: "10px" }}>Product :</b>{" "}
                        {product.title}
                      </ProductName>
                      <ProductId>
                        <b style={{ marginRight: "10px" }}>Id :</b>{" "}
                        <span>{product._id}</span>
                      </ProductId>
                      <ProductColorLabel>
                        <b style={{ marginRight: "10px" }}>Color :</b>
                        <ProductColor
                          $color={product.color}
                          title={product.colorName}
                        />
                      </ProductColorLabel>
                      <ProductSize>
                        <b style={{ marginRight: "10px" }}>Size :</b>{" "}
                        {product.size}
                      </ProductSize>
                      {/* Edit & Delete action buttons (cart products only) */}
                      <ProductActions>
                        <ActionButton
                          $mode="edit"
                          onClick={
                            () => handleEdite(product)
                            // setEditingProduct(product)
                          }
                          title="Edit color & size"
                        >
                          <Edit size={13} /> Edit
                        </ActionButton>
                        <ActionButton
                          $mode="delete"
                          onClick={() =>
                            handleDeleteProduct(product.uniqueId, product.title)
                          }
                          title="Delete product"
                        >
                          <Delete size={13} /> Delete
                        </ActionButton>
                      </ProductActions>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <QtyBtn
                        onClick={() =>
                          dispatch(decreaseQuantity(product.uniqueId))
                        }
                        title="Decrease quantity"
                      >
                        <Remove size={14} strokeWidth={2.5} />
                      </QtyBtn>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <QtyBtn
                        onClick={() =>
                          dispatch(increaseQuantity(product.uniqueId))
                        }
                        title="Increase quantity"
                      >
                        <Add size={14} strokeWidth={2.5} />
                      </QtyBtn>
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>

              {/* Same Button, now just triggers handleCheckout */}
              <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
      {editingProduct && (
        <ModalBackdrop onClick={() => setEditingProduct(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={() => setEditingProduct(null)}>
              <Close size={20} />
            </ModalCloseBtn>
            <ModalTitle>
              <Edit size={18} style={{ color: "black" }} />
              Customize Item
            </ModalTitle>
            <p
              style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}
            >
              Change preferences for <b>{editingProduct.title}</b>
            </p>
            <ModalSection>
              <ModalLabel>Select Color</ModalLabel>
              <ColorGrid>
                {orginalProduct.map((product) =>
                  product.color.map((color) => (
                    <ColorCircleOption
                      key={product._id}
                      $color={color}
                      $selected={editColor === color}
                      onClick={() => setEditColor(color)}
                    />
                  )),
                )}
              </ColorGrid>
              <span
                style={{
                  fontSize: "12px",
                  color: "#666",
                  marginTop: "6px",
                  display: "inline-block",
                }}
              >
                Active:{" "}
                <b>
                  {editingProduct.availableColorsNames?.[editColor] ||
                    editColor}
                </b>
              </span>
            </ModalSection>
            <ModalSection>
              <ModalLabel>Select Size</ModalLabel>
              <SizeGrid>
                {orginalProduct.map((product) =>
                  product.size.map((size) => (
                    <SizeBoxOption
                      key={product._id}
                      $selected={editSize === size}
                      onClick={() => setEditSize(size)}
                    >
                      {size}
                    </SizeBoxOption>
                  )),
                )}
              </SizeGrid>
            </ModalSection>
            <ModalSection>
              <ModalLabel>Quantity</ModalLabel>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ProductAmountContainer style={{ margin: 0 }}>
                  <QtyBtn
                    onClick={() => setEditQuantity(Math.max(1, editQty - 1))}
                  >
                    <Remove size={14} />
                  </QtyBtn>
                  <ProductAmount>{editQty}</ProductAmount>
                  <QtyBtn onClick={() => setEditQuantity(editQty + 1)}>
                    <Add size={14} />
                  </QtyBtn>
                </ProductAmountContainer>
                <span style={{ fontSize: "13px", color: "#555" }}>
                  (Subtotal:{" "}
                  <b>${(editingProduct.price * editQty).toFixed(2)}</b>)
                </span>
              </div>
            </ModalSection>
            <ModalActionFooter>
              <ModalBtn onClick={() => setEditingProduct(null)}>
                Cancel
              </ModalBtn>
              <ModalBtn $variant="primary" onClick={handleSaveProductEdits}>
                Apply Preferences
              </ModalBtn>
            </ModalActionFooter>
          </ModalContent>
        </ModalBackdrop>
      )}
      {alertMsg && (
        <AlertBanner>
          <DoneAllIcon size={16} style={{ color: "white" }} />
          <span>{alertMsg}</span>
        </AlertBanner>
      )}
    </Container>
  );
};

export default Cart;

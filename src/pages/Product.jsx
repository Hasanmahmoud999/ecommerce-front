import styled, { css } from "styled-components";
import Navbar from "../components/Navbar";
import Announcment from "../components/Announcment";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, Remove, FavoriteBorder, Share } from "@material-ui/icons";
import { md, sm, mobile, xs, lg } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
// Shared base transition
const smoothTransition = css`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafaf9;
`;
const PageContent = styled.main`
  flex: 1;
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  gap: 50px;
  max-width: 1400px;
  margin: 0 auto;
  /* Large tablets / small laptops: reduce padding, keep row layout */
  ${lg({
    padding: "35px 30px",
    gap: "35px",
  })}
  /* Tablets: switch to column layout */
  ${md({
    padding: "30px 20px",
    flexDirection: "column",
    gap: "30px",
  })}
  ${sm({ padding: "20px 15px", gap: "25px" })}
  ${mobile({ padding: "15px 12px", gap: "20px" })}
`;
const ImgContainer = styled.div`
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background-color: white;
  -webkit-box-shadow: 0px 2px 16px -2px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 16px -2px rgba(0, 0, 0, 0.08);
  min-height: 500px;
  max-height: 750px;
  ${md({
    flex: "none",
    width: "100%",
    minHeight: "auto",
    maxHeight: "500px",
    borderRadius: "12px",
  })}
  ${sm({ maxHeight: "420px", borderRadius: "10px" })}
  ${mobile({ maxHeight: "340px", borderRadius: "8px" })}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 750px;
  object-fit: cover;
  display: block;
  ${md({
    maxHeight: "500px",
    width: "100%",
    objectFit: "cover",
  })}
  ${sm({ maxHeight: "420px" })}
  ${mobile({ maxHeight: "340px" })}
`;
const ImageActions = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 5;
  ${sm({ top: "14px", right: "14px", gap: "8px" })}
  ${mobile({ top: "12px", right: "12px", gap: "6px" })}
`;
const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #44403c;
  ${smoothTransition};
  -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: white;
    color: #0f766e;
    transform: scale(1.08);
  }
  ${sm({ width: "38px", height: "38px" })}
  ${mobile({ width: "34px", height: "34px" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 10px 10px 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${md({
    flex: "none",
    width: "100%",
    padding: "0",
  })}
  ${sm({ padding: "0" })}
  ${mobile({ padding: "0" })}
`;
const Breadcrumb = styled.div`
  font-size: 13px;
  color: #78716c;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  ${sm({ fontSize: "12px", marginBottom: "12px" })}
  ${mobile({ fontSize: "11px", marginBottom: "10px", gap: "4px" })}
`;
const BreadcrumbLink = styled.span`
  color: #0d9488;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const BreadcrumbSeparator = styled.span`
  color: #a8a29e;
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 42px;
  color: #1c1917;
  margin: 0 0 12px 0;
  line-height: 1.15;
  letter-spacing: -0.5px;
  ${md({
    fontSize: "32px",
    fontWeight: 600,
  })}
  ${sm({ fontSize: "26px", marginBottom: "10px" })}
  ${mobile({ fontSize: "22px", marginBottom: "8px", fontWeight: 600 })}
  ${xs({ fontSize: "20px" })}
`;
const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #78716c;
  ${sm({ fontSize: "13px", marginBottom: "16px", gap: "6px" })}
  ${mobile({ fontSize: "12px", marginBottom: "14px", gap: "5px" })}
`;
const Stars = styled.span`
  color: #f59e0b;
  font-size: 18px;
  letter-spacing: 2px;
  ${sm({ fontSize: "16px" })}
  ${mobile({ fontSize: "15px", letterSpacing: "1px" })}
`;
const ReviewCount = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: #0d9488;
  &:hover {
    color: #0f766e;
  }
`;
const Desc = styled.p`
  margin: 0 0 24px 0;
  color: #57534e;
  font-size: 16px;
  line-height: 1.7;
  font-weight: 400;
  ${md({
    fontSize: "15px",
    lineHeight: 1.6,
    marginBottom: "20px",
  })}
  ${sm({ fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" })}
  ${mobile({
    fontSize: "13px",
    lineHeight: 1.55,
    marginBottom: "14px",
  })}
`;
const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  ${sm({ gap: "10px", marginBottom: "8px" })}
  ${mobile({ gap: "8px" })}
`;
const Price = styled.span`
  font-weight: 600;
  font-size: 36px;
  color: #1c1917;
  letter-spacing: -0.5px;
  ${md({
    fontSize: "30px",
    fontWeight: 700,
  })}
  ${sm({ fontSize: "26px" })}
  ${mobile({ fontSize: "22px", fontWeight: 700 })}
  ${xs({ fontSize: "20px" })}
`;
const OldPrice = styled.span`
  font-size: 20px;
  color: #a8a29e;
  text-decoration: line-through;
  font-weight: 400;
  ${sm({ fontSize: "16px" })}
  ${mobile({ fontSize: "14px" })}
`;
const Discount = styled.span`
  background-color: #fef3c7;
  color: #b45309;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  ${sm({ fontSize: "12px", padding: "2px 8px" })}
  ${mobile({ fontSize: "11px", padding: "2px 7px" })}
`;
const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 28px;
  font-size: 14px;
  font-weight: 500;
  ${sm({ fontSize: "13px", marginBottom: "22px" })}
  ${mobile({ fontSize: "12px", marginBottom: "18px" })}
`;
const StockDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.$inStock ? "#22c55e" : "#ef4444")};
  ${mobile({ width: "7px", height: "7px" })}
`;
const StockText = styled.span`
  color: ${(props) => (props.$inStock ? "#16a34a" : "#dc2626")};
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e7e5e4;
  margin: 0 0 28px 0;
  ${sm({ marginBottom: "22px" })}
  ${mobile({ marginBottom: "18px" })}
`;
const FilterContainer = styled.div`
  margin: 0 0 28px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
  ${sm({ gap: "18px", marginBottom: "22px" })}
  ${mobile({ gap: "16px", marginBottom: "20px" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  ${sm({ gap: "12px" })}
  ${mobile({ gap: "10px" })}
  ${xs({ gap: "8px" })}
`;
const FilterTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1c1917;
  min-width: 65px;
  ${sm({ fontSize: "15px", minWidth: "58px" })}
  ${mobile({ fontSize: "14px", minWidth: "52px", fontWeight: 600 })}
  ${xs({ fontSize: "13px", minWidth: "48px" })}
`;
const ColorOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  ${sm({ gap: "8px" })}
  ${mobile({ gap: "7px" })}
`;
const FilterColor = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  ${smoothTransition};
  border: 2px solid ${(props) => (props.$selected ? "#0d9488" : "transparent")};
  outline: ${(props) =>
    props.$selected ? "2px solid rgba(13,148,136,0.3)" : "none"};
  outline-offset: 2px;
  position: relative;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  ${sm({ width: "26px", height: "26px" })}
  ${mobile({
    width: "24px",
    height: "24px",
    "&:hover": { transform: "none" },
  })}
  ${xs({ width: "22px", height: "22px" })}
`;
const SizeSelectWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  ${mobile({ gap: "6px" })}
`;
const FilterSizeOption = styled.button`
  padding: 8px 16px;
  border: 1.5px solid ${(props) => (props.$selected ? "#0d9488" : "#d6d3d1")};
  background-color: ${(props) => (props.$selected ? "#0d9488" : "white")};
  color: ${(props) => (props.$selected ? "white" : "#44403c")};
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${(props) => (props.$selected ? "600" : "500")};
  cursor: pointer;
  ${smoothTransition};
  min-width: 48px;
  text-align: center;
  &:hover {
    border-color: #0d9488;
    background-color: ${(props) => (props.$selected ? "#0d9488" : "#f0fdfa")};
    color: ${(props) => (props.$selected ? "white" : "#0f766e")};
  }
  ${sm({
    padding: "7px 13px",
    fontSize: "13px",
    minWidth: "42px",
    borderRadius: "7px",
  })}
  ${mobile({
    padding: "6px 11px",
    fontSize: "12px",
    minWidth: "38px",
    borderRadius: "6px",
  })}
  ${xs({ padding: "5px 9px", fontSize: "11px", minWidth: "34px" })}
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 4px;
  flex-wrap: wrap;
  ${md({ gap: "18px", marginTop: "0" })}
  ${sm({ gap: "14px" })}
  ${mobile({ gap: "12px" })}
  ${xs({ gap: "10px" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border: 1.5px solid #e7e5e4;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
  background: white;
  ${smoothTransition};
  &:hover {
    border-color: #d6d3d1;
  }
  ${mobile({ borderRadius: "10px", padding: "3px" })}
`;
const QuantityBtn = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  color: #44403c;
  ${smoothTransition};
  &:hover {
    background-color: #f5f5f4;
    color: #0d9488;
  }
  &:disabled {
    color: #d6d3d1;
    cursor: not-allowed;
  }
  ${sm({ width: "36px", height: "36px" })}
  ${mobile({ width: "32px", height: "32px", borderRadius: "6px" })}
`;
const Amount = styled.span`
  font-size: 18px;
  width: 48px;
  text-align: center;
  font-weight: 700;
  color: #1c1917;
  user-select: none;
  ${sm({ width: "40px", fontSize: "17px" })}
  ${mobile({ width: "34px", fontSize: "15px" })}
  ${xs({ width: "30px", fontSize: "14px" })}
`;
const Button = styled.button`
  padding: 14px 32px;
  font-size: 16px;
  border: 1.5px solid #0d9488;
  background-color: ${(props) => (props.$primary ? "#0d9488" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#0d9488")};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  ${smoothTransition};
  letter-spacing: 0.2px;
  flex: 1;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover {
    background-color: ${(props) => (props.$primary ? "#0f766e" : "#f0fdfa")};
    border-color: ${(props) => (props.$primary ? "#0f766e" : "#0f766e")};
    color: ${(props) => (props.$primary ? "white" : "#0f766e")};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
  }
  &:active {
    transform: translateY(0);
  }
  ${md({
    fontSize: "15px",
    padding: "13px 28px",
    minWidth: "150px",
  })}
  ${sm({
    fontSize: "14px",
    padding: "12px 24px",
    minWidth: "140px",
    borderRadius: "10px",
  })}
  ${mobile({
    fontSize: "13px",
    padding: "11px 18px",
    minWidth: "0",
    flex: 1,
    borderRadius: "8px",
    gap: "6px",
  })}
  ${xs({ padding: "10px 14px", fontSize: "12px" })}
`;
const WishlistBtn = styled(Button)`
  flex: 0;
  min-width: auto;
  padding: 14px 18px;
  background: white;
  border-color: #e7e5e4;
  color: #78716c;
  &:hover {
    background: #fef2f2;
    border-color: #f87171;
    color: #dc2626;
  }
  ${md({ padding: "13px 16px" })}
  ${sm({ padding: "12px 14px" })}
  ${mobile({ padding: "11px 14px" })}
`;
const FeaturesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e7e5e4;
  ${md({
    gridTemplateColumns: "repeat(3, 1fr)",
    marginTop: "28px",
    paddingTop: "20px",
    gap: "12px",
  })}
  ${sm({
    gridTemplateColumns: "repeat(3, 1fr)",
    marginTop: "22px",
    paddingTop: "18px",
    gap: "10px",
  })}
  ${mobile({
    gridTemplateColumns: "1fr",
    marginTop: "20px",
    paddingTop: "16px",
    gap: "8px",
  })}
`;
const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #57534e;
  font-weight: 500;
  padding: 10px;
  border-radius: 8px;
  background: #fafaf9;
  ${sm({ fontSize: "12px", padding: "8px", gap: "8px" })}
  ${mobile({ fontSize: "12px", padding: "10px 12px" })}
`;
const FeatureIcon = styled.span`
  font-size: 22px;
  flex-shrink: 0;
  ${sm({ fontSize: "20px" })}
  ${mobile({ fontSize: "20px" })}
`;
const SuccessMessage = styled.div`
  position: fixed;
  top: ${(props) => (props.$show ? "100px" : "-100px")};
  left: 50%;
  transform: translateX(-50%);
  background-color: #16a34a;
  color: white;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 0 8px 24px rgba(22, 163, 74, 0.3);
  z-index: 1000;
  ${smoothTransition};
  @media only screen and (max-width: 640px) {
    font-size: 14px;
    padding: 12px 22px;
    top: ${(props) => (props.$show ? "80px" : "-100px")};
  }
  @media only screen and (max-width: 480px) {
    font-size: 13px;
    padding: 10px 18px;
    top: ${(props) => (props.$show ? "70px" : "-100px")};
  }
`;
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2] || "1";
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        console.log(res.data);
        // Set default selections
        if (res.data.color?.length) setColor(res.data.color[0]);
        if (res.data.size?.length) setSize(res.data.size[0]);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);
  const handleQuantity = (type) => {
    if (type === "dec") {
      if (quantity > 1) setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleClick = () => {
    dispatch(
      addProduct({
        ...product,
        quantity,
        color,
        size,
      }),
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };
  if (loading) {
    return (
      <Container>
        <Announcment />
        <Navbar />
        <Wrapper>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "100px 0",
              fontSize: "18px",
              color: "#78716c",
            }}
          >
            Loading product...
          </div>
        </Wrapper>
      </Container>
    );
  }
  const discountPercent = 20;
  const oldPrice = product.price ? Math.round(product.price * 1.25) : 0;
  return (
    <Container>
      <Announcment />
      <Navbar />
      <PageContent>
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} alt={product.title} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <PriceRow>
              <Price>$ {product.price}</Price>
            </PriceRow>
            <Divider />
            <FilterContainer>
              <Filter>
                <FilterTitle>Color:</FilterTitle>
                <ColorOptions>
                  {product.color?.map((c) => (
                    <FilterColor
                      key={c}
                      color={c}
                      $selected={color === c}
                      onClick={() => setColor(c)}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </ColorOptions>
              </Filter>
              <Filter>
                <FilterTitle>Size:</FilterTitle>
                <SizeSelectWrapper>
                  {product.size?.map((s) => (
                    <FilterSizeOption
                      key={s}
                      $selected={size === s}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </FilterSizeOption>
                  ))}
                </SizeSelectWrapper>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <QuantityBtn
                  onClick={() => handleQuantity("dec")}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Remove style={{ fontSize: 20 }} />
                </QuantityBtn>
                <Amount>{quantity}</Amount>
                <QuantityBtn
                  onClick={() => handleQuantity("inc")}
                  aria-label="Increase quantity"
                >
                  <Add style={{ fontSize: 20 }} />
                </QuantityBtn>
              </AmountContainer>
              <Button $primary onClick={handleClick}>
                Add To Cart
              </Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      </PageContent>
      <NewsLetter />
      <Footer />
      <SuccessMessage $show={showToast}>
        ✓ Added to cart successfully!
      </SuccessMessage>
    </Container>
  );
};
export default Product;

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  ShoppingCart,
  Search,
  Favorite,
  Star,
  ArrowForward,
  Check,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slices/cartSlice";
// ─── Keyframe Animations ──────────────────────────────────────────────
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ─── Hover Overlay for Image Section ──────────────────────────────────
const Info = styled.div`
  opacity: 0;
  width: 0px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 4;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px 16px 0 0;
  backdrop-filter: blur(2px);
`;
// ─── Main Card Container (maintaining signature #d6ecf3a1 color) ────
const Container = styled.div`
  margin: 14px;
  border-radius: 18px;
  width: 330px;
  background-color: #d6ecf3a1;
  border: 1px solid rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 6px 20px -3px rgba(0, 128, 128, 0.16);
  transition: all 0.35s ease;
  overflow: hidden;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 14px 30px -4px rgba(0, 128, 128, 0.28);
    background-color: #d6ecf3e6;
  }
  &:hover ${Info} {
    opacity: 1;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    margin: 10px 0;
  }
`;

const ActionBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  padding: 16px;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  ${Container}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;
const ActionPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(14px);
  box-shadow: 0 10px 30px -8px rgba(15, 23, 42, 0.18);
`;
const AddButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(p) => (p.$disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s ease;
  background: ${(p) =>
    p.$added ? "#0d9488" : p.$disabled ? "#e2e8f0" : "#0f172a"};
  color: ${(p) => (p.$disabled ? "#94a3b8" : "#ffffff")};
  &:hover {
    background: ${(p) =>
      p.$added ? "#0d9488" : p.$disabled ? "#e2e8f0" : "#0f766e"};
  }
`;

const QuickViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: #334155;
  transition: background 0.3s ease;
  &:hover {
    background: #f1f5f9;
  }
`;
const SoldOutOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(2px);
`;
const SoldOutTag = styled.span`
  border-radius: 9999px;
  background: #ffffff;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #1e293b;
  box-shadow: 0 4px 24px -8px rgba(15, 23, 42, 0.12);
`;
// ─── Top Section: Image & White Circle Backdrop ─────────────────────
const ProductInfoTop = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 18px 18px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  // background: linear-gradient(145deg, #e4f5fb 0%, #cbeeef 100%);
  background: white;
  overflow: hidden;
`;
// const Circle = styled.div`
//   width: 180px;
//   height: 180px;
//   background-color: white;
//   border-radius: 50%;
//   position: absolute;
//   box-shadow: 0 10px 25px rgba(0, 128, 128, 0.12);
//   transition: transform 0.4s ease;
//   ${Container}:hover & {
//     transform: scale(1.08);
//   }
// `;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  z-index: 2;
  // border-radius: 50%;
  border: 3px solid white;
  transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
  ${Container}:hover & {
    transform: scale(1.1) rotate(-3deg);
  }
`;

// ─── Badges (New, Hot, Discount) ──────────────────────────────────────
const BadgeGroup = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 3;
`;
const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: ${(props) =>
    props.type === "new"
      ? "linear-gradient(135deg, #0d9488, #0f766e)"
      : props.type === "hot"
        ? "linear-gradient(135deg, #f97316, #ea580c)"
        : "linear-gradient(135deg, #e11d48, #be123c)"};
`;
const DiscountTag = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  color: #0f766e;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  z-index: 3;
`;
// ─── Interactive Hover Icons (with signature #e9f5f5 hover state) ─────
const Icon = styled.button`
  width: 44px;
  height: 44px;
  background-color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  color: #0f2e2e;
  font-size: 18px;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.15);
    color: teal;
  }
`;
// ─── Single-Page Information Bottom Section ───────────────────────────
const ProductInfoBottom = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 12px;
  background-color: rgba(255, 255, 255, 0.45);
`;
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;
const CategoryPill = styled.span`
  font-size: 11px;
  margin-right: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: teal;
  background-color: #e9f5f5;
  padding: 3px 10px;
  border-radius: 6px;
  border: 1px solid rgba(0, 128, 128, 0.15);
`;
const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
`;
const ProductInfoTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #0f2e2e;
  line-height: 1.35;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const DescriptionText = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: #475569;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductInfoPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 128, 128, 0.12);
`;
const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const CurrentPrice = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: #0d9488;
  letter-spacing: -0.5px;
`;

// ─── Button (maintaining signature teal color & ArrowRightAlt style) ──
const ProductInfoButton = styled.button`
  padding: 9px 18px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  background-color: teal;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 128, 128, 0.3);
  transition: all 0.25s ease;
  &:hover {
    background-color: #0f766e;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 128, 128, 0.45);
  }
  &:active {
    transform: translateY(0);
  }
`;

const Swatches = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Swatch = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
`;

const Product = ({ item }) => {
  // console.log(item.categories);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(item.color[0]);
  const [size, setSize] = useState(item.size[0]);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        ...item,
        quantity,
        color,
        size,
      }),
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };
  return (
    <Container>
      {/* ─── IMAGE SECTION WITH HOVER OVERLAY ─── */}
      <ProductInfoTop>
        <Image src={item.img} alt={item.title} />
        <ActionBar>
          <ActionPanel>
            <AddButton
              type="button"
              $disabled={!item.inStock}
              disabled={!item.inStock}
              onClick={handleAddToCart}
            >
              {showToast ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> {item.inStock ? "Add" : "Sold out"}
                </>
              )}
            </AddButton>

            <Link className="link" to={`/product/${item._id}`}>
              <QuickViewButton type="button" aria-label="Quick view">
                <Search size={20} />
              </QuickViewButton>
            </Link>
          </ActionPanel>
        </ActionBar>

        {!item.inStock && (
          <SoldOutOverlay>
            <SoldOutTag>Out of stock</SoldOutTag>
          </SoldOutOverlay>
        )}
      </ProductInfoTop>
      {/* ─── BRIEF PRODUCT INFO ON A SINGLE PAGE (NO FLIP) ─── */}
      <ProductInfoBottom>
        <div>
          <MetaRow>
            {item.categories.map((category) => (
              <CategoryPill>{category}</CategoryPill>
            ))}
          </MetaRow>
          <ProductInfoTitle style={{ marginTop: "10px" }}>
            {item.title}
          </ProductInfoTitle>
          <DescriptionText style={{ marginTop: "6px" }}>
            {item.desc}
          </DescriptionText>

          <Swatches>
            <span
              style={{
                color: "lightseagreen",
                margin: "5px 0px",
                fontSize: "12px",
              }}
            >
              {item.color && item.color.length > 0 ? (
                <span
                  style={{
                    color: "lightseagreen",
                    margin: "5px 0px",
                    fontSize: "12px",
                  }}
                >
                  COLORS AVAILABLE :
                </span>
              ) : (
                <span>No colors are currently available.</span>
              )}
            </span>
            {item.color.map((c) => (
              <Swatch key={c} title={c} style={{ backgroundColor: c }} />
            ))}
          </Swatches>
        </div>
        <ProductInfoPriceContainer>
          <PriceWrapper>
            <span
              style={{
                color: "lightseagreen",
                margin: "5px 0px",
                fontSize: "12px",
              }}
            >
              PRICE
            </span>
            <CurrentPrice>$ {item.price.toFixed(2)}</CurrentPrice>
          </PriceWrapper>
          <Link className="link" to={`/product/${item._id}`}>
            <ProductInfoButton title="More product details">
              <span>More</span>
              <ArrowForward size={18} />
            </ProductInfoButton>
          </Link>
        </ProductInfoPriceContainer>
      </ProductInfoBottom>
    </Container>
  );
};
export default Product;

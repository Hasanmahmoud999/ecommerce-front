import { styled } from "styled-components";
import { xl, lg, md, sm, mobile, xs } from "../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  margin: 0px 15px;
  height: 70vh;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.4s ease;
  min-width: 0;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  }
  ${xl({ height: "65vh", margin: "0px 12px", borderRadius: "18px" })}
  ${lg({ height: "58vh", margin: "0px 10px", borderRadius: "18px" })}
  ${md({
    height: "55vh",
    margin: "0px",
    borderRadius: "16px",
    flex: "none",
    width: "100%",
  })}
  ${sm({ height: "48vh", borderRadius: "16px" })}
  ${mobile({ height: "42vh", borderRadius: "14px" })}
  ${xs({ height: "38vh", borderRadius: "12px" })}
`;
const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  background: url(${(props) => props.$img}) center/cover no-repeat;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  ${Container}:hover & {
    transform: scale(1.08);
  }
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.12) 0%,
    rgba(0, 0, 0, 0.04) 32%,
    rgba(0, 0, 0, 0.42) 68%,
    rgba(0, 0, 0, 0.78) 100%
  );
  transition: background 0.45s ease;
  ${Container}:hover & {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.08) 30%,
      rgba(0, 0, 0, 0.56) 65%,
      rgba(0, 0, 0, 0.88) 100%
    );
  }
`;
const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 40px 36px;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  ${Container}:hover & {
    transform: translateY(-6px);
  }
  ${xl({ padding: "32px 28px" })}
  ${lg({ padding: "28px 24px" })}
  ${md({ padding: "28px 24px" })}
  ${sm({ padding: "24px 20px" })}
  ${mobile({ padding: "20px 18px" })}
  ${xs({ padding: "18px 16px" })}
`;
const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2.8px;
  text-transform: uppercase;
  padding: 7px 14px;
  border-radius: 100px;
  margin-bottom: 16px;
  line-height: 1;
  ${xl({ fontSize: "0.68rem", letterSpacing: "2.5px" })}
  ${lg({ fontSize: "0.66rem", padding: "6px 12px", letterSpacing: "2.2px" })}
  ${md({ fontSize: "0.65rem" })}
  ${sm({
    fontSize: "0.63rem",
    letterSpacing: "2px",
    padding: "5px 11px",
    marginBottom: "12px",
  })}
  ${mobile({
    fontSize: "0.6rem",
    letterSpacing: "1.6px",
    padding: "5px 10px",
    marginBottom: "10px",
  })}
  ${xs({
    fontSize: "0.58rem",
    letterSpacing: "1.4px",
    padding: "4px 9px",
    marginBottom: "8px",
  })}
`;
const Title = styled.h1`
  color: white;
  font-size: 2.35rem;
  font-weight: 800;
  margin: 0 0 22px 0;
  letter-spacing: -0.6px;
  line-height: 1.1;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.35);
  max-width: 90%;
  ${xl({ fontSize: "2.1rem", marginBottom: "20px" })}
  ${lg({ fontSize: "1.85rem", marginBottom: "18px", maxWidth: "95%" })}
  ${md({ fontSize: "1.9rem", marginBottom: "18px", maxWidth: "100%" })}
  ${sm({
    fontSize: "1.6rem !important",
    width: "max-content",
    maxWidth: "100%",
    marginBottom: "16px",
  })}
  ${mobile({
    fontSize: "1.38rem !important",
    width: "max-content",
    marginBottom: "14px",
    letterSpacing: "-0.4px",
  })}
  ${xs({ fontSize: "1.22rem !important", marginBottom: "12px" })}
`;
const Button = styled.button`
  background-color: white;
  border: 0.5px solid transparent;
  border-radius: 100px;
  color: #14141f;
  padding: 13px 28px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  white-space: nowrap;
  &:hover {
    background: linear-gradient(90deg, #0f766e 0%, #115e59 100%);
    color: #fff;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.32);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.1);
  }
  &:active {
    transform: scale(0.96) translateY(0);
  }
  ${xl({ padding: "12px 26px", fontSize: "0.8rem" })}
  ${lg({ padding: "11px 24px", fontSize: "0.78rem", gap: "8px" })}
  ${md({ padding: "12px 24px", fontSize: "0.8rem !important" })}
  ${sm({
    fontSize: "0.78rem !important",
    padding: "11px 22px",
    borderRadius: "100px",
    gap: "8px",
  })}
  ${mobile({
    fontSize: "0.72rem !important",
    padding: "10px 20px",
    gap: "6px",
  })}
  ${xs({
    fontSize: "0.7rem !important",
    padding: "9px 18px",
    letterSpacing: "1px",
  })}
`;
const Arrow = styled.span`
  font-size: 1.05em;
  line-height: 1;
  display: inline-block;
  transition: transform 0.32s ease;
  margin-top: -1px;
  ${Button}:hover & {
    transform: translateX(4px);
  }
  ${mobile({ fontSize: "1em" })}
`;
const CategoryItem = ({ item, img }) => {
  return (
    <Container>
      <BackgroundLayer $img={img} />
      <Overlay />
      <Info>
        <Tag>{item.cat}</Tag>
        <Title>{item.title}</Title>
        <Link className="link" to={`/products/${item.cat}`}>
          <Button>
            SHOP NOW
            <Arrow>→</Arrow>
          </Button>
        </Link>
      </Info>
    </Container>
  );
};
export default CategoryItem;

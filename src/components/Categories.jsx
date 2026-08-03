import { styled } from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { xl, lg, md, sm, mobile, xs } from "../responsive";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  margin-bottom: 90px;
  ${xl({ padding: "20px 24px" })}
  ${lg({ padding: "20px" })}
  ${md({ padding: "16px", marginBottom: "60px" })}
  ${sm({ padding: "14px", marginBottom: "48px" })}
  ${mobile({ padding: "12px", marginBottom: "40px" })}
  ${xs({ padding: "10px", marginBottom: "32px" })}
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 48px;
  width: 100%;
  ${xl({ marginBottom: "44px" })}
  ${lg({ marginBottom: "40px" })}
  ${md({ marginBottom: "36px" })}
  ${sm({ marginBottom: "28px" })}
  ${mobile({ marginBottom: "24px" })}
  ${xs({ marginBottom: "20px" })}
`;
const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #07c8c842;
  color: #00b2b2;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 18px;
  ${xl({ fontSize: "11.5px", letterSpacing: "0.2em" })}
  ${lg({ fontSize: "11px", padding: "6px 13px", marginBottom: "16px" })}
  ${md({ fontSize: "11px", padding: "5px 12px", marginBottom: "14px" })}
  ${sm({
    fontSize: "10.5px",
    padding: "5px 12px",
    letterSpacing: "0.18em",
    marginBottom: "12px",
    gap: "8px",
  })}
  ${mobile({
    fontSize: "10px",
    padding: "5px 11px",
    letterSpacing: "0.16em",
    marginBottom: "12px",
    gap: "8px",
  })}
  ${xs({
    fontSize: "9.5px",
    padding: "4px 10px",
    letterSpacing: "0.14em",
    marginBottom: "10px",
    gap: "7px",
  })}
`;
const Pulse = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00b2b2;
  box-shadow: 0 0 0 0 rgb(0, 160, 160, 0.7);
  animation: pulse 1.8s infinite;
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgb(0, 118, 118, 0.6);
    }
    70% {
      box-shadow: 0 0 0 10px rgb(0, 82, 82, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(0, 69, 69, 0);
    }
  }
  ${sm({ width: "5px", height: "5px" })}
  ${mobile({ width: "5px", height: "5px" })}
`;
const Heading = styled.h2`
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: teal;
  margin: 0 0 14px 0;
  line-height: 1.1;
  ${xl({ fontSize: "42px" })}
  ${lg({ fontSize: "38px", marginBottom: "12px" })}
  ${md({ fontSize: "34px", marginBottom: "12px" })}
  ${sm({ fontSize: "30px", marginBottom: "10px" })}
  ${mobile({ fontSize: "26px", marginBottom: "10px" })}
  ${xs({ fontSize: "24px", marginBottom: "8px" })}
`;
const Subheading = styled.p`
  color: #64748b;
  font-size: 16px;
  margin: 0;
  max-width: 520px;
  line-height: 1.5;
  padding: 0 16px;
  ${xl({ fontSize: "15.5px", maxWidth: "500px" })}
  ${lg({ fontSize: "15px", maxWidth: "480px" })}
  ${md({ fontSize: "14.5px", maxWidth: "460px" })}
  ${sm({ fontSize: "14px", maxWidth: "420px", lineHeight: "1.5" })}
  ${mobile({ fontSize: "13.5px", maxWidth: "360px", padding: "0 12px" })}
  ${xs({ fontSize: "13px", maxWidth: "300px", padding: "0 8px" })}
`;
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  gap: 0;
  ${xl({ padding: "16px" })}
  ${lg({ padding: "12px" })}
  ${md({
    flexDirection: "column",
    padding: "0px",
    gap: "20px",
  })}
  ${sm({
    flexDirection: "column",
    padding: "0px",
    gap: "18px",
  })}
  ${mobile({
    flexDirection: "column",
    padding: "0px",
    gap: "16px",
  })}
  ${xs({
    flexDirection: "column",
    padding: "0px",
    gap: "14px",
  })}
`;
const Categories = () => {
  return (
    <Container>
      <Header>
        <Eyebrow>
          <Pulse /> Shop by Category
        </Eyebrow>
        <Heading>Curated Collections</Heading>
        <Subheading>
          Discover timeless styles and modern essentials handpicked for the
          season.
        </Subheading>
      </Header>
      <Wrapper>
        {categories.map((item) => (
          <CategoryItem item={item} img={item.img} key={item.id} />
        ))}
      </Wrapper>
    </Container>
  );
};
export default Categories;

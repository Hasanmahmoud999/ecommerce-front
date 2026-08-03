import styled from "styled-components";
import { Send } from "@material-ui/icons";
import { mobile, sm, md } from "../responsive";
const Container = styled.div`
  background:
    linear-gradient(
      135deg,
      rgba(13, 148, 136, 0.08) 0%,
      rgba(249, 115, 22, 0.08) 100%
    ),
    #fafaf9;
  padding: 70px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 90px;
  ${md({ padding: "55px 20px", gap: "18px" })}
  ${sm({ padding: "45px 15px", gap: "15px" })}
  ${mobile({ padding: "35px 15px", gap: "12px" })}
`;
const Title = styled.h1`
  font-size: 52px;
  font-weight: 700;
  color: #1c1917;
  text-align: center;
  letter-spacing: -1px;
  ${md({ fontSize: "40px" })}
  ${sm({ fontSize: "32px" })}
  ${mobile({ fontSize: "26px", letterSpacing: "-0.5px" })}
`;
const Desc = styled.div`
  font-size: 20px;
  color: #57534e;
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
  font-weight: 400;
  ${md({ fontSize: "17px", maxWidth: "500px" })}
  ${sm({ fontSize: "16px", maxWidth: "450px" })}
  ${mobile({ fontSize: "14px", maxWidth: "100%" })}
`;
const InputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 520px;
  height: 56px;
  background: white;
  border-radius: 50px;
  border: 1.5px solid #e7e5e4;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  &:focus-within {
    border-color: #0d9488;
    box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.12);
  }
  ${md({ height: "52px", maxWidth: "460px" })}
  ${sm({ height: "48px", maxWidth: "400px" })}
  ${mobile({ height: "44px", maxWidth: "100%" })}
`;
const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0 24px;
  font-size: 16px;
  color: #1c1917;
  background: transparent;
  &::placeholder {
    color: #a8a29e;
  }
  ${sm({ fontSize: "14px", padding: "0 18px" })}
  ${mobile({ fontSize: "13px", padding: "0 16px" })}
`;
const Button = styled.button`
  background: linear-gradient(90deg, #0d9488 0%, #0f766e 100%);
  color: white;
  border: none;
  width: 120px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  &:hover {
    background: linear-gradient(90deg, #0f766e 0%, #115e59 100%);
  }
  ${sm({ width: "100px", fontSize: "14px" })}
  ${mobile({ width: "80px", fontSize: "13px", gap: "3px" })}
`;
const NewsLetter = () => {
  return (
    <Container>
      <Title>Join Our Newsletter</Title>
      <Desc>
        Subscribe to get special offers, free giveaways, and once-in-a-lifetime
        deals directly in your inbox.
      </Desc>
      <InputContainer>
        <Input placeholder="Your email address" type="email" />
        <Button>
          <Send sx={{ fontSize: { xs: 16, sm: 20 } }} />
          JOIN
        </Button>
      </InputContainer>
    </Container>
  );
};
export default NewsLetter;

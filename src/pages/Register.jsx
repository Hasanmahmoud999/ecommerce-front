import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import { md, mobile, sm } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
// import { ShieldCheck, Sparkles, Truck, ArrowRight, Check } from "lucide-react";

import {
  VerifiedUser,
  //   AutoAwesome,
  LocalShipping,
  ArrowForward,
  Check,
  CompareArrowsSharp,
  PublicSharp,
} from "@material-ui/icons";
const Container = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  background: #f4f8f8;
`;
const RegisterContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: stretch;
  min-height: calc(100svh - 72px);
  background:
    radial-gradient(
      circle at 18% 22%,
      rgba(15, 118, 110, 0.18),
      transparent 45%
    ),
    radial-gradient(
      circle at 82% 78%,
      rgba(13, 148, 136, 0.16),
      transparent 55%
    ),
    linear-gradient(135deg, #042f2c 0%, #073b37 55%, #051f1d 100%);
  isolation: isolate;
  overflow: hidden;
  ${md({ gridTemplateColumns: "1fr" })};
`;
const Visual = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(36px, 5vw, 68px);
  color: #f5fbfa;
  background-image: url("https://images.pexels.com/photos/34094489/pexels-photo-34094489.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600");
  background-size: cover;
  background-position: center 25%;
  isolation: isolate;
  &::before {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      180deg,
      rgba(2, 23, 22, 0.55) 0%,
      rgba(2, 23, 22, 0.45) 50%,
      rgba(2, 23, 22, 0.85) 100%
    );
    content: "";
  }
  &::after {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      120deg,
      transparent 30%,
      rgba(15, 118, 110, 0.22) 70%,
      transparent 100%
    );
    content: "";
  }
  ${md({ display: "none" })};
`;
const VisualTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #b6f0ea;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  &::before {
    width: 32px;
    height: 1px;
    background: currentColor;
    content: "";
  }
`;
const VisualContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 480px;
`;
const VisualEyebrow = styled.span`
  color: #7eead9;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4em;
  text-transform: uppercase;
`;
const VisualTitle = styled.h2`
  margin: 0;
  color: #f5fbfa;
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.005em;
`;
const VisualDescription = styled.p`
  max-width: 420px;
  color: rgb(245 251 250 / 78%);
  font-size: 15px;
  line-height: 1.65;
`;
const VisualFeatures = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
`;
const VisualFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  color: rgb(245 251 250 / 86%);
  font-size: 14px;
  span {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    color: #5eead4;
    background: rgb(15 118 110 / 32%);
    border: 1px solid rgb(94 234 212 / 35%);
    border-radius: 50%;
  }
`;
const VisualFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  color: rgb(245 251 250 / 70%);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  strong {
    color: #f5fbfa;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: none;
  }
`;
const FormPanel = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(32px, 5vw, 64px) clamp(20px, 4vw, 56px);
  background: #f4f8f8;
  &::before {
    position: absolute;
    top: 8%;
    right: 8%;
    width: 220px;
    height: 220px;
    background: radial-gradient(
      circle,
      rgba(15, 118, 110, 0.18),
      transparent 65%
    );
    filter: blur(20px);
    content: "";
    pointer-events: none;
  }
  &::after {
    position: absolute;
    bottom: 5%;
    left: 4%;
    width: 180px;
    height: 180px;
    background: radial-gradient(
      circle,
      rgba(13, 148, 136, 0.12),
      transparent 70%
    );
    filter: blur(18px);
    content: "";
    pointer-events: none;
  }
  ${mobile({ padding: "32px 16px 48px" })};
`;
const Wrapper = styled.div`
  position: relative;
  width: min(100%, 560px);
  padding: clamp(30px, 4vw, 44px);
  background: rgb(255 255 255 / 92%);
  border: 1px solid rgb(15 118 110 / 10%);
  border-radius: 22px;
  box-shadow:
    0 30px 60px -20px rgba(4, 47, 44, 0.25),
    0 18px 30px -25px rgba(4, 47, 44, 0.18);
  backdrop-filter: blur(14px);
  animation: enter-form 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  @keyframes enter-form {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  ${sm({ padding: "30px 22px", borderRadius: "18px" })};
  ${mobile({ padding: "26px 18px", borderRadius: "16px" })};
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
  text-align: left;
`;
const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding: 6px 12px;
  color: #0f766e;
  background: rgb(15 118 110 / 10%);
  border: 1px solid rgb(15 118 110 / 20%);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  svg {
    width: 13px;
    height: 13px;
  }
`;
const Title = styled.h1`
  margin: 0;
  color: #052e2c;
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(28px, 3.4vw, 36px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
`;
const Subtitle = styled.p`
  margin: 0;
  color: #516c69;
  font-size: 14px;
  line-height: 1.6;
`;
const Progress = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
`;
const ProgressDot = styled.span`
  flex: 1;
  height: 4px;
  background: ${(props) => (props.$active ? "teal" : "rgb(15 118 110 / 18%)")};
  border-radius: 999px;
  transition: background-color 0.3s ease;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 -8px;
`;
const FormField = styled.div`
  //   display: flex;
  //   justify-content: space-between;
  position: relative;
  //   width: 50%;
  padding: 0 8px;
  margin-bottom: 14px;
  ${sm({ width: "100%" })};
`;
const FormLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 22px;
  color: #6b7e7c;
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
  transform: translateY(-50%);
  transform-origin: left top;
  transition: all 0.2s ease;
  user-select: none;
`;
const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 10px 14px 8px;
  color: #052e2c;
  background: rgb(244 250 249 / 85%);
  border: 1.5px solid rgb(15 118 110 / 18%);
  border-radius: 12px;
  outline: none;
  font-size: 14.5px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &:hover:not(:focus) {
    border-color: rgb(15 118 110 / 38%);
  }
  &:focus {
    background: white;
    border-color: teal;
    box-shadow: 0 0 0 4px rgb(0 128 128 / 12%);
  }
  &:focus
    + ${FormLabel},
    &:valid
    + ${FormLabel},
    &:not(:placeholder-shown)
    + ${FormLabel} {
    top: 12px;
    color: #0f766e;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transform: translateY(0);
  }
`;
const Agreement = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 0 8px;
  margin: 6px 0 20px;
  color: #4f6663;
  font-size: 12.5px;
  line-height: 1.6;
  b {
    color: #0f766e;
    font-weight: 700;
    letter-spacing: 0.02em;
    transition: color 0.2s ease;
  }
  a:hover b {
    color: teal;
  }
`;
const Checkbox = styled.span`
  flex-shrink: 0;
  display: grid;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, teal, #0f766e);
  border-radius: 5px;
  svg {
    width: 12px;
    height: 12px;
  }
`;
const Button = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: calc(100% - 16px);
  min-height: 56px;
  padding: 12px 24px;
  margin: 0 8px;
  overflow: hidden;
  color: white;
  background: linear-gradient(110deg, #0f766e 0%, #115e59 55%, #0d9488 100%);
  background-size: 200% 100%;
  background-position: 0% 50%;
  border: none;
  border-radius: 14px;
  box-shadow:
    0 14px 28px rgb(0 87 81 / 24%),
    inset 0 1px 0 rgb(255 255 255 / 18%);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  cursor: pointer;
  transition:
    background-position 0.4s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;
  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    transform: translateX(-110%);
    transition: transform 0.7s ease;
    content: "";
  }
  &:hover:not(:disabled) {
    background-position: 100% 50%;
    box-shadow: 0 18px 36px rgb(0 87 81 / 32%);
    transform: translateY(-2px);
  }
  &:hover:not(:disabled)::after {
    transform: translateX(110%);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 3px solid rgb(0 128 128 / 28%);
    outline-offset: 3px;
  }
  &:disabled {
    background: linear-gradient(110deg, #008080a8, #0f766ea8);
    box-shadow: none;
    cursor: not-allowed;
  }
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.25s ease;
  }
  &:hover:not(:disabled) svg {
    transform: translateX(3px);
  }
  ${mobile({ minHeight: "50px", fontSize: "12.5px" })};
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px dashed rgb(15 118 110 / 18%);
  text-align: center;
`;
const LoginPrompt = styled.p`
  margin: 0;
  color: #516c69;
  font-size: 13px;
  a {
    color: #0f766e;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  a:hover {
    color: teal;
  }
`;
const SocialRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #6b7e7c;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  &::before,
  &::after {
    flex: 1;
    height: 1px;
    background: rgb(15 118 110 / 18%);
    content: "";
  }
`;
const Register = () => {
  const [inputs, setInputs] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fullName = firstName.concat(" ", lastName);
  const handleInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value, fullName };
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    register(dispatch, inputs, navigate);
  };
  return (
    <Container>
      <Navbar />
      <RegisterContainer>
        <Visual>
          <VisualTop>LUXE Atelier · Members Club</VisualTop>
          <VisualContent>
            <VisualEyebrow>Established 2014</VisualEyebrow>
            <VisualTitle>
              Step inside a wardrobe curated with intention.
            </VisualTitle>
            <VisualDescription>
              Create your LUXE account to unlock private collections,
              complimentary shipping on your first order, and invitations to
              in-store events.
            </VisualDescription>
            <VisualFeatures>
              <VisualFeature>
                <span>
                  <LocalShipping style={{ width: 16, height: 16 }} />
                </span>
                Complimentary express delivery on first order
              </VisualFeature>
              <VisualFeature>
                <span>
                  <PublicSharp style={{ width: 16, height: 16 }} />
                </span>
                Early access to seasonal capsule drops
              </VisualFeature>
              <VisualFeature>
                <span>
                  <VerifiedUser style={{ width: 16, height: 16 }} />
                </span>
                Secure checkout with encrypted personal data
              </VisualFeature>
            </VisualFeatures>
          </VisualContent>
          <VisualFooter>
            <strong>4.9 / 5</strong>· trusted by 28,000+ members worldwide
          </VisualFooter>
        </Visual>
        <FormPanel>
          <Wrapper>
            <Header>
              <Eyebrow>
                {/* <AutoAwesome /> */}
                New Member
              </Eyebrow>
              <Title>Create your account</Title>
              <Subtitle>
                Begin your LUXE journey — it only takes a moment to unlock a
                more considered way to shop.
              </Subtitle>
            </Header>
            <Progress aria-hidden="true">
              <ProgressDot $active />
              <ProgressDot $active />
              <ProgressDot />
            </Progress>
            <Form>
              <FormField>
                <Input
                  required
                  placeholder=" "
                  autoComplete="given-name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <FormLabel>First Name</FormLabel>
              </FormField>
              <FormField>
                <Input
                  required
                  placeholder=" "
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <FormLabel>Last Name</FormLabel>
              </FormField>
              <FormField>
                <Input
                  required
                  placeholder=" "
                  name="userName"
                  autoComplete="username"
                  onChange={handleInputs}
                />
                <FormLabel>User Name</FormLabel>
              </FormField>
              <FormField>
                <Input
                  required
                  placeholder=" "
                  type="email"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputs}
                />
                <FormLabel>Email</FormLabel>
              </FormField>
              <FormField>
                <Input
                  required
                  placeholder=" "
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  onChange={handleInputs}
                />
                <FormLabel>Password</FormLabel>
              </FormField>
              <FormField>
                <Input
                  required
                  placeholder=" "
                  type="password"
                  name="confirmpassword"
                  autoComplete="new-password"
                  onChange={handleInputs}
                />
                <FormLabel>Confirm Password</FormLabel>
              </FormField>
              <Agreement>
                <Checkbox>
                  <Check />
                </Checkbox>
                <span>
                  By creating an account, I consent to the processing of my
                  personal data in accordance with the
                  <Link to="#" className="link">
                    <b> PRIVACY POLICY</b>
                  </Link>
                </span>
              </Agreement>
              <Button disabled={isFetching} onClick={handleRegister}>
                CREATE ACCOUNT
                <ArrowForward />
              </Button>
            </Form>
            <Footer>
              <SocialRow>or continue with email</SocialRow>
              <LoginPrompt>
                Already part of the atelier?{" "}
                <Link to="/login" className="link">
                  Sign in here
                </Link>
              </LoginPrompt>
            </Footer>
          </Wrapper>
        </FormPanel>
      </RegisterContainer>
    </Container>
  );
};
export default Register;

import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import { md, mobile, sm } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowForward,
  VpnKey,
  CheckCircle,
  Replay,
  VerifiedUser,
  PersonAdd,
  PublicSharp,
} from "@material-ui/icons";
const Container = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  background: #f4f8f8;
`;
const LoginContainer = styled.div`
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
  background-image: url("https://images.pexels.com/photos/14738813/pexels-photo-14738813.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600");
  background-size: cover;
  background-position: center 20%;
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
  width: min(100%, 480px);
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
  flex-direction: column;
`;
const FormField = styled.div`
  position: relative;
  margin-bottom: 14px;
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
  padding: 24px 14px 8px;
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
const Button = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 56px;
  padding: 12px 24px;
  margin-top: 6px;
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
const Error = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  margin-top: 14px;
  color: #b91c1c;
  background: rgb(239 68 68 / 8%);
  border: 1px solid rgb(239 68 68 / 25%);
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  animation: shake-in 0.35s ease both;
  &::before {
    width: 6px;
    height: 6px;
    background: #ef4444;
    border-radius: 50%;
    content: "";
  }
  @keyframes shake-in {
    0% {
      opacity: 0;
      transform: translateX(-6px);
    }
    45% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-3px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
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
const Link = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #0f766e;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  svg {
    width: 14px;
    height: 14px;
  }
  &:hover {
    color: teal;
    transform: translateY(-1px);
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
const Demo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;
const DemoTitle = styled.h5`
  margin: 0;
  color: #516c69;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: 2px;
`;
const DemoInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const DemoInfo = styled.div`
  margin: 0;
  color: #516c69;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: 2px;
`;
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    if (userName != "" || password != "")
      login(dispatch, { userName, password }, navigate, setErr);
    else {
      dispatch(loginFailure());
      setErr("You must fill the information above first...");
    }
  };
  return (
    <Container>
      <Navbar />
      <LoginContainer>
        <Visual>
          <VisualTop>LUXE Atelier · Members Club</VisualTop>
          <VisualContent>
            <VisualEyebrow>Welcome back</VisualEyebrow>
            <VisualTitle>Your wardrobe has been waiting for you.</VisualTitle>
            <VisualDescription>
              Sign in to pick up where you left off — saved pieces, order
              history, and member pricing, all waiting in one place.
            </VisualDescription>
            <VisualFeatures>
              <VisualFeature>
                <span>
                  <VpnKey style={{ width: 16, height: 16 }} />
                </span>
                One-tap secure sign-in on trusted devices
              </VisualFeature>
              <VisualFeature>
                <span>
                  <CheckCircle style={{ width: 16, height: 16 }} />
                </span>
                Live tracking on every order you place
              </VisualFeature>
              <VisualFeature>
                <span>
                  <PublicSharp style={{ width: 16, height: 16 }} />
                </span>
                Member pricing and early capsule access
              </VisualFeature>
            </VisualFeatures>
          </VisualContent>
        </Visual>
        <FormPanel>
          <Wrapper>
            <Header>
              <Eyebrow>
                <VerifiedUser /> Member Access
              </Eyebrow>
              <Title>Sign in</Title>
              <Subtitle>
                Enter your details to return to your saved pieces and member
                benefits.
              </Subtitle>
            </Header>
            <Progress aria-hidden="true">
              <ProgressDot $active />
              <ProgressDot />
              <ProgressDot />
            </Progress>
            <Form>
              <FormField>
                <Input
                  required
                  placeholder=" "
                  autoComplete="username"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <FormLabel>User Name</FormLabel>
              </FormField>
              <FormField>
                <Input
                  required
                  placeholder=" "
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormLabel>Password</FormLabel>
              </FormField>
              <Button onClick={handleClick} disabled={isFetching}>
                LOGIN
                <ArrowForward />
              </Button>
              {err && <Error>Something went wrong...</Error>}
            </Form>
            <Footer>
              <Link>
                <Replay />
                DO NOT YOU REMEMBER THE PASSWORD?
              </Link>
              <SocialRow>or</SocialRow>
              <Link href="/register">
                <PersonAdd />
                CREATE A NEW ACCOUNT
              </Link>
              <Demo>
                <DemoTitle>Test Information</DemoTitle>
                <DemoInfoContainer>
                  <DemoInfo>User Name : </DemoInfo>
                  <DemoInfo>admin / viewer</DemoInfo>
                </DemoInfoContainer>
                <DemoInfoContainer>
                  <DemoInfo>Password : </DemoInfo>
                  <DemoInfo>123456</DemoInfo>
                </DemoInfoContainer>
              </Demo>
            </Footer>
          </Wrapper>
        </FormPanel>
      </LoginContainer>
    </Container>
  );
};
export default Login;

import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, keyframes } from "styled-components";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
// ==========================================
// Keyframe Animations
// ==========================================
/** Draws the outer circle stroke from scratch */
const drawCircle = keyframes`
  from {
    stroke-dashoffset: 283;
  }
  to {
    stroke-dashoffset: 0;
  }
`;
/** Draws the inner checkmark stroke after the circle closes */
const drawCheck = keyframes`
  from {
    stroke-dashoffset: 64;
  }
  to {
    stroke-dashoffset: 0;
  }
`;
/** Gentle pop-scale when the icon finishes drawing */
const iconPop = keyframes`
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  60% {
    transform: scale(1.08);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
/** Soft expanding pulse ring after icon finishes */
const haloPulse = keyframes`
  0% {
    transform: scale(0.85);
    opacity: 0.55;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;
/** Fades content up from below */
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
// ==========================================
// Styled Components
// ==========================================
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #ecfdf5 100%);
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
  text-align: center;
`;
const IconWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Halo = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: rgba(52, 211, 153, 0.35);
  opacity: 0;
  animation: ${haloPulse} 1.1s ease-out 1.4s forwards;
`;
const IconSvg = styled.svg`
  position: relative;
  width: 110px;
  height: 110px;
  color: #10b981;
  animation: ${iconPop} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;
const CircleOutline = styled.circle`
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  animation: ${drawCircle} 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards;
`;
const Checkmark = styled.path`
  stroke-dasharray: 64;
  stroke-dashoffset: 64;
  animation: ${drawCheck} 0.5s cubic-bezier(0.65, 0, 0.35, 1) 0.9s forwards;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #10b981;
  margin: 20px 0;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 1.2s forwards;
`;
const SuccessInfo = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: gray;
  max-width: 400px;
  margin: 20px 0;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 1.4s forwards;
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1.6;
  color: darkslategray;
  max-width: 400px;
  margin: 20px 0;
  text-decoration: underline;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 1.6s forwards;
`;

// ==========================================
// Success Component
// ==========================================
const Success = () => {
  const fadeUpName = useMemo(() => fadeUp.getName(), []);

  const location = useLocation();
  const Url = location.pathname.split("/")[1];
  return (
    <Container>
      <IconWrapper>
        <Halo />
        <IconSvg
          viewBox="0 0 100 100"
          fill="none"
          role="img"
          aria-label="Payment successful"
        >
          {/* Outer circle — drawn from scratch */}
          <CircleOutline
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Checkmark — drawn from scratch after circle */}
          <Checkmark
            d="M30 52 L44 66 L72 34"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconSvg>
      </IconWrapper>
      <Title>Congratulations, Payment Success</Title>
      <SuccessInfo>your payment has been successfully processed.</SuccessInfo>
      <StyledLink className="link" to="https://luxe9.netlify.app/">
        REDIRECTED TO THE HOME PAGE <ArrowRightAltIcon />
      </StyledLink>
    </Container>
  );
};
export default Success;

import { useEffect, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { sliderItems } from "../data";
import { mobile, sm, md } from "../responsive";
import { Link } from "react-router-dom";
// ─── Keyframes ───────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
`;
const progressFill = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;
// ─── Styled Components ───────────────────────────────────────────────
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  margin-bottom: 90px;
  border-radius: 0 0 24px 24px;
  ${mobile({ height: "auto", minHeight: "100vh", marginBottom: "40px" })}
`;
const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.2);
`;
const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #${(p) => p.color}, #${(p) => p.color}cc);
  animation: ${progressFill} ${(p) => p.duration}ms linear infinite;
  border-radius: 0 2px 2px 0;
`;
const Arrow = styled.div`
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(p) => p.direction === "left" && "24px"};
  right: ${(p) => p.direction === "right" && "24px"};
  margin: auto;
  cursor: pointer;
  z-index: 5;
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: #333;
  svg {
    width: 22px;
    height: 22px;
    transition: transform 0.3s ease;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(1.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
  &:active {
    transform: scale(0.95);
  }
  ${mobile({
    width: "40px",
    height: "40px",
    left: (p) => (p.direction === "left" ? "12px" : undefined),
    right: (p) => (p.direction === "right" ? "12px" : undefined),
  })}
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(${(p) => p.slideIndex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #${(p) => p.bg};
  position: relative;
  ${sm({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column", height: "auto", minHeight: "100vh" })}
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  ${sm({ padding: "0px", width: "100%", height: "50vh" })}
  ${mobile({ padding: "0px", width: "100%", height: "45vh" })}
  ${md({ width: "50%", padding: "30px" })}
`;
const Image = styled.img`
  height: 82%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  ${Slide}:hover & {
    transform: scale(1.02);
  }
  ${mobile({ objectFit: "contain", height: "90%", width: "95%" })}
  ${sm({ width: "100%", objectFit: "contain", height: "90%" })}
  ${md({ width: "100%", objectFit: "contain" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 60px 70px;
  position: relative;
  z-index: 2;
  ${mobile({
    width: "100%",
    padding: "30px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  })}
  ${md({ padding: "30px 40px", width: "50%" })}
`;
const AnimatedWrapper = styled.div`
  animation: ${(p) =>
    p.animate
      ? css`
          ${fadeInUp} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards
        `
      : "none"};
  opacity: ${(p) => (p.animate ? 0 : 1)};
`;
const Title = styled.h1`
  font-size: 68px;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.05;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ${sm({ fontSize: "28px" })}
  ${mobile({ fontSize: "24px" })}
  ${md({ fontSize: "42px" })}
`;
const Subtitle = styled.span`
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #${(p) => p.color};
  margin-bottom: 16px;
  padding: 6px 16px;
  border-radius: 30px;
  background: #${(p) => p.color}15;
`;
const Desc = styled.p`
  margin: 28px 0px 40px;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 1.7;
  color: #555;
  max-width: 480px;
  ${sm({ fontSize: "13px", margin: "16px 0px 24px" })}
  ${mobile({ fontSize: "12px", maxWidth: "100%", margin: "12px 0px 20px" })}
  ${md({ fontSize: "15px" })}
`;
const Button = styled.button`
  padding: 14px 36px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  background: transparent;
  border-radius: 50px;
  cursor: pointer;
  border: 2px solid #${(p) => p.bbg};
  color: #${(p) => p.bbg};
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: #${(p) => p.bbg};
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: -1;
    border-radius: 50px;
  }
  &:hover {
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px #${(p) => p.bbg}44;
  }
  &:hover::before {
    width: 100%;
  }
  &:active {
    transform: translateY(0px);
  }
  ${md({ fontSize: "14px", padding: "12px 28px" })}
  ${mobile({ fontSize: "13px", padding: "10px 24px" })}
`;
const DotsContainer = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 5;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  ${mobile({ bottom: "20px", gap: "8px", padding: "8px 14px" })}
`;
const Dot = styled.div`
  width: ${(p) => (p.active ? "28px" : "10px")};
  height: 10px;
  border-radius: 5px;
  background: ${(p) => (p.active ? `#${p.color}` : "rgba(0,0,0,0.2)")};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  ${(p) =>
    p.active &&
    css`
      animation: ${pulse} 2s ease infinite;
    `}
  &:hover {
    background: ${(p) => (p.active ? `#${p.color}` : "rgba(0,0,0,0.35)")};
  }
  ${mobile({
    width: (p) => (p.active ? "22px" : "8px"),
    height: "8px",
  })}
`;
const DecorativeCircle = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #${(p) => p.color}08;
  top: -80px;
  right: -80px;
  z-index: 0;
  pointer-events: none;
  ${mobile({ width: "150px", height: "150px", top: "-40px", right: "-40px" })}
`;
const DecorativeCircle2 = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #${(p) => p.color}06;
  bottom: -60px;
  left: -60px;
  z-index: 0;
  pointer-events: none;
  ${mobile({ width: "100px", height: "100px", bottom: "-30px", left: "-30px" })}
`;
// ─── Arrow Icons (SVG) ───────────────────────────────────────────────
const ArrowLeftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
// ─── Slider Component ────────────────────────────────────────────────
const Slider = ({ autoSlide = true, autoSlideInterval = 5000 }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const handleClick = useCallback(
    (direction) => {
      setAnimate(false);
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
      } else {
        setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
      }
      requestAnimationFrame(() => {
        setAnimate(true);
      });
    },
    [slideIndex],
  );
  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      setAnimate(false);
      setSlideIndex((prevIndex) =>
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0,
      );
      requestAnimationFrame(() => {
        setAnimate(true);
      });
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [autoSlide, autoSlideInterval]);
  const currentItem = sliderItems[slideIndex];
  return (
    <Container>
      <ProgressBar>
        <ProgressFill
          color={currentItem.bbg}
          duration={autoSlideInterval}
          key={slideIndex}
        />
      </ProgressBar>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item, index) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} alt={item.title} />
            </ImgContainer>
            <InfoContainer>
              <DecorativeCircle color={item.bbg} />
              <DecorativeCircle2 color={item.bbg} />
              <AnimatedWrapper
                animate={animate && slideIndex === index}
                key={`sub-${item.id}-${slideIndex}`}
              >
                <Subtitle color={item.bbg}>Limited Offer</Subtitle>
              </AnimatedWrapper>
              <AnimatedWrapper
                animate={animate && slideIndex === index}
                style={{ animationDelay: "0.15s" }}
                key={`title-${item.id}-${slideIndex}`}
              >
                <Title>{item.title}</Title>
              </AnimatedWrapper>
              <AnimatedWrapper
                animate={animate && slideIndex === index}
                style={{ animationDelay: "0.3s" }}
                key={`desc-${item.id}-${slideIndex}`}
              >
                <Desc>{item.desc}</Desc>
              </AnimatedWrapper>
              <Link className="link" to="/productsmenu">
                <AnimatedWrapper
                  animate={animate && slideIndex === index}
                  style={{ animationDelay: "0.45s" }}
                  key={`btn-${item.id}-${slideIndex}`}
                >
                  <Button bbg={item.bbg}>SHOP NOW</Button>
                </AnimatedWrapper>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightIcon />
      </Arrow>
      <DotsContainer>
        {sliderItems.map((item, index) => (
          <Dot
            key={item.id}
            active={index === slideIndex}
            color={item.bbg}
            onClick={() => {
              setAnimate(false);
              setSlideIndex(index);
              requestAnimationFrame(() => setAnimate(true));
            }}
          />
        ))}
      </DotsContainer>
    </Container>
  );
};
export default Slider;

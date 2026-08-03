import styled, { keyframes } from "styled-components";
import { marqueeItems } from "../data";
import { mobile, sm, md } from "../responsive";
import { Link } from "react-router-dom";
// ─── Keyframes ───────────────────────────────────────────────────────
const ease = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(34px); }
  to { opacity: 1; transform: translateY(0); }
`;
const floaty = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;
const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const marqueeMove = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const pulseDot = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.7); }
`;
// ─── Section Shell ───────────────────────────────────────────────────
const Section = styled.section`
  position: relative;
  background: #f0fdfa;
  background-image: radial-gradient(
    rgba(20, 184, 166, 0.16) 1px,
    transparent 1px
  );
  margin-bottom: 90px;
  background-size: 26px 26px;
  padding: 92px 60px 0;
  overflow: hidden;
  ${md({ padding: "72px 32px 0" })}
  ${mobile({ padding: "56px 20px 0" })}
`;
const Grid = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: center;
  padding-bottom: 96px;
  ${md({ gap: "40px", paddingBottom: "72px" })}
  ${sm({ gridTemplateColumns: "1fr", gap: "48px", paddingBottom: "56px" })}
`;
// ─── Left Column : Copy ──────────────────────────────────────────────
const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 18px;
  border-radius: 999px;
  background: #ccfbf1;
  border: 1px solid #99f6e4;
  color: #0f766e;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  animation: ${fadeUp} 0.7s ${ease} both;
`;
const EyebrowDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #14b8a6;
  animation: ${pulseDot} 2.2s ease-in-out infinite;
`;
const Heading = styled.h1`
  font-family: "Fraunces", Georgia, serif;
  font-size: 62px;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -1.5px;
  color: #042f2e;
  margin: 28px 0 22px;
  animation: ${fadeUp} 0.7s ${ease} 0.1s both;
  ${md({ fontSize: "48px" })}
  ${sm({ fontSize: "40px" })}
  ${mobile({
    fontSize: "31px",
    letterSpacing: "-0.5px",
    margin: "22px 0 16px",
  })}
`;
const Em = styled.em`
  font-style: italic;
  color: #0d9488;
`;
const Lead = styled.p`
  font-size: 19px;
  line-height: 1.75;
  font-weight: 500;
  color: #134e4a;
  max-width: 560px;
  animation: ${fadeUp} 0.7s ${ease} 0.2s both;
  ${sm({ fontSize: "16px" })}
  ${mobile({ fontSize: "15px" })}
`;
const Body = styled.p`
  font-size: 16px;
  line-height: 1.85;
  color: #4d6a66;
  max-width: 560px;
  margin-top: 16px;
  animation: ${fadeUp} 0.7s ${ease} 0.28s both;
  ${sm({ fontSize: "14px" })}
  ${mobile({ fontSize: "13.5px" })}
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 36px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s ${ease} 0.36s both;
  ${mobile({ marginTop: "28px" })}
`;
const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  background: linear-gradient(135deg, #0f766e, #0d9488);
  color: #f0fdfa;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 14px 30px rgba(15, 118, 110, 0.3);
  transition: all 0.35s ${ease};
  svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ${ease};
  }
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 42px rgba(15, 118, 110, 0.42);
    background: linear-gradient(135deg, #115e59, #0f766e);
  }
  &:hover svg {
    transform: translateX(5px);
  }
  &:active {
    transform: translateY(-1px);
  }
  ${mobile({ padding: "13px 24px", fontSize: "13.5px" })}
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 48px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s ${ease} 0.44s both;
  ${mobile({ gap: "18px", marginTop: "34px" })}
`;
const Stat = styled.div`
  transition: transform 0.3s ${ease};
  &:hover {
    transform: translateY(-3px);
  }
`;
const StatNum = styled.div`
  font-family: "Fraunces", Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #042f2e;
  display: flex;
  align-items: center;
  gap: 6px;
  svg {
    width: 22px;
    height: 22px;
    color: #f59e0b;
    fill: #f59e0b;
  }
  ${mobile({ fontSize: "27px" })}
`;
const StatLabel = styled.div`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #0f766e;
  margin-top: 5px;
`;
const StatDivider = styled.div`
  width: 1px;
  height: 44px;
  background: #99f6e4;
  ${mobile({ display: "none" })}
`;

// ─── Right Column : Visual Panel ─────────────────────────────────────

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0px); },
  50% { transform: translateY(-20px); }
`;
const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ImageContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${sm({ width: "100%" })}
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  ${mobile({ maxWidth: "280px" })}
`;
const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 2;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.02);
  }
`;
const FloatingCard = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  z-index: 3;
  animation: ${float} ${(p) => p.duration || "4s"} ease-in-out infinite;
  animation-delay: ${(p) => p.delay || "0s"};
  ${(p) =>
    p.position === "top-right" &&
    `
    top: -20px;
    right: -20px;
  `}
  ${(p) =>
    p.position === "bottom-left" &&
    `
    bottom: 40px;
    left: -30px;
  `}
  ${mobile({
    padding: "12px 16px",
    borderRadius: "12px",
    top: (p) => (p.position === "top-right" ? "-10px" : undefined),
    right: (p) => (p.position === "top-right" ? "-10px" : undefined),
    bottom: (p) => (p.position === "bottom-left" ? "20px" : undefined),
    left: (p) => (p.position === "bottom-left" ? "-10px" : undefined),
  })}
`;
const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
  ${mobile({
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    marginBottom: "8px",
    svg: {
      width: "18px",
      height: "18px",
    },
  })}
`;
const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
  ${mobile({ fontSize: "12px" })}
`;
const CardText = styled.div`
  font-size: 12px;
  color: #6b7280;
  ${mobile({ fontSize: "10px" })}
`;
// ─── Marquee Strip ───────────────────────────────────────────────────
const Marquee = styled.div`
  background: #042f2e;
  margin: 0 -60px;
  padding: 17px 0;
  overflow: hidden;
  border-top: 1px solid rgba(94, 234, 212, 0.18);
  ${md({ margin: "0 -32px" })}
  ${mobile({ margin: "0 -20px", padding: "14px 0" })}
`;
const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marqueeMove} 28s linear infinite;
  ${Marquee}:hover & {
    animation-play-state: paused;
  }
`;
const MarqueeSet = styled.div`
  display: flex;
  align-items: center;
  gap: 46px;
  padding-right: 46px;
  ${mobile({ gap: "30px", paddingRight: "30px" })}
`;
const MarqueeItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 46px;
  color: #5eead4;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  white-space: nowrap;
  ${mobile({ fontSize: "11px", letterSpacing: "2px", gap: "30px" })}
`;
const Diamond = styled.svg`
  width: 10px;
  height: 10px;
  color: #14b8a6;
  flex-shrink: 0;
`;
// ─── Inline SVG Icons ────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="13 5 20 12 13 19" />
  </svg>
);
const TruckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="5" width="14" height="11" rx="1.5" />
    <path d="M15 8h4l3 3v5h-7V8z" />
    <circle cx="6" cy="18.5" r="2" />
    <circle cx="17.5" cy="18.5" r="2" />
  </svg>
);
const LeafIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z" />
    <path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
);
const DiamondIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect
      x="6"
      y="6"
      width="12"
      height="12"
      transform="rotate(45 12 12)"
      rx="2"
    />
  </svg>
);
// ─── About Component ─────────────────────────────────────────────────
const WelcomSection = () => {
  return (
    <Section>
      <Grid>
        {/* Left : site description */}
        <div>
          <Eyebrow>
            <EyebrowDot />
            Welcome to LUXE
          </Eyebrow>
          <Heading>
            Timeless pieces, <Em>thoughtfully</Em> made for every day.
          </Heading>
          <Lead>
            LUXE is an independent fashion house curating elevated essentials
            and seasonal collections from more than 200 designers worldwide —
            ethically sourced, expertly tailored, and delivered to your door.
          </Lead>
          <Body>
            From the first stitch to the final fit, every piece in our
            collection is chosen for quality, comfort, and longevity. No fast
            fashion, no compromises — just wardrobe staples you will reach for
            season after season.
          </Body>
          <Buttons>
            <Link className="link" to="/productsmenu">
              <PrimaryBtn>
                Explore the Collection
                <ArrowIcon />
              </PrimaryBtn>
            </Link>
          </Buttons>
          <Stats>
            <Stat>
              <StatNum>200+</StatNum>
              <StatLabel>Curated Brands</StatLabel>
            </Stat>
            <StatDivider />
            <Stat>
              <StatNum>50K+</StatNum>
              <StatLabel>Happy Customers</StatLabel>
            </Stat>
            <StatDivider />
            <Stat>
              <StatNum>
                4.9
                <StarIcon />
              </StatNum>
              <StatLabel>Average Rating</StatLabel>
            </Stat>
          </Stats>
        </div>
        {/* Right : visual panel */}
        <ImageContent>
          <ImageWrapper>
            <MainImage src="/images/hero-model.jpg" alt="Fashion Model" />

            <FloatingCard position="top-right" duration="5s">
              <CardIcon>
                <TruckIcon />
              </CardIcon>
              <CardTitle>Free Shipping</CardTitle>
              <CardText>On orders over $50</CardText>
            </FloatingCard>
            <FloatingCard position="bottom-left" duration="6s" delay="1s">
              <CardIcon>
                <ShieldIcon />
              </CardIcon>
              <CardTitle>Secure Payment</CardTitle>
              <CardText>100% protected</CardText>
            </FloatingCard>
          </ImageWrapper>
        </ImageContent>
      </Grid>
      {/* Bottom marquee */}
      <Marquee>
        <MarqueeTrack>
          {[0, 1].map((setIndex) => (
            <MarqueeSet key={setIndex} aria-hidden={setIndex === 1}>
              {marqueeItems.map((item) => (
                <MarqueeItem key={item}>
                  {item}
                  <Diamond>
                    <DiamondIcon />
                  </Diamond>
                </MarqueeItem>
              ))}
            </MarqueeSet>
          ))}
        </MarqueeTrack>
      </Marquee>
    </Section>
  );
};
export default WelcomSection;

import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announcment from "../components/Announcment";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { md, mobile, sm } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  background: #f6f7fb;
  min-height: 100vh;
`;
const PageHeader = styled.section`
  padding: 56px 24px 8px;
  text-align: center;
  ${mobile({ padding: "36px 16px 4px" })}
`;

const Title = styled.h1`
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: capitalize;
  margin: 0;
  background: linear-gradient(90deg, #0f766e 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const Subtitle = styled.p`
  margin: 10px auto 0;
  color: #64748b;
  font-size: 15px;
  max-width: 520px;
`;

/* ---------- Filter bar ---------- */
const FilterWrap = styled.section`
  max-width: 1280px;
  margin: 32px auto 40px;
  padding: 0 24px;
  ${mobile({ padding: "0 16px", margin: "20px auto 28px" })}
`;
const FilterCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 22px;
  padding: 26px 28px 22px;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 12px 32px -18px rgba(15, 23, 42, 0.18);
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 28px;
  align-items: end;
  ${mobile({
    gridTemplateColumns: "1fr",
    padding: "22px 18px 18px",
    gap: "22px",
    borderRadius: "18px",
  })}
`;
const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const FilterLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const LabelDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0f766e, #0ea5e9);
`;
/* ---------- Color swatches ---------- */
const SwatchRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
const COLOR_MAP = {
  white: "#ffffff",
  black: "#0f172a",
  red: "#ef4444",
  blue: "#2563eb",
  yellow: "#facc15",
  green: "#16a34a",
};
const Swatch = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${(p) => COLOR_MAP[p.$color] || "#e2e8f0"};
  border: 1.5px solid
    ${(p) =>
      p.$color === "white" || p.$color === "yellow"
        ? "#e2e8f0"
        : "transparent"};
  cursor: pointer;
  position: relative;
  transition:
    transform 0.18s ease,
    outline-color 0.18s ease,
    box-shadow 0.18s ease;
  outline: 2.5px solid ${(p) => (p.$active ? "#0f766e" : "transparent")};
  outline-offset: 3px;
  &:hover {
    transform: translateY(-2px) scale(1.06);
  }
  &::after {
    content: "✓";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(p) =>
      p.$color === "white" || p.$color === "yellow" ? "#0f172a" : "#ffffff"};
    font-size: 14px;
    font-weight: 800;
    opacity: ${(p) => (p.$active ? 1 : 0)};
    transition: opacity 0.15s ease;
  }
`;
/* ---------- Size chips ---------- */
const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const Chip = styled.button`
  min-width: 44px;
  padding: 9px 16px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  border: 1.5px solid ${(p) => (p.$active ? "#0f766e" : "#e2e8f0")};
  background: ${(p) => (p.$active ? "#0f766e" : "#ffffff")};
  color: ${(p) => (p.$active ? "#ffffff" : "#334155")};
  transition:
    transform 0.15s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;
  &:hover {
    border-color: #0f766e;
    transform: translateY(-1px);
  }
`;
/* ---------- Sort segmented control ---------- */
const Segmented = styled.div`
  display: inline-flex;
  background: #f1f5f9;
  border-radius: 999px;
  padding: 4px;
  gap: 2px;
  align-self: flex-start;
`;
const Segment = styled.button`
  padding: 9px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  color: ${(p) => (p.$active ? "#0f172a" : "#64748b")};
  background: ${(p) => (p.$active ? "#ffffff" : "transparent")};
  box-shadow: ${(p) => (p.$active ? "0 1px 3px rgba(15,23,42,0.12)" : "none")};
  transition: all 0.2s ease;
  &:hover {
    color: #0f172a;
  }
`;
/* ---------- Actions row ---------- */
const ActionsRow = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "0 16px" })}
`;
const ActiveCount = styled.span`
  font-size: 13px;
  color: #64748b;
  strong {
    color: #0f172a;
    font-weight: 700;
  }
`;
const ClearBtn = styled.button`
  background: transparent;
  border: none;
  color: #0f766e;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: background 0.15s ease;
  &:hover {
    background: #ccfbf1;
  }
  &:disabled {
    color: #cbd5e1;
    cursor: not-allowed;
    &:hover {
      background: transparent;
    }
  }
`;
/* ---------- Component ---------- */
const COLORS = ["white", "black", "red", "blue", "yellow", "green"];
const SIZES = ["xs", "s", "m", "l", "xl"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "asc", label: "Price ↑" },
  { value: "desc", label: "Price ↓" },
];
const ProductsMenu = () => {
  const location = useLocation();
  const Url = location.pathname.split("/")[1];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const toggleFilter = (name, value) => {
    setFilters((prev) => {
      if (prev[name] === value) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: value };
    });
  };
  const clearAll = () => setFilters({});
  const activeCount = Object.keys(filters).length;
  return (
    <Container>
      <Announcment />
      <Navbar />
      <PageHeader>
        <Title>All Products</Title>
        <Subtitle>
          Discover pieces crafted for everyday elegance — refine the selection
          below to find exactly what you're looking for.
        </Subtitle>
      </PageHeader>
      <FilterWrap>
        <FilterCard>
          {/* Color filter */}
          <FilterGroup>
            <FilterLabel>
              <LabelDot />
              Color
            </FilterLabel>
            <SwatchRow>
              {COLORS.map((c) => (
                <Swatch
                  key={c}
                  type="button"
                  title={c}
                  aria-label={`Color ${c}`}
                  aria-pressed={filters.color === c}
                  $color={c}
                  $active={filters.color === c}
                  onClick={() => toggleFilter("color", c)}
                />
              ))}
            </SwatchRow>
          </FilterGroup>
          {/* Size filter */}
          <FilterGroup>
            <FilterLabel>
              <LabelDot />
              Size
            </FilterLabel>
            <ChipRow>
              {SIZES.map((s) => (
                <Chip
                  key={s}
                  type="button"
                  aria-pressed={filters.size === s}
                  $active={filters.size === s}
                  onClick={() => toggleFilter("size", s)}
                >
                  {s}
                </Chip>
              ))}
            </ChipRow>
          </FilterGroup>
          {/* Sort */}
          <FilterGroup>
            <FilterLabel>
              <LabelDot />
              Sort by
            </FilterLabel>
            <Segmented role="group" aria-label="Sort products">
              {SORT_OPTIONS.map((opt) => (
                <Segment
                  key={opt.value}
                  type="button"
                  $active={sort === opt.value}
                  onClick={() => setSort(opt.value)}
                >
                  {opt.label}
                </Segment>
              ))}
            </Segmented>
          </FilterGroup>
        </FilterCard>
        <ActionsRow>
          <ActiveCount>
            <strong>{activeCount}</strong> filter{activeCount === 1 ? "" : "s"}{" "}
            active
          </ActiveCount>
          <ClearBtn
            type="button"
            onClick={clearAll}
            disabled={activeCount === 0}
          >
            Clear all
          </ClearBtn>
        </ActionsRow>
      </FilterWrap>
      <Products Url={Url} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductsMenu;

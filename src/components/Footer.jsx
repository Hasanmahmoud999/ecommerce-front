import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@material-ui/icons";
import { styled } from "styled-components";
import { md, mobile, sm } from "../responsive";

const Container = styled.div`
    display: flex;
    ${sm({ flexDirection: "column" })};
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-right: 1px solid lightgrey;
    ${sm({ justifyContent: "space-between" })}
`;
const Logo = styled.h1`
    ${sm({ fontSize: "20px !important" })}
    ${md({ fontSize: "25px" })}
`;

const Desc = styled.p`
    margin: 20px 0px;
    ${sm({ fontSize: "15px !important", lineHeight: "25px" })}
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    ${md({ width: "30px", height: "30px" })}
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    border-right: 1px solid lightgrey;
    ${sm({ display: "none" })};
`;
const Title = styled.h3`
    margin-bottom: 30px;
    letter-spacing: 2px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    ${sm({
        width: "-webkit-fill-available",
        fontSize: "12px",
    })}
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;

    ${sm({
        backgroundColor: "#ebebeb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: "20px ",
    })};
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    ${sm({ fontSize: "12px", letterSpacing: "2px" })};
`;
const Payment = styled.img`
    width: 50%;
    ${sm({ width: "80% !important" })};
    ${md({ width: "100%" })};
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>SHOPTRON.</Logo>
                <Desc>
                    Ther are many variations of passages of lorem ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly beleivable.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Traking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Term</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} /> Wadi Al-thahab,
                    Homs, Syria
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} /> +963 0985462381
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} />{" "}
                    contact@gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    );
};

export default Footer;

import styled from "@emotion/styled";
import { InputBase, List, Modal } from "@mui/material";

export const dataHome = [
  {
    id: 1,
    img: "https://html.design/demo/timups/images/w1.png",
    price: 300,
    quantity: 6,
    day: 12,
  },
  {
    id: 2,
    img: "https://html.design/demo/timups/images/w2.png",
    price: 125,
    quantity: 9,
    day: 15,
  },
  {
    id: 3,
    img: "https://html.design/demo/timups/images/w3.png",
    price: 110,
    quantity: 15,
    day: 26,
  },
  {
    id: 4,
    img: "https://html.design/demo/timups/images/w4.png",
    price: 145,
    quantity: 10,
    day: 19,
  },
  {
    id: 5,
    img: "https://html.design/demo/timups/images/w5.png",
    price: 195,
    quantity: 22,
    day: 25,
  },
  {
    id: 6,
    img: "https://html.design/demo/timups/images/w6.png",
    price: 170,
    quantity: 32,
    day: 30,
  },
  {
    id: 7,
    img: "https://html.design/demo/timups/images/w1.png",
    price: 230,
    quantity: 17,
    day: 8,
  },
];

export const SearchContainer = styled.div`
  display: flex;
  align-items: flex-end;
  .icon {
    padding: 5px;
    margin: 0;
    cursor: pointer;
  }
  .input {
    color: white;
    outline: none;
    height: 2rem;
    border-radius: 5px;
    background-color: rgb(170, 151, 151);
    &::placeholder {
      color: white;
    }
    border: none;
  }
`;

export interface product {
  id: number;
  img: string;
  price: number;
  day: number;
  quantity: number;
}

export interface totalProducts {
  products: product[];
  path: number[];
  distance: number;
}

export const Input = styled(InputBase)`
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #03a1fc;
  outline: none;
`;

export const MenuIp = styled.div`
  background-color: #1874d0;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export interface decreaseProp {
  id: number;
  quantity: number;
}

export const ModalCustom = styled(Modal)``;

export const styleBox = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export const styleBoxDepot = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export const ListHistory = styled(List)`
  display: flex;
  align-items: center;
  width: 30rem;
  height: 20rem;
  border-bottom: 1px solid gray;

  .description {
    width: 6rem;

    .MuiListItem-root {
      display: inline-block;
      width: 5rem;
      p {
        font-size: 0.8rem;
      }
    }
  }
`;

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import "./depot.scss";
import NavBar from "../../components/navbar/NavBar";
import { addDepotHistory, depotSelector } from "../../features/depotSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useState } from "react";
import { Input, ModalCustom, styleBoxDepot } from "../../share";
import { toast } from "react-toastify";

const Depot = () => {
  const dispath = useAppDispatch();
  const depots = useAppSelector(depotSelector);
  const [openMd, setopenMd] = useState(false);
  const [fPath, setFPath] = useState(0);
  const inDuongDi = (s: number, f: number, previous: number[], d: number[]) => {
    let k = f;
    const t: number[] = [];
    t.push(f + 1);
    while (k !== s) {
      t.push(previous[k] + 1);
      k = previous[k];
    }
    t.reverse();
    console.log(`Khoang cach ${d[f]}`);
    console.log(t);
    dispath(
      addDepotHistory({ products: depots.depotTotal, path: t, distance: d[f] })
    );
  };

  const graph = [
    [0, 2, 0, 5, 0, 0],
    [0, 0, 7, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0],
  ];
  let d: number[] = []; //luu khoan cach nho nhat giua cac dinh
  let previous: number[] = [];
  let daDuyet: number[] = [];

  const dinhChuaDuyetvaKcbeNhat = () => {
    let u = -1; //dinh can tim
    let min = 9999;
    for (let i = 0; i < graph.length; i++) {
      if (daDuyet[i] === 0 && d[i] < min) {
        u = i;
        min = d[i];
      }
    }
    return u;
  };

  const Dijkstra = () => {
    for (let i = 0; i < graph.length; i++) {
      d[i] = 9999;
      previous[i] = -1;
      daDuyet[i] = 0;
    }
    d[0] = 0;
    let soDinhDaDuyet = graph.length;
    let u;
    while (soDinhDaDuyet > 0) {
      u = dinhChuaDuyetvaKcbeNhat();
      if (u === -1) break;
      daDuyet[u] = 1;
      for (let v = 0; v < graph.length; v++) {
        if (
          daDuyet[v] === 0 &&
          graph[u][v] !== 0 &&
          d[v] > d[u] + graph[u][v]
        ) {
          d[v] = d[u] + graph[u][v];
          previous[v] = u;
        }
      }
      soDinhDaDuyet--;
    }
  };

  return (
    <div className="depot">
      <NavBar />
      {depots.depotTotal.length === 0 ? (
        <h2>Ch??a c?? h??ng trong kho</h2>
      ) : (
        <div className="bottom">
          <div className="cardContainer">
            {depots.depotTotal.map((d) => (
              <Card
                key={d.id}
                sx={{
                  width: 300,
                  height: 300,
                }}
              >
                <h4>New</h4>
                <img src={d.img} alt="" />
                <CardContent>
                  <div className="info">
                    <div className="left">
                      <h2>S??? l?????ng {d.quantity}</h2>
                      <h2>Smart Watch {d.id}</h2>
                      <h2>Ng??y nh???p: {d.day}</h2>
                    </div>
                    <h2>Gi??: ${d.price}</h2>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="contained" onClick={() => setopenMd(true)}>
            Xu???t kho
          </Button>
          <ModalCustom open={openMd} onClose={() => setopenMd(false)}>
            <Box sx={styleBoxDepot}>
              <CardMedia
                component="img"
                image="https://i.ibb.co/Gct2BT4/image.png"
                sx={{
                  width: 400,
                  height: 500,
                  objectFit: "fill",
                }}
              />
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Input
                  placeholder="Nh???p ?????a ??i???m"
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFPath(e.target.valueAsNumber)
                  }
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (fPath <= 1) {
                      toast.error(
                        "Vui l??ng nh???p ?????a ??i???m tr??n b???n ????? kh??ng ???????c tr??ng ?????a ??i???m 1"
                      );
                      return;
                    }
                    Dijkstra();
                    inDuongDi(0, fPath - 1, previous, d);
                  }}
                >
                  Xu???t kho
                </Button>
              </CardActions>
            </Box>
          </ModalCustom>
        </div>
      )}
    </div>
  );
};

export default Depot;

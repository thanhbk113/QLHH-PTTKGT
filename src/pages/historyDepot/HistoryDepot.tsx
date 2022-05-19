import { Delete } from "@mui/icons-material";
import { Button, Card, CardContent, List, ListItem } from "@mui/material";
import NavBar from "../../components/navbar/NavBar";
import { depotSelector, resetDepotHistory } from "../../features/depotSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ListHistory } from "../../share";
import "./historyDepot.scss";

const HistoryDepot = () => {
  const dispath = useAppDispatch();
  const depots = useAppSelector(depotSelector);

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ?")) {
      dispath(resetDepotHistory());
    }
  };

  return (
    <div className="historyDepot">
      <NavBar />
      <div className="listHistory">
        {depots.depotHistory.length === 0 && <h1>Chưa có lịch sử xuất kho</h1>}
        {depots.depotHistory.length !== 0 && (
          <div>
            <List>
              {depots.depotHistory.map((d) => (
                <li>
                  <ListHistory>
                    <div className="description">
                      <ListItem>
                        <span>Khoảng cách:</span>
                        <span>{d.distance}</span>
                      </ListItem>
                      <ListItem>
                        <p>
                          Đường đi:
                          <span>
                            {d.path.map((d) => (
                              <>{d}</>
                            ))}
                          </span>
                        </p>
                      </ListItem>
                    </div>
                    <ListItem>
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 300,
                          position: "relative",
                          overflow: "auto",
                          maxHeight: 300,
                          "& ul": { padding: 0 },
                        }}
                      >
                        {d.products.map((d) => (
                          <Card
                            key={d.id}
                            sx={{
                              width: 300,
                              height: 300,
                            }}
                          >
                            <div className="new">New</div>
                            <img src={d.img} alt="" />
                            <CardContent>
                              <div className="info">
                                <div className="left">
                                  <p>Số lượng {d.quantity}</p>
                                  <p>Smart Watch {d.id}</p>
                                  <p>Ngày nhập: {d.day}</p>
                                </div>
                                <p>Giá: ${d.price}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </List>
                    </ListItem>
                  </ListHistory>
                </li>
              ))}
            </List>
            <div className="deleteAll">
              <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={handleDelete}
              >
                Xóa hết hàng trong lịch sử kho
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryDepot;

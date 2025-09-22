import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [artworkMap, setArtworkMap] = useState({});
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [ordersRes, artworksRes] = await Promise.all([
        axios.get(`${config.url}/admin/ordersviewall`),
        axios.get(`${config.url}/customer/viewallartworks`)
      ]);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const currentUsername = storedUser?.username;

      const userOrders = ordersRes.data.filter(
        (order) => order.username === currentUsername
      );

      const map = {};
      artworksRes.data.forEach((artwork) => {
        map[artwork.id] = artwork.image; // assuming 'image' field holds image URL
      });

      setArtworkMap(map);
      setOrders(userOrders);
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const font = { fontFamily: "Montserrat, sans-serif" };
  const headings = [
    "Razorpay Order ID",
    "Created At",
    "Amount",
    "Artwork Image"
  ];

  return (
    <div style={{ padding: "30px", ...font }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", textDecoration: "underline" }}
      >
        My Orders
      </Typography>

      {error ? (
        <Typography align="center" color="error" sx={{ fontWeight: "bold", fontSize: "18px" }}>
          {error}
        </Typography>
      ) : orders.length === 0 ? (
        <Typography align="center" color="error" sx={{ fontWeight: "bold", fontSize: "18px" }}>
          No Orders Found
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ ...font }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#000000" }}>
                {headings.map((head) => (
                  <TableCell key={head} align="center" sx={{ fontWeight: "bold", color: "white" }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, i) => (
                <TableRow
                  key={order.id}
                  sx={{
                    backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa",
                    "&:hover": { backgroundColor: "#e0f7fa" },
                  }}
                >
                  <TableCell align="center" sx={{ padding: "16px" }}>
                    {order.razorpayOrderId}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "16px" }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                   <TableCell align="center" sx={{ padding: "16px" }}>
                    {order.amount}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "16px" }}>
                    <img
                      src={artworkMap[order.artworkId]}
                      alt="Artwork"
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default MyOrders;

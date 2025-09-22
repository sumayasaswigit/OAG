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

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/ordersviewall`);
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders: " + err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const font = { fontFamily: "Montserrat, sans-serif" };
  const headings = [
    "ID",
    "Username",
    "Artwork ID",
    "Amount",
    "Razorpay Order ID",
    "Created At",
  ];

  return (
    <div style={{ padding: "30px", ...font }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", textDecoration: "underline" }}
      >
        Transaction History
      </Typography>

      {error ? (
        <Typography align="center" color="error" sx={{ fontWeight: "bold", fontSize: "18px" }}>
          {error}
        </Typography>
      ) : orders.length === 0 ? (
        <Typography align="center" color="error" sx={{ fontWeight: "bold", fontSize: "18px" }}>
          No Transactions Found
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
                  <TableCell align="center">{order.id}</TableCell>
                  <TableCell align="center">{order.username}</TableCell>
                  <TableCell align="center">{order.artworkId}</TableCell>
                  <TableCell align="center">{order.amount}</TableCell>
                  <TableCell align="center">{order.razorpayOrderId}</TableCell>
                  <TableCell align="center">
                    {new Date(order.createdAt).toLocaleString()}
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

export default Transactions;

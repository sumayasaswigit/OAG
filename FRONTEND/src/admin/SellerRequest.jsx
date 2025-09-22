import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import {
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Chip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const SellerRequest = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  const font = { fontFamily: "Montserrat, sans-serif" };

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(`${config.url}/admin/sellerRequests`);
      setRequests(data);
    } catch (err) {
      setError("Failed to load seller requests. " + err.message);
    }
  };

  const handleSellerAction = async (id, action) => {
    try {
      let res;
      if (action === "remove") {
        res = await axios.put(`${config.url}/admin/removeseller/${id}`);
      } else {
        res = await axios.put(`${config.url}/admin/${action}Seller/${id}`);
      }

      alert(res.data);
      fetchRequests();
    } catch (err) {
      setError(
        `Error ${
          action === "approve"
            ? "approving"
            : action === "reject"
            ? "rejecting"
            : "removing"
        } seller. ${err.message}`
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatStatus = (status) => {
    return status
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : "Unknown";
  };

  const headings = [
    "ID",
    "Name",
    "Username",
    "Email",
    "Contact",
    "Role",
    "Request Status",
    "Actions",
  ];

  return (
    <div style={{ padding: "30px", ...font }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", textDecoration: "underline" }}
      >
        Seller Requests
      </Typography>

      {error ? (
        <Typography align="center" color="error" sx={{ fontWeight: "bold" }}>
          {error}
        </Typography>
      ) : requests.length === 0 ? (
        <Typography
          align="center"
          color="textSecondary"
          sx={{ fontWeight: "bold" }}
        >
          No Requests Found
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={4} sx={{ marginTop: 3 }}>
          <Table sx={{ ...font }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#000000" }}>
                {headings.map((head) => (
                  <TableCell
                    key={head}
                    align="center"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((user, i) => (
                <TableRow
                  key={user.id}
                  sx={{
                    backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa",
                    "&:hover": { backgroundColor: "#e0f7fa" },
                  }}
                >
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.contact}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="center">
                    {user.status !== "PENDING" ? (
                      <Chip
                        label={formatStatus(user.status)}
                        color={user.status === "APPROVED" ? "success" : "error"}
                        style={{
                          padding: "1rem",
                          fontSize: "medium",
                          fontWeight: "700",
                          color: "white",
                        }}
                      />
                    ) : (
                      formatStatus(user.status)
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {user.status === "PENDING" ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleSellerAction(user.id, "approve")
                          }
                          startIcon={<CheckIcon />}
                          sx={{ mr: 1 }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            handleSellerAction(user.id, "reject")
                          }
                          startIcon={<CloseIcon />}
                        >
                          Reject
                        </Button>
                      </>
                    ) : user.status === "APPROVED" ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleSellerAction(user.id, "remove")}
                        startIcon={<DeleteIcon />}
                      >
                        Remove
                      </Button>
                    ) : (
                      "-"
                    )}
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

export default SellerRequest;

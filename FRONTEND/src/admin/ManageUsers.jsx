import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewallusers`);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users: " + err.message);
    }
  };
  const handleManage = (id) => {
    navigate(`/manage-artworks/${id}/artworks`)
  }
  const deleteUser = async (cid) => {
    try {
      const response = await axios.delete(`${config.url}/admin/deleteuser?cid=${cid}`);
      alert(response.data);
      fetchUsers();
    } catch (err) {
      setError("Unexpected Error: " + err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const font = { fontFamily: "Montserrat, sans-serif" };
  const headings = ["ID", "Name", "Gender", "Email", "Username", "Contact", "Role", "Delete", "Manage"];

  return (
    <div style={{ padding: "30px", ...font }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", textDecoration: "underline" }}
      >
        Manage Users
      </Typography>

      {error ? (
        <Typography align="center" color="error" sx={{ fontWeight: "bold", fontSize: "18px" }}>
          {error}
        </Typography>
      ) : users.length === 0 ? (
        <Typography align="center" color="error" sx={{ fontWeight: "bold", fontSize: "18px" }}>
          No User Data Found
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
              {users.map((user, i) => (
                <TableRow
                  key={user.id}
                  sx={{
                    backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa",
                    "&:hover": { backgroundColor: "#e0f7fa" },
                  }}
                >
                  {[user.id, user.name, user.gender, user.email, user.username, user.contact, user.role].map(
                    (val, idx) => (
                      <TableCell key={idx} align="center">
                        {val}
                      </TableCell>
                    )
                  )}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ManageAccountsIcon/>}
                      onClick={() => handleManage(user.id)}
                    >
                      Manage
                    </Button>
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

export default ManageUsers;
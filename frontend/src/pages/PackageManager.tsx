import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const PackageManager = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [editPkg, setEditPkg] = useState<any>(null);

  const fetchPackages = async () => {
    const res = await api.get("/packages");
    setPackages(res.data);
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleUpdate = async () => {
    await api.put(`/packages/${editPkg.packageId}`, editPkg);
    setEditPkg(null);
    fetchPackages();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Quản Lý Gói Dịch Vụ</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Tên Gói</TableCell>
              <TableCell>Giá (VNĐ)</TableCell>
              <TableCell>Thời hạn (Ngày)</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.packageId}>
                <TableCell>{pkg.packageName}</TableCell>
                <TableCell>{pkg.price.toLocaleString()}</TableCell>
                <TableCell>{pkg.durationDays}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => setEditPkg(pkg)}>Sửa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editPkg} onClose={() => setEditPkg(null)}>
        <DialogTitle>Cập nhật Gói Dịch Vụ</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField label="Tên Gói" fullWidth value={editPkg?.packageName || ''} onChange={(e) => setEditPkg({...editPkg, packageName: e.target.value})} />
          <TextField label="Giá" type="number" fullWidth value={editPkg?.price || 0} onChange={(e) => setEditPkg({...editPkg, price: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPkg(null)}>Hủy</Button>
          <Button onClick={handleUpdate} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PackageManager;
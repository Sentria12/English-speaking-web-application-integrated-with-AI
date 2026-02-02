import { useState, useEffect } from "react";
import api from "../utils/api"; // axios instance
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import PaymentForm from "../components/PaymentForm";

const Packages = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openPayment, setOpenPayment] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get("/packages");
        setPackages(res.data);
      } catch (err) {
        setSuccessMsg("Lỗi tải gói dịch vụ");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleBuy = (pkg: any) => {
    setSelectedPkg(pkg);
    setOpenPayment(true);
  };

  const handlePaymentSuccess = () => {
    setOpenPayment(false);
    setSuccessMsg(`Đã mua thành công gói ${selectedPkg.name}!`);
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Các gói dịch vụ luyện nói
      </Typography>

      {successMsg && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {successMsg}
        </Alert>
      )}

      <Grid container spacing={4}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.packageId}>
            <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {pkg.packageName}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                  {pkg.price.toLocaleString("vi-VN")} VNĐ
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Thời hạn: {pkg.durationDays} ngày
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {pkg.hasMentor ? (
                    <Chip label="Có mentor" color="primary" />
                  ) : (
                    <Chip label="Chỉ AI" color="default" />
                  )}
                  <Chip
                    label={`Tối đa ${pkg.maxPracticeSessions} buổi`}
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Typography variant="body2">{pkg.description}</Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBuy(pkg)}
                >
                  Chọn gói này
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openPayment}
        onClose={() => setOpenPayment(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Thanh toán gói: {selectedPkg?.packageName}</DialogTitle>
        <DialogContent>
          <PaymentForm
            packageId={selectedPkg?.packageId}
            amount={selectedPkg?.price}
            onSuccess={handlePaymentSuccess}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPayment(false)}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Packages;

import { useState, useEffect } from "react";
import api from "../utils/api";
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
  CircularProgress,
  Alert,
  Stack,
  Paper,
} from "@mui/material";
import PaymentForm from "../components/PaymentForm";

const Packages = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openPayment, setOpenPayment] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Gọi API lấy danh sách gói
    api
      .get("/packages")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPackages(res.data);
        } else {
          setPackages([]);
          console.warn("Dữ liệu trả về không phải là mảng:", res.data);
        }
      })
      .catch((err) => {
        console.error("Lỗi API Packages:", err);
        setError("Không thể kết nối đến máy chủ hoặc chưa đăng nhập.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleBuy = (pkg: any) => {
    setSelectedPkg(pkg);
    setOpenPayment(true);
  };

  // 1. Trạng thái đang tải
  if (loading)
    return (
      <Stack alignItems="center" sx={{ mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>
          Đang tải danh sách gói dịch vụ...
        </Typography>
      </Stack>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
        color="primary"
      >
        Gói Dịch Vụ Luyện Nói
      </Typography>
      {/* hiển thị lỗi nếu có  */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && packages.length === 0 && !error && (
        <Paper sx={{ p: 5, textAlign: "center", bgcolor: "#f5f5f5" }}>
          <Typography variant="h6" color="textSecondary">
            Hiện chưa có gói dịch vụ nào khả dụng.
          </Typography>
          <Typography variant="body2">
            Vui lòng kiểm tra lại Database bảng 'learning_packages'.
          </Typography>
        </Paper>
      )}

      <Grid container spacing={4}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.packageId || pkg.id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: 4,
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": { boxShadow: 10 },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  fontWeight="bold"
                >
                  {pkg.packageName}
                </Typography>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                  {pkg.price?.toLocaleString()}{" "}
                  <Typography component="span" variant="h6">
                    VNĐ
                  </Typography>
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label={`${pkg.durationDays} ngày`}
                    color="info"
                    variant="outlined"
                  />
                  <Chip
                    label={pkg.hasMentor ? "Có Mentor" : "Chỉ AI"}
                    color={pkg.hasMentor ? "secondary" : "default"}
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {pkg.description || "Không có mô tả cho gói này."}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => handleBuy(pkg)}
                  sx={{ borderRadius: 2 }}
                >
                  Chọn gói này
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog thanh toán */}
      <Dialog
        open={openPayment}
        onClose={() => setOpenPayment(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Thanh toán: {selectedPkg?.packageName}
        </DialogTitle>
        <DialogContent dividers>
          <PaymentForm
            packageId={selectedPkg?.packageId}
            amount={selectedPkg?.price}
            onSuccess={() => {
              setOpenPayment(false);
              alert("Thanh toán thành công!");
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Packages;

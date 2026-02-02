// src/components/PaymentForm.tsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios"; // Fix: thêm import axios

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
    "pk_test_51StV9MBCX1k8mTVi9UrIF4P1nuyvU3KvHFAKIVh05hlqBcuxNTbJcKQ9WTdtCbCyspasZBL0xDU6ywsHovZ2DzrA001PFEuQoY",
);

interface PaymentFormProps {
  packageId: number;
  amount: number; // VNĐ
  onSuccess: () => void;
}

const PaymentFormInner: React.FC<PaymentFormProps> = ({
  packageId,
  amount,
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!stripe || !elements) {
      setError("Stripe chưa sẵn sàng. Vui lòng thử lại sau.");
      return;
    }

    if (amount <= 0 || packageId <= 0) {
      setError("Thông tin gói dịch vụ không hợp lệ.");
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Không tìm thấy phần tử thẻ thanh toán.");
      setProcessing(false);
      return;
    }

    try {
      // Bước 1: Gọi backend tạo PaymentIntent → lấy clientSecret
      const intentRes = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/payment/create-intent`,
        { packageId, amount },
        { headers: { "Content-Type": "application/json" } },
      );

      const { clientSecret } = intentRes.data;

      if (!clientSecret) {
        throw new Error("Không nhận được clientSecret từ server");
      }

      // Bước 2: Confirm payment trên frontend
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "User Name", // Có thể lấy từ profile sau này
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message || "Xác nhận thanh toán thất bại");
        setProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Optional: Gọi backend confirm success
        await axios.post(
          `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/payment/confirm`,
          { paymentIntentId: paymentIntent.id, packageId },
        );

        onSuccess();
        alert("Thanh toán thành công! Gói dịch vụ đã được kích hoạt.");
      } else {
        setError("Thanh toán chưa hoàn tất. Vui lòng thử lại.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.",
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 480,
        mx: "auto",
        p: 4,
        boxShadow: 4,
        borderRadius: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" gutterBottom align="center" color="primary">
        Thanh toán gói dịch vụ
      </Typography>

      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 3, color: "text.secondary" }}
      >
        {amount.toLocaleString("vi-VN")} VNĐ
      </Typography>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#1a1a2e",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#ef5350" },
          },
        }}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || processing}
        sx={{
          mt: 4,
          py: 1.5,
          background: "linear-gradient(90deg, #4361ee, #3f37c9)",
          "&:hover": { background: "linear-gradient(90deg, #3f37c9, #4361ee)" },
        }}
      >
        {processing ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1, color: "white" }} />
            Đang xử lý...
          </>
        ) : (
          "Thanh toán ngay"
        )}
      </Button>
    </Box>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentFormInner {...props} />
  </Elements>
);

export default PaymentForm;

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import api from "../utils/api";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_...",
);

interface PaymentFormProps {
  packageId: number;
  amount: number;
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
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // Gọi qua api.post để có Token
      const intentRes = await api.post("/payment/create-intent", {
        packageId,
        amount,
      });
      const { clientSecret } = intentRes.data;

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: elements.getElement(CardElement)! },
        });

      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent?.status === "succeeded") {
        await api.post("/payment/confirm", {
          paymentIntentId: paymentIntent.id,
          packageId,
        });
        onSuccess();
        alert("Thanh toán thành công!");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Lỗi thanh toán");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 3, bgcolor: "white", borderRadius: 2 }}
    >
      <Typography variant="h6" align="center">
        {amount.toLocaleString()} VNĐ
      </Typography>
      <Box sx={{ my: 3, p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Button type="submit" variant="contained" fullWidth disabled={processing}>
        {processing ? <CircularProgress size={24} /> : "THANH TOÁN NGAY"}
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

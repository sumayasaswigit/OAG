package com.fsd.sdp.asthetica.service;

import java.security.SignatureException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.model.Order;
import com.fsd.sdp.asthetica.repository.OrderRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key_id}")
    private String keyId;

    @Value("${razorpay.key_secret}")
    private String secretKey;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Map<String, Object> createOrder(Long artworkId, String username, int amount) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(keyId, secretKey);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // Convert INR to paise
        options.put("currency", "INR");
        options.put("receipt", "order_rcptid_" + artworkId);

        com.razorpay.Order razorOrder = client.orders.create(options);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", razorOrder.get("id"));
        response.put("amount", razorOrder.get("amount"));
        response.put("currency", razorOrder.get("currency"));

        return response;
    }

    @Override
    public boolean verifyPayment(Map<String, String> payload) throws SignatureException {
        String expectedSignature = payload.get("razorpay_signature");
        String actual = payload.get("razorpay_order_id") + "|" + payload.get("razorpay_payment_id");

        System.out.println("Actual String for Signature: " + actual);
        String generated = hmacSHA256(actual, secretKey);
        System.out.println("Generated Signature: " + generated);
        System.out.println("Expected Signature: " + expectedSignature);

        boolean verified = expectedSignature.equals(generated);

        if (verified) {
            Order order = new Order();
            order.setRazorpayOrderId(payload.get("razorpay_order_id"));
            order.setUsername(payload.get("username"));
            order.setArtworkId(Long.parseLong(payload.get("artwork_id")));
            order.setAmount(Integer.parseInt(payload.get("amount"))); 
            order.setCreatedAt(LocalDateTime.now());

            orderRepository.save(order);
        }

        return verified;
    }

    private static String hmacSHA256(String data, String key) throws SignatureException {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret = new SecretKeySpec(key.getBytes(), "HmacSHA256");
            mac.init(secret);
            byte[] hash = mac.doFinal(data.getBytes());
            return Hex.encodeHexString(hash);
        } catch (Exception e) {
            throw new SignatureException("Error generating HMAC", e);
        }
    }
}
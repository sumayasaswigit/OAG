package com.fsd.sdp.asthetica.service;

import java.security.SignatureException;
import java.util.Map;

import com.razorpay.RazorpayException;

public interface PaymentService {
    Map<String, Object> createOrder(Long artworkId, String username, int amount) throws RazorpayException;
    boolean verifyPayment(Map<String, String> payload) throws SignatureException;
}

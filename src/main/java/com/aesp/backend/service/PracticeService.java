package com.aesp.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class PracticeService {

    private static final Logger logger = LoggerFactory.getLogger(PracticeService.class);

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.api.key}")
    private String apiKey;

    public String startConversation(String topic, String userMessage) {
        // Model ổn định và đang chạy tốt (2.5-flash)
        String url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key="
                + apiKey;

        String prompt = String.format(
                "You are a friendly and patient English mentor. " +
                        "The current speaking topic is: '%s'. " +
                        "The student just said: \"%s\". " +
                        "Respond naturally in English. Gently correct any minor grammar, vocabulary, or pronunciation issues (based on text). "
                        +
                        "Praise what they did well. End with 1-2 follow-up questions or suggestions to continue the conversation.",
                topic, userMessage);

        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            logger.info("Gemini text response status: {}", response.getStatusCode());

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode candidates = root.path("candidates");

            if (candidates.isEmpty() || candidates.get(0).path("content").path("parts").isEmpty()) {
                return "Gemini did not return valid response.";
            }

            String reply = candidates.get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText("").trim();

            // Lọc thẻ lạ nếu Gemini trả về định dạng đặc biệt
            reply = reply.replaceAll("<.*?>", "").trim();

            return reply.isEmpty() ? "No reply from Gemini" : reply;

        } catch (Exception e) {
            logger.error("Lỗi gọi Gemini startConversation", e);
            return "Lỗi gọi Gemini: " + e.getMessage();
        }
    }

    public String analyzeAudio(MultipartFile audioFile, String topic) {
        if (audioFile == null || audioFile.isEmpty()) {
            return "File audio rỗng hoặc không hợp lệ.";
        }

        try {
            // 1. Đọc file thành byte[]
            byte[] audioBytes = audioFile.getBytes();

            // 2. Chuyển byte[] thành base64 (Gemini yêu cầu inline data)
            String base64Audio = Base64.getEncoder().encodeToString(audioBytes);

            // 3. Xác định MIME type (Gemini hỗ trợ audio/mp3, audio/wav, audio/m4a,
            // audio/webm, ...)
            String mimeType = audioFile.getContentType();
            if (mimeType == null || !mimeType.startsWith("audio/")) {
                mimeType = "audio/mp3"; // fallback an toàn
            }

            // 4. Prompt yêu cầu Gemini phân tích audio chi tiết
            String prompt = String.format(
                    "This is an audio clip of a student practicing English speaking on the topic '%s'. " +
                            "Listen carefully to the audio and provide detailed, constructive feedback in English: " +
                            "- Overall pronunciation score out of 10 (be honest but encouraging). " +
                            "- Specific pronunciation errors (e.g., intonation, word stress, vowel/consonant sounds, linking, rhythm). "
                            +
                            "- Any detectable grammar, vocabulary, or fluency issues from the spoken content. " +
                            "- Strengths and positive points (what they did well). " +
                            "- 2–3 practical suggestions to improve speaking and pronunciation. " +
                            "Keep the tone friendly, supportive, and motivating like a patient English mentor.",
                    topic);

            // 5. Build request body cho Gemini (text prompt + inline audio)
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", prompt);

            Map<String, Object> inlineData = new HashMap<>();
            inlineData.put("mimeType", mimeType);
            inlineData.put("data", base64Audio);

            Map<String, Object> audioPart = new HashMap<>();
            audioPart.put("inlineData", inlineData);

            Map<String, Object> content = new HashMap<>();
            content.put("parts", List.of(textPart, audioPart));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(content));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            // 6. URL model hỗ trợ audio tốt (dùng gemini-2.5-flash vì bạn đã chạy được text
            // với model này)
            String url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key="
                    + apiKey;

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            logger.info("Gemini audio response status: {}", response.getStatusCode());

            // 7. Parse feedback
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode candidates = root.path("candidates");

            if (candidates.isEmpty() || candidates.get(0).path("content").path("parts").isEmpty()) {
                return "Gemini did not return valid audio analysis.";
            }

            String feedback = candidates.get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText("").trim();

            // Lọc thẻ lạ nếu có
            feedback = feedback.replaceAll("<.*?>", "").trim();

            return feedback.isEmpty() ? "No feedback from Gemini" : feedback;

        } catch (Exception e) {
            logger.error("Lỗi gọi Gemini analyzeAudio", e);
            return "Lỗi phân tích audio với Gemini: " + e.getMessage();
        }
    }
}
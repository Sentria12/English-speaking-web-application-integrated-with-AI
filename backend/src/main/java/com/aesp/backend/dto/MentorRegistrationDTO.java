package com.aesp.backend.dto; // Thêm dòng này để hết lỗi

public class MentorRegistrationDTO {
    private String experienceSummary;
    private String certificatesUrl;

    // Getters và Setters
    public String getExperienceSummary() {
        return experienceSummary;
    }

    public void setExperienceSummary(String experienceSummary) {
        this.experienceSummary = experienceSummary;
    }

    public String getCertificatesUrl() {
        return certificatesUrl;
    }

    public void setCertificatesUrl(String certificatesUrl) {
        this.certificatesUrl = certificatesUrl;
    }
}
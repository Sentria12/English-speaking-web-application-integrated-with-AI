package com.aesp.backend.service;

import com.aesp.backend.entity.LearningPackage;
import com.aesp.backend.repository.LearningPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {

    private final LearningPackageRepository packageRepository;

    @Autowired
    public PackageService(LearningPackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    /**
     * Lấy tất cả gói học (không filter)
     * 
     * @return Danh sách tất cả gói học trong DB
     */
    public List<LearningPackage> getAllPackages() {
        List<LearningPackage> packages = packageRepository.findAll();
        // Log debug để kiểm tra (xóa sau khi test xong nếu không cần)
        System.out.println("=== DEBUG PackageService ===");
        System.out.println("Tìm thấy " + packages.size() + " gói học");
        packages.forEach(p -> System.out.println(" - ID: " + p.getPackageId() + " | Tên: " + p.getPackageName()));
        return packages;
    }

    /**
     * Lấy gói học theo ID
     * 
     * @param packageId ID của gói học
     * @return Gói học nếu tìm thấy, ném exception nếu không
     * @throws RuntimeException nếu không tìm thấy gói học
     */
    public LearningPackage getPackageById(Integer packageId) {
        return packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy gói học với ID: " + packageId));
    }

    // Nếu sau này cần thêm filter active
    // public List<LearningPackage> getActivePackages() {
    // return packageRepository.findByIsActive(true);
    // }
}
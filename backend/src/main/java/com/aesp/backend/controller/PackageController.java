package com.aesp.backend.controller;

import com.aesp.backend.entity.LearningPackage;
import com.aesp.backend.service.PackageService;
import com.aesp.backend.repository.LearningPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PackageController {

    @Autowired
    private PackageService packageService;

    @Autowired
    private LearningPackageRepository packageRepository;

    @GetMapping
    public ResponseEntity<List<LearningPackage>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    // ADMIN: Thêm gói mới
    @PostMapping
    public ResponseEntity<LearningPackage> createPackage(@RequestBody LearningPackage pkg) {
        return ResponseEntity.ok(packageRepository.save(pkg));
    }

    // ADMIN: Cập nhật gói
    @PutMapping("/{id}")
    public ResponseEntity<LearningPackage> updatePackage(@PathVariable Integer id,
            @RequestBody LearningPackage pkgDetails) {
        return packageRepository.findById(id).map(pkg -> {
            pkg.setPackageName(pkgDetails.getPackageName());
            pkg.setPrice(pkgDetails.getPrice());
            pkg.setDurationDays(pkgDetails.getDurationDays());
            pkg.setDescription(pkgDetails.getDescription());
            return ResponseEntity.ok(packageRepository.save(pkg));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ADMIN: Xóa gói
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePackage(@PathVariable Integer id) {
        packageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
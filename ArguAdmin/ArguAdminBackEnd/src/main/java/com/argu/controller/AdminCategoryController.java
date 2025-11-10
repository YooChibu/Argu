package com.argu.controller;

import com.argu.dto.response.ApiResponse;
import com.argu.entity.Category;
import com.argu.service.AdminCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "관리자 카테고리 관리 API", description = "카테고리 조회, 생성, 수정, 삭제 등 카테고리 관리 API")
@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
public class AdminCategoryController {
    private final AdminCategoryService adminCategoryService;

    @Operation(summary = "카테고리 목록 조회", description = "전체 카테고리 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> getCategories() {
        List<Category> categories = adminCategoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @Operation(summary = "카테고리 상세 조회", description = "카테고리의 상세 정보를 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategoryDetail(@PathVariable Long id) {
        Category category = adminCategoryService.getCategoryById(id);
        return ResponseEntity.ok(ApiResponse.success(category));
    }

    @Operation(summary = "카테고리 생성", description = "새로운 카테고리를 생성합니다.")
    @PostMapping
    public ResponseEntity<ApiResponse<Category>> createCategory(
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer orderNum) {
        Category category = adminCategoryService.createCategory(name, description, orderNum);
        return ResponseEntity.ok(ApiResponse.success("카테고리가 생성되었습니다", category));
    }

    @Operation(summary = "카테고리 수정", description = "카테고리 정보를 수정합니다.")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer orderNum) {
        Category category = adminCategoryService.updateCategory(id, name, description, orderNum);
        return ResponseEntity.ok(ApiResponse.success("카테고리가 수정되었습니다", category));
    }

    @Operation(summary = "카테고리 삭제", description = "카테고리를 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        adminCategoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success("카테고리가 삭제되었습니다", null));
    }
}




package com.argu.service;

import com.argu.entity.Category;
import com.argu.exception.BadRequestException;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminCategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAllByOrderByOrderNumAsc();
    }

    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("카테고리를 찾을 수 없습니다"));
    }

    @Transactional
    public Category createCategory(String name, String description, Integer orderNum) {
        if (categoryRepository.findByName(name).isPresent()) {
            throw new BadRequestException("이미 존재하는 카테고리입니다");
        }
        Category category = Category.builder()
                .name(name)
                .description(description)
                .orderNum(orderNum != null ? orderNum : 0)
                .build();
        return categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(Long categoryId, String name, String description, Integer orderNum) {
        Category category = getCategoryById(categoryId);
        if (name != null) {
            if (categoryRepository.findByName(name).isPresent() && !category.getName().equals(name)) {
                throw new BadRequestException("이미 존재하는 카테고리입니다");
            }
            category.setName(name);
        }
        if (description != null) category.setDescription(description);
        if (orderNum != null) category.setOrderNum(orderNum);
        return categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(Long categoryId) {
        Category category = getCategoryById(categoryId);
        categoryRepository.delete(category);
    }
}




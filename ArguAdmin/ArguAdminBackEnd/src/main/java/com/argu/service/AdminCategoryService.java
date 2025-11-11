package com.argu.service;

import com.argu.entity.Category;
import com.argu.exception.BadRequestException;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 카테고리(논쟁 분류) 관리 비즈니스 로직을 담당하는 서비스.
 * <p>
 * 목록 조회, 상세 조회, 생성, 수정, 삭제 등 운영 기능을 제공한다.
 */
@Service
@RequiredArgsConstructor
public class AdminCategoryService {
    private final CategoryRepository categoryRepository;

    /**
     * 카테고리를 정렬 순서 기준으로 전체 조회한다.
     *
     * @return 카테고리 목록
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAllByOrderByOrderNumAsc();
    }

    /**
     * ID로 카테고리를 조회한다.
     *
     * @param categoryId 카테고리 ID
     * @return 카테고리 엔티티
     * @throws ResourceNotFoundException 존재하지 않을 때
     */
    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("카테고리를 찾을 수 없습니다"));
    }

    /**
     * 새로운 카테고리를 생성한다.
     *
     * @param name        카테고리명
     * @param description 설명(선택)
     * @param orderNum    정렬 순서(선택)
     * @return 생성된 카테고리
     * @throws BadRequestException 이름이 중복될 때
     */
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

    /**
     * 카테고리 정보를 변경한다.
     *
     * @param categoryId  카테고리 ID
     * @param name        변경할 이름
     * @param description 변경할 설명
     * @param orderNum    변경할 정렬 순서
     * @return 수정된 카테고리
     * @throws BadRequestException 이름이 중복될 때
     */
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

    /**
     * 카테고리를 삭제한다.
     *
     * @param categoryId 삭제할 카테고리 ID
     */
    @Transactional
    public void deleteCategory(Long categoryId) {
        Category category = getCategoryById(categoryId);
        categoryRepository.delete(category);
    }
}




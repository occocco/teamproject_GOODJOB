package com.goodjob.post.postdto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

// 공고 조회에서 사용할 DTO
@Builder
@AllArgsConstructor
@Data
public class PostDetailsDTO {
    private Long postId; // 공고 pk
    private String title; // 공고 제목
    private String regionName; // 공고 근무지
    private String content; // 공고 내용
    private String startDate; // 공고 시작일
    private String endDate; // 공고 마감일
    private String remainDay; // d-day
    private String postAddress; // 우편 번호 + 주소

    private String occName; // 공고 직종명
    private String comName; // 공고 회사명

}
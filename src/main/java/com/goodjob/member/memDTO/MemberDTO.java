/**
 * ho - 22.10.17 로그인 폼 통일위해
 * loginId,pw 필드 통일
 * 18,19,33,34라인 변경 (memLoginId->loginId , memPw->pw)
 */
package com.goodjob.member.memDTO;

import com.goodjob.member.Member;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;

@Data
@Builder
public class MemberDTO {
    private Long memId;
    @Size(min = 3, max = 15, message = "ID는 3~15자 사이여야 합니다.")
    @NotBlank(message = "사용자 ID는 필수항목입니다.")
    private String loginId;

    @Size(min = 3, max = 25, message = "Password는 3~25자 사이여야 합니다.")
    private String pw;
    private String pw2;
    private String memPhone;
    private String memEmail1;
    private String memEmail2;
    private String memName;
    private Date memBirthDate;
    private String memAddress;
    private String detailAddress;
    private String memGender;
    private String memTerms;

    public Member toEntity() {
        Member member = Member.builder()
                .memId(memId)
                .memLoginId(loginId)
                .memPw(pw)
                .memName(memName)
                .memPhone(memPhone)
                .memEmail(memEmail1+"@"+memEmail2)
                .memBirthDate(memBirthDate)
                .memAddress(memAddress +"@"+ detailAddress)
                .memGender(memGender)
                .memTerms(memTerms)
                .build();
        return member;
    }

}
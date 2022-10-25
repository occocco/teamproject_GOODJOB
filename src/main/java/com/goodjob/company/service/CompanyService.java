/**
 * HO - 2022.10.05
 * 서비스 클래스
 * 기업회원 회원가입 메서드
 * + 2022.10.06 회원가입시 아이디 중복확인 메서드
 *
 * +2022.10.17
 * 로그인 폼 기업/개인 통일 위해 로그인, 비밀번호 창 name 통일. 필드도 loginId,pw 통일(38라인 변경)
 */
package com.goodjob.company.service;

import com.goodjob.company.Comdiv;
import com.goodjob.company.Company;
import com.goodjob.company.Region;
import com.goodjob.company.repository.CompanyRepository;
import com.goodjob.company.dto.CompanyDTO;
import com.goodjob.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

    //22.10.09 - 비밀번호 암호화를 위해 추가
    private final PasswordEncoder passwordEncoder;

    //기업회원가입정보 DB에 저장하는 메서드
    @Transactional
    public Long createCompanyUser(CompanyDTO companyDTO) {
        //22.10.09 - 비밀번호 암호화를 위해 추가
        //companyDTO를 가져와서 여기서 비밀번호를 암호화하는 방법.
        //ho - 22.10.17 getcomPw1 -> getPw (로그인 폼 input name 통일. DTO 필드 loginId,pw 로 통일)
        companyDTO.setPw(passwordEncoder.encode(companyDTO.getPw()));

        Company newCompanyUser = companyDTO.toEntity();
        companyRepository.save(newCompanyUser);
        return newCompanyUser.getComId();
    }

    //아이디 중복확인 메서드
    public int checkId2(String comLoginId) throws Exception {
        return companyRepository.checkId2(comLoginId);
    }

    public Optional<Company> loginIdCheck(String comLoginId) {
        return companyRepository.findByComLoginId(comLoginId);
    }

    public CompanyDTO entityToDTO(String comLoginId, String comName, String comBusiNum, String comPhone,
                                  String comComdivCode, String comRegCode, String comEmail1, String comEmail2,
                                  String comAddress1, String comAddress2, String comAddress3,
                                  String comAddress4, String comInfo){

        CompanyDTO dto = CompanyDTO.builder()
                .loginId(comLoginId)
                .comName(comName)
                .comBusiNum(comBusiNum)
                .comPhone(comPhone)
                .comComdivCode(comComdivCode)
                .comRegCode(comRegCode)
                .comEmail1(comEmail1+"@")
                .comEmail2(comEmail2)
                .comAddress1(comAddress1)
                .comAddress2(comAddress2)
                .comAddress3(comAddress3)
                .comAddress4(comAddress4)
                .comInfo(comInfo)
                .build();

        return dto;
    }

    public CompanyDTO entityToDTO2(Company company){
        String comLoginId = company.getComLoginId();
        String comName = company.getComName();
        String comBusiNum = company.getComBusiNum();
        String comPhone = company.getComPhone();
        Comdiv comComdivCode = company.getComComdivCode();
        Region comRegCode = company.getComRegCode();

        String comEmail = company.getComEmail();
        String[] email = comEmail.split("@");

        String comAddress = company.getComAddress();
        String[] address = comAddress.split("@");

        String comInfo = company.getComInfo();

        CompanyDTO dto2 = CompanyDTO.builder()
                .loginId(comLoginId)
                .comName(comName)
                .comBusiNum(comBusiNum)
                .comPhone(comPhone)
                .comComdivCode(comComdivCode.getComdivName())
                .comRegCode(comRegCode.getRegName())
                .comEmail1(email[0])
                .comEmail2(email[1])
                .comAddress1(address[0])
                .comAddress2(address[1])
                .comAddress3(address[2])
                .comAddress4(address[3])
                .comInfo(comInfo)
                .build();

        return dto2;

    }

    //22.10.18 - ho 기업회원정보 수정하고 DB에 저장.
    public void companyInfoUpdate(CompanyDTO companyDTO){
        Company company = companyDTO.toEntity();
        System.out.println("==============company.getComComdivCode() = " + company.getComComdivCode());
        System.out.println("===========company = " + company.getComName());
        companyRepository.updateInfo(company);

    }

}
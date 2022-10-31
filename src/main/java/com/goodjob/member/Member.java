package com.goodjob.member;

import com.goodjob.resume.Resume;
import com.goodjob.status.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Member")
@Builder
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memId;

    @Column(unique = true)
    private String memLoginId;

    @OneToMany(mappedBy = "resumeMemId", cascade = CascadeType.ALL)
    private List<Resume> memResume = new ArrayList<>();

    @OneToMany(mappedBy = "statMemId", cascade = CascadeType.REMOVE)
    private List<Status> memStatus = new ArrayList<>();

    @Column
    private String memPw;

    @Column
    private String memPhone;

    @Column
    private String memEmail;

    @Column
    private String memName;

    @Column
    private Date memBirthDate;

    @Column
    private String memAddress;

    @Column
    private String memGender;

    @Column(length = 2)
    private String memTerms;

    /** 비밀번호 변경 **/
    public void updatePassword(String password){
        System.out.println("++++++++"+password);
        this.memPw = password;
    }
}

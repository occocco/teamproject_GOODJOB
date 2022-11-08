
//id 중복 확인
 function checkMassage(){
     const id = $('#id').val(); //id값이 "id"인 입력란의 값을 저장
     let regExp = /^[a-z0-9_-]{3,15}$/;
     $.ajax({
         type : "post",
         url:'/member/checkId?id='+id, //Controller에서 요청 받을 주소
         success:function(result){ //컨트롤러에서 값을 받는다
             console.log(result)
                if(!regExp.test(id)){
                    $('#checkMassage').css('color','red')
                    $('#checkMassage').html("아이디는 3~15자의 영문 소문자와 숫자,특수기호(_),(-)만 사용 가능합니다.")
                } else {
                    if (result == 2) {
                        $('#checkMassage').css('color', 'blue')
                        $('#checkMassage').html("사용할 수 있는 아이디입니다.")
                    } else {
                        $('#checkMassage').css('color', 'red')
                        $('#checkMassage').html("이미 존재하는 아이디입니다.")
                    }
                }
         }
     });
 };
//email 중복 확인
function emailCheckMassage(){
    const inputEmail = $('#signUpEmail').val();
    const selectEmail =$('#emailSelect').val();
    const email =inputEmail+"@"+selectEmail;
    $.ajax({
        url:'/member/signupEmail?email='+email ,
        success:function(result){
            console.log(result)
            if(result == "false"){
                $('#emailCheckMassage').css('color','blue')
                $('#emailCheckMassage').html("가입 가능한 이메일입니다.")
            } else if (result == "mem") {
                $('#emailCheckMassage').css('color','red')
                $('#emailCheckMassage').html("이미 개인회원으로 가입한 이메일입니다.")
            }else if (result == "com") {
                $('#emailCheckMassage').css('color','red')
                $('#emailCheckMassage').html("이미 기업회원으로 가입한 이메일입니다.")
            }
        }
    });
}

 //주소찾기
 function execPostCode() {
     daum.postcode.load(function () {
         new daum.Postcode({
             oncomplete: function (data) {
                 var addr = '';

                 if (data.userSelectedType === 'R') {
                     addr = data.roadAddress;
                 } else {
                     addr = data.jibunAddress;
                 }
                 document.getElementById("userAddress").value = '(' + data.zonecode + ') ' + addr;
                 document.getElementById("userDetailAddress").focus();
             }
         }).open();
     });
 }
 //회원가입 비밀번호 확인
 function test() {
     var p1 = document.getElementById('pw1').value;
     var p2 = document.getElementById('pw2').value;
     var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{3,25}$/g;

     if(!regExp.test(p1)) {
         $('#confirmMsg').css('color','red')
         $('#confirmMsg').html("비밀번호 양식을 확인해주세요.")
         return false;
     } else {
         if(p1 != p2){
             $('#confirmMsg').css('color','red')
             $('#confirmMsg').html("비밀번호 불일치")
             return false;
         } else {
             $('#confirmMsg').css('color','blue')
             $('#confirmMsg').html("비밀번호 일치")
             return true;
         }
     }
     return true;
 }
 // 전화번호 양식 확인
function checkPhone(){
    let phone = $('#phone').val();
    let regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
    let phone_error = $('#phone_error');

    if(!regExp.test(phone)) {
        phone_error.css("color",'red');
        phone_error.show().text("형식이 맞지 않습니다. 다시 확인해주세요.");
    }else {
        phone_error.css("color",'blue');
        phone_error.show().text("올바른 형식입니다.");
    }
}

 // login 페이지 기업 or 개인 회원 체크
 function checkOnlyOneLogin(element) {
     //checkbox 중복 선택 불가
     const checkboxes
         = document.getElementsByName("type");

     checkboxes.forEach((cb) => {
         cb.checked = false;
     })

     element.checked = true;
     $('#chk').val(element.value) //
 }
//로그인 시 type 확인 후 해당 db조회
 function UserTypeLogin() {
     const form = document.forms['frm'];
     const type = $('#chk').val();
     console.log(type);

     if(type=="member"){
         form.action = "/member/login";
         form.submit();
     }else if(type=="none"){
         Swal.fire({
             icon: 'error',
             title: '로그인',
             text: '회원타입을 선택해주세요.'
         }).then(function () {
             location.href = "/login";
         });
     }else {
         form.action = "/com/login";
         form.submit();
     }
 }
 // 개인정보 수정버튼 function
$(document).ready(function() {
    $("#bb").click(function() {
        $("#dis").removeAttr("disabled");
        $("#bb").css("display", 'none');
        $("#realUpdate").append("<button type=\"button\" class=\"btn bg-gradient-dark w-100\" style=\"font-size:15px\" data-target=\"#pwCheck\" data-toggle=\"modal\">수정완료</button>");
    })
});
 //개인정보 수정 시 비밀번호 확인
$(document).ready(function() {
    $("#updatebtn").click(function () {
        $.ajax({
            type: "post",
            url: "/member/checkPW",
            data: "loginId="+$("#id").val()+"&pw="+$('#pw').val(),
            success: function (data) {
              if(data=="0"){
                  Swal.fire("회원정보를 수정합니다!","","success").then(function () {
                      document.getElementById("formUpdate").submit();
                  })
            }else {
                  Swal.fire("비밀번호를 확인해주세요","","error");
            }
        }
     })
    })
});
//회원탈퇴
function deleteMember() {
    Swal.fire({
        title: "정말 탈퇴하시겠습니까?",
        text: "회원탈퇴 시 기존 작성된 이력서는 삭제되고 지원이력은 보관됩니다.",
        icon: "warning",
        confirmButtonText: "예",
        cancelButtonText: "아니요",
        closeOnConfirm: true,
        showCancelButton: true,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "/member/delete",
                    data: "memId=" + $("#memId").val() + "&loginId=" + $("#id").val() + "&deletePw=" + $('#deletePw').val(),

                    success: function (data) {
                        if(data=="0"){
                            Swal.fire({
                                icon: 'success',                         // Alert 타입
                                title: '회원탈퇴',         // Alert 제목
                                text: '회원탈퇴가 완료되었습니다.'  // Alert 내용
                            }).then(function (){
                                location.replace('/'); //뒤로가기 불가능
                            });
                        } else {
                            Swal.fire("ERROR", "비밀번호를 확인해주세요.", "error");
                        }
                    }, error: function (e) {
                        console.log(e)
                    }
                });
            } else if (result.isCancled) {
                Swal.fire("회원탈퇴", "회원탈퇴를 취소합니다.", "error");
            }
        })
}
//비밀번호 찾기
$(document).ready(function() {
    $('#checkEmail').on('click', function () {
        checkEmail();
    })
});
function checkEmail(){
    const email = $('#email').val();
    // console.log(email);
    if(!email || email.trim() === ""){
        alert("이메일을 입력해주세요.")
    } else {
        $.ajax({
            type: 'post',
            url: '/member/checkEmail',
            data: {
                'memEmail': email
            },
            dataType: "text",
        }).done(function(result){
            // console.log("result :" + result);
            if (result == "com") {
                sendEmail("com");
                Swal.fire("임시 비밀번호 발송",'임시 비밀번호를 전송 했습니다.메일을 확인해주세요.',"success")
                .then(function (){
                    location.href="/login";
                })
                // alert('임시비밀번호를 전송 했습니다.메일을 확인해주세요.');
            } else if(result == "mem") {
                sendEmail("mem");
                alert('임시비밀번호를 전송 했습니다.메일을 확인해주세요.');
                window.location.href="/login";
            }
            else if (result == "false") {
                // Swal.fire("ERROR","가입정보가 없는 이메일입니다.","error");
               alert("가입정보가 없는 이메일입니다.")
            }
        }).fail(function(error){
            alert(JSON.stringify(error));
        })
    }
};
//임시비밀번호 메일발송
function sendEmail(type){
    const memberEmail = $('#email').val();
    $.ajax({
        type: 'POST',
        url: '/member/sendPw',
        data: {
            'memberEmail' : memberEmail,
            'mailType': type
        },success: function(result){
            // Swal.fire("임시 비밀번호 발송",'임시 비밀번호를 전송 했습니다.메일을 확인해주세요.',"success");
            alert('임시비밀번호를 전송 했습니다.메일을 확인해주세요.');
        },
        error: function(error){
            alert("ㅇㅇㅇㅇㅇㅇ"+JSON.stringify(error));
        }
    })
}
//비밀번호 변경 비번 check 모달
$(document).ready(function() {
    $("#changePwCheck").click(function () {
        $.ajax({
            type: "post",
            url: "/member/changePw",
            data: "id=" + $("#id").val() + "&checkPw=" + $('#checkPw').val(),
            success: function (data) {
                if (data == "0") {
                    location.href="/member/changePassword"
                } else {
                    Swal.fire("비밀번호 오류","비밀번호를 확인해주세요.","error")
                }
            },
            error: function (test) {
                alert(test);
            }
        })
    })
});
//비밀번호 변경 유효성 검사
function passwordChange()  {
    const pw1 = $('#pw1').val();
    const pw2 = $('#pw2').val();
    const regExpch = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{3,25}$/g;
    if (!regExpch.test(pw1)) {
        Swal.fire("비밀번호 사용 불가","비밀번호는 3~25자로 최소 하나의 문자, 숫자, 특수문자가 들어가야 합니다.","error");
        return false;
    } else {
        if(pw1 == pw2){
            Swal.fire("변경 완료","비밀번호가 변경되었습니다.","success").then(function (){
                $('#changePassword').submit();
            })
        } else {
            Swal.fire("비밀번호 불일치","입력하신 비밀번호를 확인해주세요.","error");
        }
    }
}

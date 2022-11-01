$(document).ready(function(){
    var pageNum = 0;
    var postId = $("#postId").val();
    getApplierList(postId, pageNum);
})

//지원자 리스트 출력
function getApplierList(postId, pageNum){
    $.getJSON('/status/getApplierList/' + postId + '/' + pageNum, function (result){
        var list = '';
        $(".postTitle").text("공고명 [" + result.dtoList[0].postTitle + "] 의 서류 지원자입니다.");

        $.each(result.dtoList, function (applyIdx, applier) {
            list += '    <tr>\n' +
                '      <th scope="row">' + (applyIdx + 1) + '</th>\n' +
                '      <td>' + applier.applierName + '</td>\n' +
                '      <td>' + applier.postTitle.substr(0, 10) + "..." + '</td>\n' +
                '      <td>' + applier.postOccupation + '</td>\n' +
                '      <td>' + applier.statApplyDate + '</td>\n' +
                '    <td><a href="/resume/resumeRead/'+ applier.applierId +'/'+ applier.statResumeId +'" target="_blank"><button class="btn btn-sm btn-info">이력서 열람</button></a></td>\n';

            if(applier.statPass === '서류합격'){
                list += '      <td style="color: #0a53be;">' + applier.statPass + '</td>\n';
            }else if(applier.statPass === '서류불합격'){
                list += '      <td style="color: red;">' + applier.statPass + '</td>\n';
            }
            else{
                list += '<td class="passBtn' + applier.statId + '"><button class="btn btn-sm btn-info" onclick="clickPass('+ applier.statId +')">합격</button>' +
                    '<button class="btn btn-sm btn-danger" onclick="clickUnPass('+ applier.statId +')">불합격</button>' +
                    '</td>';
            }

            list += '    </tr>\n';
        })

        $(".applierTable").html(list);

        var pageBtn = '';

        pageBtn += '<li class="page-item" th:if="${'+ result.prev +'}">';
        pageBtn += '<a class="page-link" onclick="getApplierList(' + (result.start - 1) + ')" tabindex="-1"><<</a>';
        pageBtn += '</li>';
        for(i = 0; i < result.totalPage; i++){
            pageBtn += '<a class="page-link" onclick="getApplierList('+ i +')"><li class="page-item">'+ (i + 1) +'</li></a>';
        }
        pageBtn += '<li class="page-item" th:if="${'+ result.next +'}">';
        pageBtn += '<a class="page-link" onclick="getApplierList(' + (result.end) + ')">>></a>';
        pageBtn += '</li>';

        $(".pagination").html(pageBtn);
    })
}

function clickPass(statId){
    if(confirm("서류 합격 처리하시겠습니까?")){
        $.ajax({
            url: "/status/changePass/" + statId,
            type: "get",
            success: function(){
                alert("서류 합격 처리하였습니다.");
                $(".passBtn" + statId).replaceWith('<td style="color: #0a53be;">서류합격</td>');
            }
        })
    }
}

function clickUnPass(statId){
    if(confirm("서류 불합격 처리하시겠습니까?")){
        $.ajax({
            url: "/status/changeUnPass/" + statId,
            type: "get",
            success: function(){
                alert("서류 불합격 처리하였습니다.");
                $(".passBtn" + statId).replaceWith('<td style="color: red;">서류불합격</td>');
            }
        })
    }
}
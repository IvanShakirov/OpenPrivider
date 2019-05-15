function filling_table() {
    since=since||0;
    var index;
    var link ='https://api.github.com/repositories?since=' + since;
    $.ajax({
        url: link,
        type: "GET",
        set: 200,
        success: function(resultData){
            var api_answer=resultData;
            index=name_filter(api_answer);
            $('table tbody tr').remove();
            for(var i=0; i<index.length;i++)
            {
                $('table tbody').append($("<tr>"));
                $('table tbody tr').eq(i).append($("<td>").text(api_answer[index[i]].id));
                $('table tbody tr').eq(i).append($("<td>").text(api_answer[index[i]].owner.login));
                $('table tbody tr').eq(i).append($("<td>").text(api_answer[index[i]].name));
                $('table tbody tr').eq(i).append($("<td>").text(api_answer[index[i]].description));
            }
            pagination(api_answer);
        }

    });
}

function name_filter(api_answer) {
    var text=$('.search input').val();
    var index=[];
    var k=0;
    if(text!=='') {
           for (var i = 0; i < api_answer.length; i++) {
                if (api_answer[i].owner.login.indexOf(text) !== -1) {
                    index[k] = i;
                    k++;
                     }
                }
    }
    else{//для первого прохождения и при пустом слоте с именем
        for( var i=0; i<api_answer.length ; i++)
        {
            index[i]=i;
        }
    }
    return(index);
}
function pagination_update () {
    since=0;
    filling_table();
    StartPageIndex=1;
    PrevSince.length=0;
    PrevSince[0]=1;
}
function pagination(api_answer) {
    var table = '#table';
    $('.pagination').html('');
    var Trnum = 0;
    var MaxRows = parseInt($('#maxRows').val());
    var TotalRows = $(table + ' tbody tr').length;
    $(table + ' tr:gt(0)').each(function () {
        Trnum++;
        if (Trnum > MaxRows) {
            $(this).hide();
        }
        if (Trnum <= MaxRows) {
            $(this).show();
        }
    });
    if (TotalRows > MaxRows) {
        var PageNum = Math.ceil(TotalRows / MaxRows);
        for (var i = StartPageIndex; i <= PageNum + StartPageIndex -1;) {
            $('.pagination').append('<li class="pagination-item page-link" data-page="' + i + '">\
								      <span>' + i++ + '<span class="sr-only">(current)</span></span>\
								    </li>').show();
        }
    }
    $('.pagination li:first-child').addClass('active');
    if(StartPageIndex>1)
    {
        $('.pagination').prepend('<a class="pagination-item page-link "  > <span aria-hidden="true">...</span> ' +
            '<span class="sr-only">Previous</span> </a>');
    }
    $('.pagination').append('<a class="pagination-item page-link "  > <span aria-hidden="true">...</span> ' +
        '<span class="sr-only">Previous</span> </a>');
    $('.pagination').prepend('<li class="pagination-item page-link " data-sign="Previous" > <span aria-hidden="true">&laquo;</span> ' +
        '<span class="sr-only">Previous</span> </li>');
    $('.pagination').append('<li class="pagination-item page-link active" data-sign="Next"> <span aria-hidden="true data-page="Next">&raquo;</span> ' +
        '<span class="sr-only">Next</span> </li');
    if(StartPageIndex>1){
        $('.pagination li:first-child').css('pointer-events','VisiblePainted');
    }else {
        $('.pagination li:first-child').css('color','#708289')
    }
    $('.pagination li').on('click', function () {
        $(window).scrollTop(0);
        var TrIndex = 0;
        var pageNum = +$(this).attr('data-page')-StartPageIndex+1;
        $('.pagination li').removeClass('active');
        $(this).addClass('active');
        if ($(this).attr('data-sign') === "Previous") {
            since = PrevSince[StartPageIndex];
            StartPageIndex--;
            filling_table()
        }  if ($(this).attr('data-sign')=== "Next") {
            StartPageIndex++;
            since = api_answer[MaxRows-1].id+1;
            PrevSince[StartPageIndex]=api_answer[0].id -1;
            filling_table();
            console.log(api_answer);
        }
            $(table + ' tr:gt(0)').each(function a() {
                TrIndex++;

                if (TrIndex > (MaxRows * pageNum) || TrIndex <= ((MaxRows * pageNum) - MaxRows)) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
    });

}


var since=0; //некрасиво, надо убрать, но я хз как
var PrevSince=[];PrevSince[0]=1;    //некрасиво, надо убрать, но я хз как
var StartPageIndex=1;   //некрасиво, надо убрать, но я хз как
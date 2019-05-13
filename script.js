function filling_table(api_answer) {
    for(i=0; i<150;i++)
    {
        $('table tbody').append($("<tr>"));
        // $('table tbody tr').eq(i).html.append("<th>"+api_answer[i].id+"</th>");
        // $('table tbody tr').eq(i).html("<td>"+api_answer[i].id+"</td>");
        // $('table tbody tr').eq(i).text.append("<td>"+api_answer[i].id+"</td>");
        // $('table tbody tr').eq(i).text("<td>"+api_answer[i].id+"</td>");
    $('table tbody tr').eq(i).append($("<th>").text(api_answer[i].id));
    $('table tbody tr').eq(i).append($("<td>").text(api_answer[i].owner.login));
    $('table tbody tr').eq(i).append($("<td>").text(api_answer[i].name));
    $('table tbody tr').eq(i).append($("<td>").text(api_answer[i].description));
    }
}
function pagination() {
    var table = '#table';
    $('#maxRows').on('change',function(){
        $('.pagination').html('');
        var trnum = 0 ;
        var maxRows = parseInt($(this).val());
        var totalRows = $(table+' tbody tr').length;
        $(table+' tr:gt(0)').each(function(){
            trnum++;
            if (trnum > maxRows ){
                $(this).hide();
                
            }if (trnum <= maxRows ){$(this).show();}
        });
        if (totalRows > maxRows){
            var pagenum = Math.ceil(totalRows/maxRows);
            for (var i = 1; i <= pagenum ;){
                $('.pagination').append('<li class="pagination-item page-link" data-page="'+i+'">\
								      <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
								    </li>').show();
            }
        }
        $('.pagination li:first-child').addClass('active');
        $('.pagination li').on('click',function(){
            var pageNum = $(this).attr('data-page');
            var trIndex = 0 ;
            $('.pagination li').removeClass('active');
            $(this).addClass('active');
            $(table+' tr:gt(0)').each(function(){
                trIndex++;
                if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                    $(this).hide();
                }else {$(this).show();}
            });
        });
    });
    $(function(){
        $('table tr:eq(0)').prepend('<th> ID </th>');
        var id = 0;
        $('table tr:gt(0)').each(function(){
            id++;
            $(this).prepend('<td>'+id+'</td>');
        });
    })
}
function f() {
var a;
$.ajax({
   url: 'https://api.github.com/repositories?since=364',
    type: "GET",
    success: function(resultData){
       a=resultData;
       console.log(a);
       filling_table(resultData);
       pagination();
    }
});

}
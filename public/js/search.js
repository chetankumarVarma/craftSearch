$(document).ready(function() {

    var basePath = 'http://localhost:8000';

    $('body').click(function() {
        $("#searchsuggestion").css("display", "none");
        $(".searchresult").remove();
    });

    var suggestStart = 0;
    var suggestLength = 10;
    var firstEnter = 0;

    $(".prop_name").on('paste, keyup', function(e) {
        if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13) {
            firstEnter = 0;
            var searchData = $(".prop_name").val();
            if (searchData != '') {
                $(".searchresult").remove();
                $("#searchsuggestion").css("display", "block");
                $.ajax({
                    type: 'GET',
                    url: basePath + '/autocomplete?q=' + searchData,
                    success: function(result) {
                        var resultData = JSON.parse(result);
                        var htmlStr = '';

                        if (resultData.length > 0) {
                            htmlStr += '<ul class="list-unstyled">';
                            $.each(resultData, function(key, value) {
                                htmlStr += "<li class='searchresult' data-id=" + value['_source']['id'] + ">" + value['_source']['name'] + "</li>";
                            });

                            htmlStr += '</ul>';

                            $("#searchsuggestion").html(htmlStr);
                        } else {
                            $("#searchsuggestion").html("No Data Found!!!");
                        }
                    },
                    failure: function() {
                        console.log('Error');
                    }
                });
            }
        } else if (e.keyCode == 13 && firstEnter == 0) {
            let queryString = $('.prop_name').val();
            $('.name_hide').val(queryString);
            basePath = basePath;
            $(".main_area_display1").html("");

            $(".loader").removeClass('d-none');
            $.ajax({
                type: 'GET',
                url: basePath + '/getSearchData?q=' + queryString,
                success: function(result) {
                    var resultData = JSON.parse(result);
                    var htmlStr = '';

                    $("#searchsuggestion").css("display", "none");

                    if (resultData.length > 0) {
                        $.each(resultData, function(key, value) {
                            htmlStr += '<div class="main_area_display shadow card pl-4 pr-4"><div class="pt-3 pb-3"><i class="far fa-building"></i><span class="pl-1 flat_name text-info">' + value['_source']['name'] + '</span></div><div class="row"><div class="col-md-4"><i class="fas fa-tags"></i><span class="pl-1 price_flat">' + value['_source']['price'] + '</span></div><div class="col-md-4"><i class="fa fa-bed mr-1" aria-hidden="true"></i><span class="bhk_flat">' + value['_source']['configuration'].join(', ') + '</span></div><div class="col-md-4"><span class="area_flat"><i class="fa fa-cube mr-1" aria-hidden="true"></i>' + value['_source']['carpet_area'].join(', ') + ' sq. ft.</span></div></div><div class="mt-1"><p class="pt-2 pl-1 pb-1 flat_address"><i class="fas fa-map-marker-alt mr-1 text-danger"></i>' + value['_source']['address'] + '</p></div></div>';
                        });

                        $(".main_area_display1").html(htmlStr);
                        $(".loader").addClass('d-none');
                    } else {
                        $(".main_area_display1").html("No Data Found!!!");
                        $(".loader").addClass('d-none');
                    }
                },
                failure: function() {
                    console.log('Error');
                }
            });

        } else {
            firstEnter = 1;
            // $('.searchresult').next('li').addClass('selected');

            if (e.keyCode == 40) {
                suggestStart++;
                if (suggestStart > suggestLength) {
                    suggestStart = 1;
                }
                $('#searchsuggestion li').removeClass('selected');
                $('#searchsuggestion li').eq(suggestStart - 1).addClass('selected');
                $('.prop_name').val($('#searchsuggestion li').eq(suggestStart - 1).text());
                $('.prop_name').attr('data-id', $('#searchsuggestion li').eq(suggestStart - 1).attr('data-id'));
                $('.prop_name').attr('data-type', $('#searchsuggestion li').eq(suggestStart - 1).attr('data-type'));
            }

            if (e.keyCode == 13) {
                /*var dataId = $('.prop_name').attr('data-id');
                var dataType = $('.prop_name').attr('data-type');

                if (dataId != 0 && dataType != 'oes' && dataType != 'oem') {
                    alert("You Pressed Enter-- Data Id = " + dataId + " & Data Type = " + dataType);
                }

                if (dataType == 'oem' || dataType == 'oes') {
                    var url = basePath + '/view/' + dataType + '/' + dataId;
                    window.location.href = url;
                }*/
                let queryString = $('.prop_name').val();
                $('.name_hide').val(queryString);
                basePath = basePath;

                $(".main_area_display1").html("");
                $(".loader").removeClass('d-none');

                $.ajax({
                    type: 'GET',
                    url: basePath + '/getSearchData?q=' + queryString,
                    success: function(result) {
                        var resultData = JSON.parse(result);
                        var htmlStr = '';
                        $("#searchsuggestion").css("display", "none");

                        if (resultData.length > 0) {
                            $.each(resultData, function(key, value) {
                                htmlStr += '<div class="main_area_display shadow card pl-4 pr-4"><div class="pt-3 pb-3"><i class="far fa-building"></i><span class="pl-1 flat_name text-info">' + value['_source']['name'] + '</span></div><div class="row"><div class="col-md-4"><i class="fas fa-tags"></i><span class="pl-1 price_flat">' + value['_source']['price'] + '</span></div><div class="col-md-4"><i class="fa fa-bed" aria-hidden="true"></i><span class="bhk_flat">' + value['_source']['configuration'].join(', ') + '</span></div><div class="col-md-4"><span class="area_flat"><i class="fa fa-cube mr-1" aria-hidden="true"></i>' + value['_source']['carpet_area'].join(', ') + ' sq. ft.</span></div></div><div class="mt-1"><p class="pt-2 pl-1 pb-1 flat_address"><i class="fas fa-map-marker-alt mr-1 text-danger"></i>' + value['_source']['address'] + '</p></div></div>';
                            });

                            $(".main_area_display1").html(htmlStr);
                            $(".loader").addClass('d-none');
                        } else {
                            $(".main_area_display1").html("No Data Found!!!");
                            $(".loader").addClass('d-none');
                        }
                    },
                    failure: function() {
                        console.log('Error');
                    }
                });

            }

            if (e.keyCode == 38) {
                suggestStart--;
                if (suggestStart == 0) { suggestStart = suggestLength; }
                $('#searchsuggestion li').removeClass('selected');
                $('#searchsuggestion li').eq(suggestStart - 1).addClass('selected');
                $('.prop_name').val($('#searchsuggestion li').eq(suggestStart - 1).text());
                $('.prop_name').attr('data-id', $('#searchsuggestion li').eq(suggestStart - 1).attr('data-id'));
                $('.prop_name').attr('data-type', $('#searchsuggestion li').eq(suggestStart - 1).attr('data-type'));
            }
        }
    });

    $(document).on('click', '.prop_search', function() {
        let queryString = $('.prop_name').val();
        $('.name_hide').val(queryString);
        basePath = basePath;

        $(".main_area_display1").html("");
        $(".loader").removeClass('d-none');

        $.ajax({
            type: 'GET',
            url: basePath + '/getSearchData?q=' + queryString,
            success: function(result) {
                var resultData = JSON.parse(result);
                var htmlStr = '';

                $("#searchsuggestion").css("display", "none");

                if (resultData.length > 0) {
                    $.each(resultData, function(key, value) {
                        htmlStr += '<div class="main_area_display shadow card pl-4 pr-4"><div class="pt-3 pb-3"><i class="far fa-building"></i><span class="pl-1 flat_name text-info">' + value['_source']['name'] + '</span></div><div class="row"><div class="col-md-4"><i class="fas fa-tags"></i><span class="pl-1 price_flat">' + value['_source']['price'] + '</span></div><div class="col-md-4"><i class="fa fa-bed" aria-hidden="true"></i><span class="bhk_flat">' + value['_source']['configuration'].join(', ') + '</span></div><div class="col-md-4"><span class="area_flat"><i class="fa fa-cube mr-1" aria-hidden="true"></i>' + value['_source']['carpet_area'].join(', ') + ' sq. ft.</span></div></div><div class="mt-1"><p class="pt-2 pl-1 pb-1 flat_address"><i class="fas fa-map-marker-alt mr-1 text-danger"></i>' + value['_source']['address'] + '</p></div></div>';
                    });

                    $(".main_area_display1").html(htmlStr);
                    $(".loader").addClass('d-none');
                } else {
                    $(".main_area_display1").html("No Data Found!!!");
                    $(".loader").addClass('d-none');
                }
            },
            failure: function() {
                console.log('Error');
            }
        });
    })

    $(document).on('click', '.filter_bhk', function() {
        let queryString = $('.prop_name').val();
        let filter = $(this).text();

        queryString = queryString + "&bhk=" + filter;

        $('.name_hide').val(queryString);
        basePath = basePath;

        $(".main_area_display1").html("");
        $(".loader").removeClass('d-none');

        $.ajax({
            type: 'GET',
            url: basePath + '/getSearchData?q=' + queryString,
            success: function(result) {
                var resultData = JSON.parse(result);
                var htmlStr = '';
                $("#searchsuggestion").css("display", "none");

                if (resultData.length > 0) {
                    $.each(resultData, function(key, value) {
                        htmlStr += '<div class="main_area_display shadow card pl-4 pr-4 pr-4"><div class="pt-3 pb-3"><i class="far fa-building"></i><span class="pl-1 flat_name text-info">' + value['_source']['name'] + '</span></div><div class="row"><div class="col-md-4"><i class="fas fa-tags"></i><span class="pl-1 price_flat">' + value['_source']['price'] + '</span></div><div class="col-md-4"><i class="fa fa-bed" aria-hidden="true"></i><span class="bhk_flat">' + value['_source']['configuration'].join(', ') + '</span></div><div class="col-md-4"><span class="area_flat"><i class="fa fa-cube mr-1" aria-hidden="true"></i>' + value['_source']['carpet_area'].join(', ') + ' sq. ft.</span></div></div><div class="mt-1"><p class="pt-2 pl-1 pb-1 flat_address"><i class="fas fa-map-marker-alt mr-1 text-danger"></i>' + value['_source']['address'] + '</p></div></div>';
                    });

                    $(".main_area_display1").html(htmlStr);
                    $(".loader").addClass('d-none');
                } else {
                    $(".main_area_display1").html("No Data Found!!!");
                    $(".loader").addClass('d-none');
                }
            },
            failure: function() {
                console.log('Error');
            }
        });
    })
});
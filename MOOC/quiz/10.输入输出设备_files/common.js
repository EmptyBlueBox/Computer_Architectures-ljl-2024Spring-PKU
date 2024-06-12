// 搜索的展示
function showMyCourseSearch() {
  event.stopPropagation()
  $('.header-search-input').show()
  $('.header-search-btn').hide()

  hideMyCourseNews()
  hideMyCourseHeaderUser()
}

// 搜索的隐藏
function hideMyCourseSearch() {
  const searchInput = $('.header-search-input')
  if (!searchInput.is(event.target) && searchInput.has(event.target).length === 0) {
    searchInput.hide()
    $('.header-search-btn').show()
  }
}

// 消息弹窗的展示
function showMyCourseNews() {
  event.stopPropagation()
  $('#home-news-card').slideToggle()

  hideMyCourseSearch()
  hideMyCourseHeaderUser()
}

// 消息弹窗的隐藏
function hideMyCourseNews() {
  var $target = $(event.target)
  // 只有在点击的不是消息 TAB 时才隐藏
  if (!$target.is('#home-news-card .head-list')) {
    $('#home-news-card').hide()
  }
}

// 个人中心的展示
function showMyCourseHeaderUser() {
  event.stopPropagation()
  $('#headerUserDropdown').slideToggle()

  hideMyCourseSearch()
  hideMyCourseNews()
}

// 个人中心的隐藏
function hideMyCourseHeaderUser() {
  const userDropdown = $('#headerUserDropdown')
  if (!userDropdown.is(event.target) && userDropdown.has(event.target).length === 0) {
    userDropdown.slideUp()
  }
}

// 个人中心的箭头切换
function toggleMyCourseHeaderUserArrow() {
  headArrowDown = $('#headerUser').find('.header-user-arrow-down')
  if (headArrowDown.length > 0) {
    headArrowDown.removeClass('header-user-arrow-down').addClass('header-user-arrow-up')
  } else {
    $('#headerUser').find('.header-user-arrow-up').removeClass('header-user-arrow-up').addClass('header-user-arrow-down')
  }
}

$(function () {
  /**头部-start */
  $('#public_header .other .search').click(function () {
    const bodyW = $('body').width()
    $(this).find('.search_click').toggle().siblings('.search_default').toggle()
    if (bodyW < 1320) {
      $('#public_horizontal_nav_main').hide()
    }
  })
  $('#public_header .other .search input').click(function (event) {
    event.stopPropagation()
  })
  $(document).on('click', function (event) {
    var $target = $(event.target)
    if (!$target.is('#public_header .other .search *')) {
      $('#public_header .other .search').find('.search_click').hide().siblings('.search_default').show()
      $('#public_horizontal_nav_main').show()
    }
  })
  $('#public_header .other .search input').keypress(function (even) {
    if (even.which == 13) {
      $(location).attr('href', 'course_list_search.html')
    }
  })

  // 搜索的点击事件
  $('.header-search-btn').on('click', function (event) {
    showMyCourseSearch()
  })
  // 个人中心的点击事件
  $('#headerUser').on('click', function (event) {
    showMyCourseHeaderUser()
    toggleMyCourseHeaderUserArrow()
  })
  // 页面空白处的点击事件
  $(document).on('click', function (event) {
    hideMyCourseHeaderUser()
    hideMyCourseNews()
    hideMyCourseSearch()
  })
  $('.header-search-input input').keypress(function(even) {
    if (even.which == 13) {
       var searchValue = $(this).val(); // 获取输入框的值

       if (searchValue.trim() === '') { // 检查输入框内容是否为空
          layer.msg('请输入搜索关键词');
       } else {
          location.href = '../web/course_list_search.php?keyword=' + searchValue;
       }
    }
  });
  /**头部-end */

  /**
   * 通用 message 提示 Start
   */

  $.message = {
    toast: function (options) {
      if (!options.message) {
        options.message = '操作成功'
      }
      if (!options.duration) {
        options.duration = 3000
      }
      if (!options.type) {
        options.type = 'success'
      }

      $.message._show(options)
    },

    _show: function (options, type) {
      var _html = ''
      _html += '<div class="message-toast">'
      if (options.type == 'success') {
        _html += `<img src="images/icon/icon_success_green.png" alt="" class="message-toast-img" />`
      }
      _html += `<span class="message-toast-text">${options.message}</span>`
      _html += '</div>'

      $('body').append(_html)

      setTimeout(() => {
        $.message._hide()
      }, options.duration)
    },
    _hide: function () {
      $('.message-toast').remove()
    },
  }
  /**
   * 通用 message 提示 End
   */
  /**
   * 侧边栏展开收起 js
   */
  $('.asidemenu-item-label').on('click', function () {
    // if ($(this).parent().hasClass('selected')) {
    //   // $(this).parent().removeClass('selected')
    //   $(this).next('.asidemenu-children').slideUp()
    // } else {
    //   $(this).parent().addClass('selected')
    //   $(this).next('.asidemenu-children').slideDown()
    // }
    if (!$(this).parent().hasClass('selected')) {
      $('.asidemenu-item-label').next('.asidemenu-children').slideUp().parent().removeClass('selected')
    }
    $(this).parent().toggleClass('selected')
    $(this).next('.asidemenu-children').slideToggle()
  })

  //打开抽屉 (编辑)
  $('.second-card .second-list .list-right .edit').on('click', function () {
    $('.drawer-left-wrap').fadeIn().find('.drawer').addClass('active')
    $('body').css({
      height: '100vh',
      overflow: 'hidden',
    })
  })
})

/* 消息弹窗 start*/
$(function () {
  // 消息的点击事件
  $('.header-right-item__link').on('click', function (event) {
    showMyCourseNews()
  })
  $('#home-news-card .head-list').on('click', function () {
    let index = $(this).index()
    $('#home-news-card .head-list').removeClass('active').eq(index).addClass('active')
    $('#home-news-card .news-main ul').hide().eq(index).show()
  })
})
/* 消息弹窗 end */

/**
 * 学生端作业课程 start
 */

//一级卡片展开收起
$('.first-retract').on('click', function () {
  handleToggleCard($(this), 1)
})
//二级卡片展开收起
$('.second-retract').on('click', function () {
  handleToggleCard($(this), 2)
})

$('.talk-card-content #answer-button').on('click', function (e) {
  e.stopPropagation()
  $(this).parent().parent().find('.second-publish').show()
});

$('body').on('click', '.talk-card-content #answer-button', function(e){
  // 事件处理代码
  e.stopPropagation();
  $(this).parent().parent().find('.second-publish').show()
});

//回复列表页回复展开收起
$('.second-publish .student-button').on('click', function (e) {
  e.stopPropagation()
  $(this).parent().parent().parent().hide()
});

//回复详情页回复展开收起
$('.detail-publish .student-button').on('click', function (e) {
  e.stopPropagation()
  $(this).parent().parent().hide()
  $('.card-handle').show()
});

$('body').on('click', '.second-publish .student-button', function(e){
  // 课堂讨论回复评论
  e.stopPropagation()
  $(this).parent().parent().parent().hide()
});

$('body').on('click', '.detail-publish .student-button', function(e){
  e.stopPropagation()
  $(this).parent().parent().hide()
  $('.card-handle').show()
});
//回复详情页发布回复显示
$('.handle-item-answer').on('click', function () {
  $('.detail-publish').show()
  $(this).parent().hide()
})
$('body').on('click', '.handle-item-answer', function(e){
  $('.detail-publish').show()
  $(this).parent().hide()
});

$('.note-like-icon').on('click', function (e) {
  e.stopPropagation()
  // $(this).toggleClass('active')
})
$('.note-collect-icon').on('click', function (e) {
  e.stopPropagation()
  // $(this).toggleClass('active')
})

//关注切换
$('.star-button').on('click', function () {
  $(this).addClass('hide')
  $('.star-button-no').removeClass('hide')
})
$('.star-button-no').on('click', function () {
  $(this).addClass('hide')
  $('.star-button').removeClass('hide')
})


//展开全部
// $('.slide-all').on('click', function (e) {
//   $(this).parent().find('.second-list').slideToggle()
//   $(this).find('.slide-toggle-text').text() == '展开' ? $(this).find('.slide-toggle-text').text('收起') : $(this).find('.slide-toggle-text').text('展开')
// });
$('body').on('click', '.slide-all', function(){
  // 事件处理代码
  $(this).parent().find('.second-list').slideToggle()
  $(this).find('.slide-toggle-text').text() == '展开' ? $(this).find('.slide-toggle-text').text('收起') : $(this).find('.slide-toggle-text').text('展开')
});

//课程列表收起展开
function handleToggleCard(target, level) {
  var text = $(target).find('span')
  var secondCard
  if (level == 1) {
    secondCard = $(target).parent().parent().find('.second-card')
  } else {
    secondCard = $(target).parent().parent().parent().find('.second-list')
  }
  if (text.text() == '收起') {
    secondCard.slideUp(200)
    text.text('展开')
    if (level == 1) {
      $(target).parent().removeClass('active')
    } else {
      $(target).parent().parent().removeClass('active')
    }
  } else {
    secondCard.slideDown(200)
    text.text('收起')
    if (level == 1) {
      $(target).parent().addClass('active')
    } else {
      $(target).parent().parent().addClass('active')
    }
  }
}
//批量操作
$('.student-download-button').on('click', function (e) {
  e.stopPropagation()
  $('.pagecont-handler div').show()
  $(this).hide()
  $('.second-list .second-checkbox').show()
})
$('.pagecont-handler .student-download-button-cancel').on('click', function (e) {
  e.stopPropagation()
  $('.pagecont-handler div').hide()
  $('.student-download-button').show()
  $(this).hide()
  $('.second-list .second-checkbox').hide()
})
//复选框监听
$('.course-list-wrap .second-checkbox').on('change', function () {
  var count = $('.course-list-wrap .second-checkbox:checked').length
  console.log(count)
  $('.batch-text .text').text(count)
})
//批量操作
$('.student-download-button-active').on('click', function () {
  var index = $(this).index()
  var checkboxData = []
  $('.course-list-wrap .second-checkbox:checked').each(function () {
    checkboxData.push($(this).val())
  })
  if (!checkboxData.length) {
    //请选择需要操作的内容
    return
  }
  if (index == 0) {
    //导出
  }
  if (index == 1) {
    //删除
  }
})

/**
 * 学生端作业课程 end
 */

/**
 * @description 学生端左侧边栏展开收起
 */
if ($('.has-dropdown').length) {
  let pageLink = location.href.split('/')[location.href.split('/').length - 1]
  $('.menu-item-dropdown a').each(function (index) {
    let href = $(this).attr('href')
    console.log(href.indexOf(pageLink))
    if (href.indexOf(pageLink) != -1) {
      $(this).parent().slideDown().prev().addClass('selected active')
    }
  })
}

$('.personal-center-aside .has-dropdown').on('click', function () {
  if (!$(this).hasClass('selected')) {
  }
  $(this).toggleClass('selected').siblings('.selected').removeClass('selected')
  $(this).next('.menu-item-dropdown').slideToggle().siblings('.menu-item-dropdown').slideUp()
})

/**
 * @description 学生端drawer控制
 */
$('.look-more').on('click', function (e) {
  e.preventDefault()
  handleDrawerToggle(true)
})
$('.note-handle-button .edit-button').on('click', function (event) {
  event.stopPropagation()
  handleDrawerToggle(true, 'edit')
})
$('.note-handle-button .delete-button').on('click', function (event) {
  event.stopPropagation()
})
$('.drawer-close').on('click', function () {
  handleDrawerToggle(false);
})
$('#drawer-handle-close').on('click', function () {
  handleDrawerToggle(false);
})

function handleDrawerToggle(visible, type) {
  if (visible) {
    $('.student-drawer').fadeIn().find('.drawer').addClass('active')
    $('body').css({
      height: '100vh',
      overflow: 'hidden',
    })
    if (type == 'edit') {
      $('#drawer-edit').click();
    }
  } else {
    $('.drawer-editor-wrap').hide();
    $('.student-notes-list').show();
    $('.student-drawer').fadeOut().find('.drawer').removeClass('active')
    $('body').css({
      height: 'auto',
      overflow: 'auto',
    })
  }
}


$('#drawer-edit').on('click', function () {
  $('.student-notes-list').hide();
  $('.drawer-editor-wrap').show();

});

/**
 * @description 回复详情收起展开
 */
$('.answer-toggle .answer-toggle-text').on('click', function () {
  $('.answer-content').slideToggle()
  $(this).parent().toggleClass('active')
  if ($(this).parent().hasClass('active')) {
    $(this).text('展开')
  } else {
    $(this).text('收起')
  }
});
$('body').on('click', '.answer-toggle .answer-toggle-text', function(e){
  $('.answer-content').slideToggle()
  $(this).parent().toggleClass('active')
  if ($(this).parent().hasClass('active')) {
    $(this).text('展开')
  } else {
    $(this).text('收起')
  }
});

/**
 * @description 讨论、综合讨论详情页内容收起
 */
$('.content-toggle-text').on('click', function () {
  $('.content-box').slideToggle()
  $(this).parent().toggleClass('active')
  if ($(this).parent().hasClass('active')) {
    $(this).text('展开')
  } else {
    $(this).text('收起')
  }
})

/**
 * @description 作业收起展开
 */
$('.topic-toggle').on('click', function () {
  $(this).find('.topic-toggle-button').text() == '展开' ? $(this).find('.topic-toggle-button').text('收起') : $(this).find('.topic-toggle-button').text('展开')
  $(this).closest('.topic-work-item').find('.notice-content').slideToggle()
  $(this).find('.icon').toggleClass('active')
})

$('.correct-toggle').on('click', function () {
  if ($(this).find('.correct-button').text() == '展开') {
    $(this).find('.correct-button').text('收起')
  } else {
    $(this).find('.correct-button').text('展开')
  }
  $(this).parent().find('.icon').toggleClass('active')
  $(this).closest('.topic-correct').find('.correct-content').slideToggle()
})
/**
 * @description 批改作业展开收起答案提示
 */
$('.question-toggle .toggle').on('click', function () {
  $(this).closest('.question-box').find('.card-answer-item').slideToggle()
})

/**
 * @description 得分加减
 */

$('.score-input .add-button').on('click', function () {
  let currentScore = $(this).parent().find('.score-input_number').val() || 0
  currentScore++
  $(this).parent().find('.score-input_number').val(currentScore)
})
$('.score-input .desc-button').on('click', function () {
  let currentScore = $(this).parent().find('.score-input_number').val() || 0
  if (currentScore >= 1) {
    currentScore--
    $(this).parent().find('.score-input_number').val(currentScore)
  }
})

/**
 * @description 课程内容视频页tabs切换
 */
$('.student-content-btm .tabs-item').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
  $('.student-content-btm .tabs-content-item').eq($(this).index()).show().siblings().hide()
})
$('.student-content-btm .item-tabs .item').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
  $('.item-content-box').hide()
  $('.item-content-box').eq($(this).index()).fadeIn()
})

$('.student-course-tab .course-tabs-item').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
  let index = $(this).index()
  $('.student-content-list .first-card').eq(index).removeClass('hide').siblings().addClass('hide')
})

/**
 * @description 帖子tab切换
 */
$('.student-post-tabs .tab-item').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
  $('.post-tabs-container .post-list').eq($(this).index()).removeClass('hide').siblings().addClass('hide')
})

/**
 * 作业考试tabs切换
 */
$('.student-video-work-tab .course-tabs-item').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active')
    let index = $(this).index()
    $('.work-list-wrap .first-card').eq(index).removeClass('hide').siblings().addClass('hide')
})


$('.to-top').on('click', function () {
  $('html,body').animate(
    {
      scrollTop: 0,
    },
    300
  )
})

/**
 * @description 课程内容tabs切换
 */
$('#student-content .drawer-tabs-item').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
  $('.drawer-notes-item').hide()
  $('.drawer-notes-item').eq($(this).index()).show()
})

/**
 * @description 输入限制
 */
$('.drawer-content-title .input-box .input-box-inner').on('input', function (e) {
  let length = e.target.value.length
  $(this)
    .parent()
    .find('.input-number')
    .text(length + '/100')
})

$('#question-title-input').on('input', function (e) {
  let length = e.target.value.length
  $('.input-length').text(length + '/100')
})
$('#dis-title-inlay').on('input', function (e) {
  let length = e.target.value.length
  $('.input-length').text(length + '/100')
})

/**
 * @description 下拉切换
 */
$('.select-item').on('click', function (e) {
  e.stopPropagation()
  e.preventDefault()
  $('.select-list').slideUp()
  $(this).find('.select-list').slideToggle()
})
$('.select-list .list-item').on('click', function (e) {
  e.stopPropagation()
  $(this).parent().parent().find('.select-label .select-name').text($(this).text())
  $(this).parent().slideToggle()
})
$(document).on('click', function () {
  $('.select-list').slideUp()
})

$('.handle-item .icon').on('click', function (e) {
  // e.stopPropagation()
  // $(this).parent().find('.icon').removeClass('hide')
  // $(this).addClass('hide')
})

//评阅详情页tab切换
$('.review-handle-tabs li').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
})

// 防抖
function _debounce(fn, time) {
  time = time || 2000
  let debItem = null
  return function () {
    const arg = arguments[0] //获取事件
    if (debItem) {
      clearTimeout(debItem)
    }
    debItem = setTimeout(function () {
      fn(arg) //事件传入函数
    }, time)
  }
}
// 节流
function _throttle(fn, time = 2000) {
  let thrItem = null
  return function () {
    const arg = arguments[0] //获取事件
    if (thrItem) {
      return
    }
    thrItem = setTimeout(function () {
      fn(arg) //事件传入函数
      thrItem = null
    }, time)
  }
}

/**
 * @description 初始化圆环进度条
 * @param {string} id 初始化dom的id
 * @param {number} value 初始化进度条的数值
 */
function initCircleProgress(id, value) {
  const myChart = echarts.init(document.getElementById(id))
  option = {
    title: [
      {
        text: '{a|' + value + '}{c|%}',
        x: 'center',
        y: '40%',
        textStyle: {
          rich: {
            a: {
              fontSize: 14,
              fontFamily: 'DIN Alternate',
              color: '#000',
              fontWeight: '600', //百分比数字
            },

            c: {
              fontSize: 14,
              color: '#000', //百分符号颜色
            },
          },
        },
      },
      {
        text: '正确率',
        x: 'center',
        y: '82%',
        textStyle: {
          fontSize: 14,
          color: '#333',
          fontWeight: 'normal',
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['50%', '65%'],
        silent: true,
        clockwise: true,
        startAngle: 90,
        z: 0,
        zlevel: 0,
        label: {
          normal: {
            position: 'center',
          },
        },
        data: [
          {
            value: value,
            name: '',
            itemStyle: {
              normal: {
                color: {
                  // 完成的圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color: '#52C41A', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#52C41A', // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          },
          {
            value: 100 - value,
            name: '',
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: '#F1F3F6',
              },
            },
          },
        ],
      },
    ],
  }

  myChart.setOption(option)
}

/**
 * @description 下拉
 */
$('.select-down').on('click', function (event) {
  event.stopPropagation()
  $(this).find('.select-down-list').slideToggle()
})
$('.select-down .select-down-option').on('click', function (event) {
  event.stopPropagation()
  $(this).addClass('current').siblings().removeClass('current')
  $('.select-down .select-selected-text').text($(this).find('span').text())
  $('.select-down .select-down-input').val($(this).find('span').text())
  $('.select-down-list').slideUp()
})
$(document).on('click', function (event) {
  const userDropdown = $('.select-down-list')
  if (!userDropdown.is(event.target) && userDropdown.has(event.target).length === 0) {
    userDropdown.slideUp()
  }
})

function AJAX_POST(post_url, json_data, actiontoken, goto_url = ''){
  //处理连接符
  var joiner = '&';
  if(post_url.indexOf('?') == -1) {
    joiner = '?';
  }
  //actiontoken处理
  if(actiontoken == '' || actiontoken == null){
    $.ajax({async:false, type:'GET', url:'actiontoken_new.php', success:function(data){
        actiontoken_new = data;
      }
    });
  }else{
    actiontoken_new = actiontoken;
  }

  //处理中样式
  var load_index = layer.load(2, {shade: false});

  //提交数据
  $.ajax({
    type: 'POST',
    data: json_data,
    dataType: 'json',
    url: post_url + joiner + 'action_token=' + actiontoken_new,
    success: function(data){
      layer.close(load_index);
      var code = data.code;
      var msg  = data.msg;
      switch(code){
        case 1:
          if(data.file){
            window.open(data.file);// 文件下载
          }else{
        	  layer.msg(msg);
        	  setTimeout(function(){
                  if(goto_url == '' || goto_url == null){
                      parent.location.reload();
                  }else if(goto_url == 'norefresh'){
                      layer.msg(msg);
                  }else{
                      location.href = goto_url;
                  }
        	  }, 3000);
          }
          break;
        default:
          layer.alert(msg, {icon: 5}, function(index){
            layer.close(index);
          });
          break;
      }
    }
  });
}

function followComments(discussionid) {

  var json_data = {discussionid:discussionid};
  //actiontoken处理
  $.ajax({async:false, type:'GET', url:'actiontoken_new.php', success:function(data){
      actiontoken_new = data;
    }
  });

  //处理中样式
  var load_index = layer.load(2, {shade: false});

  //提交数据
  $.ajax({
    type: 'POST',
    data: json_data,
    dataType: 'json',
    url: 'discussion_do.php?act=follow_comments&action_token=' + actiontoken_new,
    success: function(data){
      layer.close(load_index);
      var code = data.code;
      var msg  = data.msg;
      switch(code){
        case 1:
          location.reload();
          break;
        default:
          layer.alert(msg, {icon: 5}, function(index){
            layer.close(index);
          });
          break;
      }
    }
  });
}

function unfollowComments(discussionid) {

  var json_data = {discussionid:discussionid};
  //actiontoken处理
  $.ajax({async:false, type:'GET', url:'actiontoken_new.php', success:function(data){
      actiontoken_new = data;
    }
  });

  //处理中样式
  var load_index = layer.load(2, {shade: false});

  //提交数据
  $.ajax({
    type: 'POST',
    data: json_data,
    dataType: 'json',
    url: 'discussion_do.php?act=unfollow_comments&action_token=' + actiontoken_new,
    success: function(data){
      layer.close(load_index);
      var code = data.code;
      var msg  = data.msg;
      switch(code){
        case 1:
          location.reload();
          break;
        default:
          layer.alert(msg, {icon: 5}, function(index){
            layer.close(index);
          });
          break;
      }
    }
  });
}

function followUser(followeduserid) {

  var json_data = {followeduserid:followeduserid};
  //actiontoken处理
  $.ajax({async:false, type:'GET', url:'actiontoken_new.php', success:function(data){
      actiontoken_new = data;
    }
  });

  //处理中样式
  var load_index = layer.load(2, {shade: false});

  //提交数据
  $.ajax({
    type: 'POST',
    data: json_data,
    dataType: 'json',
    url: 'term_student_do.php?act=follow_user&action_token=' + actiontoken_new,
    success: function(data){
      layer.close(load_index);
      var code = data.code;
      var msg  = data.msg;
      switch(code){
        case 1:
          location.reload();
          break;
        default:
          layer.alert(msg, {icon: 5}, function(index){
            layer.close(index);
          });
          break;
      }
    }
  });
}

function unfollowUser(followeduserid) {

  var json_data = {followeduserid:followeduserid};
  //actiontoken处理
  $.ajax({async:false, type:'GET', url:'actiontoken_new.php', success:function(data){
      actiontoken_new = data;
    }
  });

  //处理中样式
  var load_index = layer.load(2, {shade: false});

  //提交数据
  $.ajax({
    type: 'POST',
    data: json_data,
    dataType: 'json',
    url: 'term_student_do.php?act=unfollow_user&action_token=' + actiontoken_new,
    success: function(data){
      layer.close(load_index);
      var code = data.code;
      var msg  = data.msg;
      switch(code){
        case 1:
          location.reload();
          break;
        default:
          layer.alert(msg, {icon: 5}, function(index){
            layer.close(index);
          });
          break;
      }
    }
  });
}

//已读所有消息
function readAllMsg(){
	layer.open({
		type: 1,
		area: '372px',
		move: false,
		shadeClose: true, //点击遮罩关闭
		content: '<div class="del-confirm-content"><div class="title">确认将所有未读消息标记为已读？</div></div>',
		btn: ['取消', '确定'],
		btn2: function(index, layero){
	        // 提交数据
	        var json_data = {};
	        AJAX_POST('message_do.php?act=readall', json_data);
		}
	});
}

//清空所有消息
function clearAllMsg(){
	layer.open({
		type: 1,
		area: '372px',
		move: false,
		shadeClose: true, //点击遮罩关闭
		content: '<div class="del-confirm-content"><div class="title">确认清空所有消息吗？</div></div>',
		btn: ['取消', '确定'],
		btn2: function(index, layero){
	        // 提交数据
	        var json_data = {};
	        AJAX_POST('message_do.php?act=clearall', json_data);
		}
	});
}

// 退出课程
function quitCourse(courseid, termid) {
    layer.open({
        type: 1,
        area: '372px',
        move: false,
        shadeClose: true, //点击遮罩关闭
        content: '<div class="del-confirm-content"><div class="title">确定退出当前课程吗？<br/>退出后，个人中心的课程列表中将不再展示该课程。</div></div>',
        btn: ['取消', '确定'],
        btn2: function(index, layero){
            // 提交数据
            var json_data = {
                courseid : courseid,
                termid   : termid,
            };
            var goto_url = 'my_course_list.php';
            AJAX_POST('term_student_do.php?act=quitCourse', json_data, '', goto_url);
        }
    });
}

/* 分享二维码 start */
$(document).on('click', function (event) {
  if($('.share-qrcode-wrap').length){
    $('.share-qrcode-wrap').remove();
  }
})
$('.task-title-share').on('click', function (e) {
  e.stopPropagation()
  if ($('.share-qrcode-wrap').length) {
    $('.share-qrcode-wrap').remove();
  } else {

    let dom = `<div class="share-qrcode-wrap">
                <p class="title" >分享到微信朋友圈</p>
                <div class="qrcode" id="qrcode"></div>
                <p class="txt">使用微信【扫一扫】分享至朋友圈</p>
              </div>`
    $(this).css({position: 'relative'}).append(dom);


    //生成二维码
    let para = GetUrlPara();
    let domain = document.location.protocol + '//' + document.location.host;
    var qrcode = new QRCode("qrcode", {
      text: domain + '/web/course_detail.php?' + para,
      width: 160,
      height: 160,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.L
    });
  }

})

//获取当前URL get参数
function GetUrlPara() {
  var url = document.location.toString();
  var arrUrl = url.split("?");

  var para = arrUrl[1];
  return para;
}


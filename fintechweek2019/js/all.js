'use strict';

// video overlay

var overlay = document.getElementById('overlay');
var video = document.getElementById('v');
video.addEventListener('progress', function () {
    var show = video.currentTime >= 5 && video.currentTime < 10;
    overlay.style.visibility = show ? 'visible' : 'visible';
}, false);

// form


$("body").keydown(function (e) {
    setTimeout(function () {
        if (e.which == 32) {
            $("#clone").append("&nbsp;");
        }
        $("#clone").text($('input').val());
        $('input').width($("#clone").width() + 40);
    }, 100);
});
'use strict';

$(document).ready(function () {
    var modal = $('.modal');
    var scrollControls = $('#goUp, #goDown');
    var modalClose = $('.close-btn, .delete-btn');
    var area = $('#area');
    var form1 = $("#form1");
    var submitBtn = $("#submitBtn");
    var isSubscriptionEmail = $("#isSubscriptionEmail");
    var openAccount = $("#openAccount");
    var noNeed = $("#noNeed");
    var products = $("#API, #eFX, #EDM, #eTreasury");
    var code = $('#code');
    var msgDesc = $("#msgDesc");
    var msgContact = $("#msgContact");
    var scrollControls = $('a[data-link="prodlinks"], div[data-link="prodlinks"]');
    var $root = $('html, body');
    var inputs = $("input:text");

    /* scroll */
    scrollControls.click(function () {
        var tag = $.attr(this, 'href');
        $root.animate({
            scrollTop: tag == "#pageHead" ? 0 : $(tag).offset().top - 80
        }, 850);
        if (this.tagName == "A" && $(".navbar-collapse.navbar-right.collapse.in").length > 0) {
            $('#myNavbarBtn').click();
        }
        return false;
    });

    //$root.animate({scrollTop:0});
    $('html, body').animate({
        scrollTop: 0
    }, 0);

    /* modal */
    modalClose.click(function () {
        modal.hide();
    });

    /* area code*/
    area.change(function (e) {
        var codeOpt = $(this).find(':selected').data('code');
        code.val(codeOpt);
    });

    /* noNeed check */
    noNeed.change(function () {
        if (!$(this).is(":checked")) {
            products.prop('checked', true);
        }
    });

    products.change(function () {
        if (!$(this).is(":checked") && !noNeed.is(":checked")) {
            noNeed.prop('checked', true);
        };
    });

    /* ie9 place holder*/
    inputs.placeholder();

    submitBtn.click(function (e) {
        e.preventDefault();

        var crm = new CRM();
        var formData = {};
        $.map(form1.serializeArray(), function (n, i) {
            formData[n['name']] = n['value'];
        });
        formData.isSubscriptionEmail = !isSubscriptionEmail.is(":checked");
        formData.openAccount = openAccount.val();
        formData.campaign = 10;

        formData.products = [];
        for (var i = 0; i < products.length; i++) {
            if (!products[i].checked) formData.products.push(products[i].id);
        }

        if ($.trim(formData.name) == "") {
            alert("您的姓名，尚未填寫！");
            return;
        }

        if ($.trim(formData.phone) == "") {
            alert("您的電話，尚未填寫！");
            return;
        } else if (!crm.isPhoneNo(formData.phone)) {
            alert("您的電話不正確！");
            return;
        }

        if ($.trim(formData.email) == "") {
            alert("您的電郵，尚未填寫！");
            return;
        } else if (!crm.isEmail(formData.email)) {
            alert("您的電郵格式不正確！");
            return;
        }

        if (formData.products.length == 0 && noNeed.is(":checked")) {
            alert("您想體驗的功能，尚未填寫！");
            return;
        }

        if ($.trim(formData.openAccount) == "") {
            alert("您是否預約開戶，尚未填寫！");
            return;
        }

        var crmData = {
            Subject: 10,
            Campaign: 10,
            PromotionArea: 6,
            LanguageSelect: 2,
            CRMType: 2,
            IsSubscriptionEmail: formData.isSubscriptionEmail ? 1 : 0,
            OpenAccount: Number(formData.openAccount),
            Email: formData.email,
            Name: formData.name,
            Phone: formData.code + formData.phone,
            Source: 3,
            Remark1: formData.products.join(),
            Medium: decodeURIComponent(crm.getUrlParam()["Medium"])
        };

        crm.submit(crmData, function (crmResult) {
            if (crmResult.code !== "0") {
                alert(crmResult.message);
                return;
            }

            if (formData.products.length == 0) {
                showModal(formData);
                return;
            }

            productRegister(formData, function (prodResult) {
                if (prodResult.code === "0") {
                    showModal(formData);
                } else {
                    alert(prodResult.message);
                }
            });
        });
    });

    function showModal(formData) {
        msgContact.text(formData.openAccount == "1" ? "我們的客戶經理會在第一時間與您聯繫。" : "");

        if (formData.products.indexOf('eFX') != -1 || formData.products.indexOf('EDM') != -1 || formData.products.indexOf('eTreasury') != -1) {
            msgDesc.text((formData.openAccount == "1" ? "此外，" : "") + "您將通過郵件收到模擬賬戶登錄信息及系統使用說明。若遇到任何問題，也可隨時與我們聯繫。");
        }
        modal.fadeIn();
    }

    function productRegister(data, callback) {
        var productAPI = "https://testapi.kvbgc.com/api/GCCRM/ProductExperience?" + "Name={{name}}&" + "Area={{area}}&" + "Phone={{code}}{{phone}}&" + "Email={{email}}&" + "Campaign={{campaign}}&" + "ProductList={{products}}&" + "callback=?";

        var url = Mustache.render(productAPI, data);
        $.getJSON(url, function (json) {
            callback(json);
        });
    }
});
//# sourceMappingURL=all.js.map

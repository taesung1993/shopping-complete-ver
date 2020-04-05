function listen() {
  $.ajax({
    type: "GET",
    url: "/order",
    data: {},
    success: function (response) {
      if (response["result"] === "success") {
        //alert("리뷰를 받아왔습니다.");
        orderList = response["orders"];
        if (orderList.length > 0) {
          orderList.forEach(function (item) {
            $("#table-body").append(
              $("<tr/>")
                .append($("<td/>").text(item["name"]))
                .append($("<td/>").text(item["object_num"]))
                .append($("<td/>").text(item["address"]))
                .append($("<td/>").text(item["phone"]))
            );
          });
        } else {
          $("#table-body").append(
            $("<tr/>").append(
              $("<td/>").attr("colspan", 4).text("현재 주문자가 없습니다.")
            )
          );
        }
      } else {
        alert("리뷰를 받아오지 못했습니다.");
      }
    },
  });
}

function orderInfoCtrl() {
  $("#orderBtn").click(function () {
    var inputValue = {
      name: $("#myName").val(),
      objectNum: $("#inputGroupSelect option:selected").val(),
      address: $("#myAddress").val(),
      phone: $("#myPhoneNum").val(),
      phoneNumForm: /^01([0|1|3|6|7|9])-([0-9]{3,4})-([0-9]{4})$/,
    };
    $("#orderBtn").removeAttr("data-target", "#exampleModal");
    if (inputValue.name === "") {
      alert("이름을 입력해주세요.");
      $("#myName").focus();
    } else if (inputValue.objectNum === "") {
      alert("상품 수량을 선택해주세요.");
      $("#inputGroupSelect").focus();
    } else if (inputValue.address === "") {
      alert("주소를 입력해주세요!");
      $("#myAddress").focus();
    } else if (inputValue.phone === "") {
      alert("핸드폰 번호를 입력해주세요!");
      $("#myPhoneNum").focus();
    } else if (inputValue.phoneNumForm.test(inputValue.phone) === false) {
      alert(
        "핸드폰 번호에 - 문자를 포함시켜 제대로 입력해주세요!\n (예시: 010-xxxx-xxxx[13자리])"
      );
      $("#myPhoneNum").focus();
    } else {
      $("#orderBtn").attr("data-target", "#exampleModal");
    }
  });
}

$(document).ready(function () {
  listen();
  orderInfoCtrl();
});

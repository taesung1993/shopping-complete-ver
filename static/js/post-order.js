/* 이 프로그램 역할은 JQuery를 이용하여 modal 창의 버튼을 제어하는
것 입니다. 모달 창의 버튼 '예'를 클릭하면 새로고침하도록 설정하였습니다.*/
function sendData() {
  $.ajax({
    type: "POST",
    url: "/order",
    data: {
      name: $("#myName").val(),
      objectNum: $("#inputGroupSelect option:selected").val(),
      address: $("#myAddress").val(),
      phone: $("#myPhoneNum").val(),
    },
    success: function (response) {
      if (response["result"] === "success") {
        alert(response["msg"]);
      }
      location.reload();
    },
  });
}

$("#receiveOrder").click(function (event) {
  sendData();
});

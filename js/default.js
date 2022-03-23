// 获取查询参数
function getSearchParameter(str) {
  let search = location.search.substr(1).split("&");
  for (let i of search) {
    i = i.split("=");
    if (i[0] == str) return decodeURI(i[1]).replace(/\+/g, " ");
  }
  return "";
}

(function () {
  // 返回顶部
  if ($(".back-to-top").length > 0) {
    let element = $(".back-to-top")[0];
    element.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }
  // show-toggle事件
  if ($(".show-toggle").length > 0) {
    let element = $(".show-toggle");
    for (let i of element) {
      i.addEventListener("click", () => {
        let toggle = $(i.getAttribute("data-show-toggle"));
        if (toggle.is(".d-none")) {
          toggle.removeClass("d-none");
        } else {
          toggle.addClass("d-none");
        }
      });
    }
  }

  // 更好的sticky
  function sticky() {
    let element = $(".sticky");
    for (let i of element) {
      let childStyle = getComputedStyle(i.firstElementChild);
      i.style.minHeight = i.style.maxHeight =
        parseInt(childStyle.height) +
        parseInt(childStyle.marginTop) +
        parseInt(childStyle.marginBottom) +
        "px";
    }
  }
  sticky();
  window.addEventListener("resize", () => sticky());
})();

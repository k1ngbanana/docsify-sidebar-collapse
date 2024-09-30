(function () {
  'use strict';

  (function () {

    // 插入样式的函数
    function insertStyles(css, options = {}) {
      if (typeof document === "undefined") return;
      const head = document.head || document.getElementsByTagName("head")[0];
      const styleElement = document.createElement("style");
      // styleElement.type = "text/css";

      if (options.insertAt === "top" && head.firstChild) {
        head.insertBefore(styleElement, head.firstChild);
      } else {
        head.appendChild(styleElement);
      }
      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = css;
      } else {
        styleElement.appendChild(document.createTextNode(css));
      }
    }

    // 定义需要插入的CSS样式
    const sidebarStyles = `
.sidebar-nav > ul > li { overflow: hidden; margin: 6px 0; }
.sidebar-nav > ul > li > p { cursor: pointer; display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
.sidebar-nav > ul > li > p > .count { color: #aaa; font-weight: 400; margin-right: 10px; }
.ul-hide { height: 0; overflow: hidden; transition: all 0.5s; }
`;

    // 插入样式
    insertStyles(sidebarStyles);

    // Docsify插件的主函数
    function docsifySidebarPlugin(hook, vm) {
      // 初始化
      hook.init(function () {
        vm.record = [];
      });

      // 每次页面内容加载完毕时调用
      hook.doneEach(function () {
        const sidebarItems = document.querySelectorAll(".sidebar-nav > ul > li > p");
        sidebarItems.forEach(function (item, index) {
          const subList = item.nextSibling;
          const subItems = subList.childNodes;

          // 更新项目信息，包括子项目数量
          item.innerHTML = `<div>${item.innerText}</div><div class="count">${subItems.length}</div>`;

          // 添加点击事件，展开/收起子列表
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleSublist(subList, vm, index);
          });

          // 初始化子列表高度
          Array.prototype.reduce.call(subItems, function (height, subItem) {
            return height + subItem.offsetHeight + 6;
          }, 0);
          subList.classList.add("ul-hide");

          // if (vm.record[index]) {
          //   subList.style.height = `${sublistHeight}px`;
          // }
        });
      });
    }

    // 切换子列表显示/隐藏状态
    function toggleSublist(subList, vm, index) {
      if (subList.offsetHeight) {
        vm.record[index] = false;
        subList.style.height = "0px";
      } else {
        const sublistHeight = Array.prototype.reduce.call(subList.childNodes, function (height, subItem) {
          return height + subItem.offsetHeight + 6;
        }, 0);
        vm.record[index] = true;
        subList.style.height = `${sublistHeight}px`;
      }
    }

    // 注册Docsify插件
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [].concat([docsifySidebarPlugin], window.$docsify.plugins || []);
  })();

})();

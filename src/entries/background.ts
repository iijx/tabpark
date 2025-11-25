import axios from "axios";
chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.query({url: "chrome://newtab/"}, function(tabs: chrome.tabs.Tab[]) {
    console.log("tabs", tabs)
    // if (tabs.length > 0) {
    //   chrome.tabs.update((tabs[0] as any).id, {url: "index.html"});
    // }
  });

  // (chrome as any).settings.set({value: {"homepage": "index.html"}});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getCurrentTabUrl') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      sendResponse({...activeTab});
    });
    return true; // 这允许 sendResponse 在异步处理后调用
  }

  // if (request.action === 'getSerachSuggestion') {
  //   // const script = document.createElement('script');
  //   axios.get(`https://www.baidu.com/sugrec?&prod=pc&wd=123${encodeURIComponent(request.keyword)}`).then((res) => {
  //     sendResponse(res);
  //   })
  //   // script.src = `http://suggestion.baidu.com/su?wd=${request.keyword}&cb=baidu.sug`;
  //   // document.body.appendChild(script);
  // }
});


export default {

}
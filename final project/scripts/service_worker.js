let urlInfo;
(async function initUrlinfo() {
        let [tab] = await chrome.tabs.query({active:true,currentWindow:true});
    
        if (tab?.url){
            try{
                let url = new URL(tab.url);
                urlInfo = url.hostname;
            }catch{
            
            }
        }
    })();
    
    
    let cookiesList = chrome.cookies.getAll({domain: urlInfo.hostname});
    let cookieNum = cookiesList.length;
    console.log(cookieNum);
    //get all <p> tags
    
    let paragraphList = document.querySelectorAll('p');
export default function CnzzInit() {
    if (document.getElementById("cnzz")) return;
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.id = "cnzz"
    el.charset = 'utf-8';
    el.async = true;
    el.src = 'https://s9.cnzz.com/z_stat.php?id=1280649525&web_id=1280649525';
    document.body.appendChild(el);
}

/**
 * 博客 - 分类 - 标题 - id
 * @param page 
 * @param action 
 * @param label 
 * @param value 
 */
export function CnzzTrackEvent(page: string, action: string, label = "", value = 0) {
    console.log(page, action, label, value)
    var _czc = (window as any)._czc || [];
    _czc.push(['_trackEvent', page, action, label, value])
}
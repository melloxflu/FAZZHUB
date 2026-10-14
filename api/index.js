export default async function handler(req, res) {
    const ua = (req.headers["user-agent"] || "").toLowerCase();
    const isBrowser = /mozilla|chrome|firefox|safari|edge/i.test(ua)
        && !/roblox|synapse|krnl|delta|script-ware|fluxus|codex|wave/i.test(ua);

    // ═══ BROWSER: Landing page ═══
    if (isBrowser) {
        const HOST = req.headers.host;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(200).send(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SCRIPT HUB</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;font-family:Arial,sans-serif;background:#05050a;color:#fff;overflow:hidden}
body::before{content:'';position:fixed;inset:0;background:radial-gradient(circle at 20% 20%,rgba(0,255,200,.12),transparent 50%),radial-gradient(circle at 80% 80%,rgba(177,74,255,.12),transparent 50%);z-index:-1}
.center{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px}
h1{font-size:clamp(2.5rem,12vw,7rem);font-weight:900;letter-spacing:-5px;background:linear-gradient(135deg,#00ffcc,#00aaff,#b14aff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;filter:drop-shadow(0 0 40px rgba(0,255,200,.4))}
.sub{color:#6a6a7a;font-size:.85rem;letter-spacing:4px;text-transform:uppercase;margin-bottom:40px}
.btn{padding:18px 52px;background:linear-gradient(135deg,#00ffcc,#00aaff);color:#05050a;border:none;border-radius:14px;font-size:1rem;font-weight:800;cursor:pointer;letter-spacing:1px;box-shadow:0 0 40px rgba(0,255,200,.4);transition:.3s}
.btn:hover{transform:translateY(-2px);box-shadow:0 0 60px rgba(0,255,200,.6)}
.steps{margin-top:40px;color:#666;font-size:.8rem;line-height:1.9;max-width:380px}
.steps b{color:#00ffcc}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:linear-gradient(135deg,#00ffcc,#00aaff);color:#05050a;padding:14px 28px;border-radius:10px;font-weight:800;font-size:.85rem;transition:.4s;box-shadow:0 0 40px rgba(0,255,200,.6)}
.toast.show{transform:translateX(-50%) translateY(0)}
</style></head><body>
<div class="center">
<h1>SCRIPT HUB</h1>
<div class="sub">Premium Script</div>
<button class="btn" onclick="copyLoader()">🚀 COPY LOADER</button>
<div class="steps">
<b>1.</b> Klik COPY LOADER<br>
<b>2.</b> Buka executor (Delta/Krnl/Codex)<br>
<b>3.</b> Paste → Execute<br>
<b>4.</b> UI muncul
</div>
</div>
<div class="toast" id="toast">✅ Loader dicopy!</div>
<script>
function copyLoader(){
var u='https://${HOST}';
var l='loadstring(game:HttpGet("'+u+'"))()';
navigator.clipboard.writeText(l).then(showToast).catch(function(){
var t=document.createElement('textarea');t.value=l;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);showToast();
});
}
function showToast(){var t=document.getElementById('toast');t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2500);}
</script></body></html>`);
    }

    // ═══ EXECUTOR: Return script Lua ═══
    const SCRIPT_URL = "https://raw.githubusercontent.com/melloxflu/FAZZHUB/main/script.lua";
    try {
        const r = await fetch(SCRIPT_URL, { cf: { cacheTtl: 60 } });
        if (!r.ok) throw new Error("Script not found");
        const body = await r.text();
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.status(200).send(body);
    } catch (e) {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.status(200).send(`warn("[Script Hub] Fetch failed: ${e.message}")`);
    }
}

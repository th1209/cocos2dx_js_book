//リソースファイルはこれ。

//リソース用の画像は、ここに書いて...
var res = {
    HelloWorld_png : "res/HelloWorld.png",
    target_png : "res/target.png"
};

//グローバル変数g_resourcesに全部pushしてる(笑)
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

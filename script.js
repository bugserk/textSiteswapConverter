const facade = new jmotion.Facade("#animation-placeholder");

const textBox = document.getElementById("data-input");
const warning = document.getElementById("input-warning");
const warningMessage = document.getElementById("warning-message");


textBox.addEventListener("input", () => {
    const inputData = textBox.value;

    if(inputData === ""){
        warning.classList.remove("show");
        return;
    }

    if(!isAlphanumeric(inputData)){
        warningMessage.textContent = "利用できる文字は半角英数のみです";
        warning.classList.add("show");
        return;
    }

    if(inputData.length > 15){
        warningMessage.textContent = "16字以上は利用できません";
        warning.classList.add("show");
        return;
    }

    warning.classList.remove("show");
});

//サーチ
document.getElementById("search-button").addEventListener("click", () => {
    //テキストボックスの取得
    const inputData = textBox.value;

    if(!isAlphanumeric(inputData)){
        return;
    }

    if(inputData.length > 15){
        return;
    }

    //検索
    const result = getJugglableBirthdaySiteswap(inputData);

    //データ抽出
    const patterns = result.patterns;
    let patternCount, asyncCount, syncCount;
    patternCount = result.patternCount;
    asyncCount = result.asyncCount;
    syncCount = result.syncCount;

    document.getElementById("result-date").innerHTML = `『${inputData}』のサイトスワップ`;
    document.getElementById("result-count").innerHTML = `
        <strong>${patternCount}</strong> 個ヒット<br>
        Async: <strong>${asyncCount}</strong> 個ヒット<br>
        Sync : <strong>${syncCount}</strong> 個ヒット
    `;
    
    facade.startJuggling("0");

    // 古いカードを削除
    const patternGrid = document.getElementById("pattern-grid");
    patternGrid.innerHTML = "";

    // 新しいカードを作成
    patterns.forEach(pattern => {
        const card = document.createElement("div");
        card.className = "pattern-card";

        card.innerHTML = `
            <div class="pattern">${pattern.siteswapStr}</div>
            <div class="pattern-description">
                ${pattern.noAlpStr}<br>${pattern.balls} balls
            </div>
            <div class="play-icon">▶</div>
        `;

        // カードクリック時
        card.addEventListener("click", () => {

            // 選択状態にする
            document.querySelectorAll(".pattern-card").forEach(c => {
                c.classList.remove("selected");
            });

            card.classList.add("selected");

            // サイトスワップをアニメーションに渡す
            facade.startJuggling(pattern.siteswapStr);

            document.getElementById("animation-placeholder").scrollIntoView();
        });

        patternGrid.appendChild(card);
    });

    document.getElementById("result").scrollIntoView();
});


//説明欄の開閉
document
.querySelectorAll(".info-button")
.forEach(button => {
    button.addEventListener("click", () => {
        const item =
            button.parentElement;

        item.classList.toggle("open");
    });
});

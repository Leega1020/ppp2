document.addEventListener("DOMContentLoaded", function () {  

    
    function initialize() {
        let teamResult = localStorage.getItem("teamresult");
        if (teamResult!=="undefined"&&teamResult!==null) {
            tsvalue = teamResult;
            console.log(tsvalue);
            getTeamId(tsvalue);
            fetchTeam();
            
        } else {
            tsvalue = "新北國王";
            getTeamId(tsvalue);
            fetchTeam();
            console.log("ok");
        }
    }

    initialize();

    teamSelect = document.querySelector("#teamSelect");
    teamSelect.addEventListener("change", () => {
        
        tsvalue = teamSelect.value;
        getTeamId(tsvalue);
        fetchTeam();
        
    });

    function getTeamId(tsvalue) {
        if (tsvalue === "新北國王") {
            return 1;
        } else if (tsvalue === "臺北富邦勇士") {
            return 2;
        } else if (tsvalue === "桃園領航猿") {
            return 3;
        } else if (tsvalue === "福爾摩沙台新夢想家") {
            return 4;
        } else if (tsvalue === "高雄17直播鋼鐵人") {
            return 5;
        } else if (tsvalue === "新竹街口攻城獅") {
            return 6;
        }
    }

    function fetchTeam() {
        fetch("/api/team", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // 計算總和的變數
                    let totalBackboards = 0;
                    let totalAssists = 0;
                    let totalBlock = 0;
                    let totalPMiss = 0;
                    let totalPFoul = 0;
                    let totalPaint = 0;
    
                    data.forEach(element => {
                        totalBackboards += element.backboards;
                        totalAssists += element.assists;
                        totalBlock += element.block;
                        totalPMiss += element.p_miss;
                        totalPFoul += element.p_foul;
                        totalPaint += element.paint;
                    });
    
                    // 計算平均值
                    const numberOfGames = data.length;
                    const averageData = {
                        backboards: (totalBackboards / numberOfGames).toFixed(2),
                        assists: (totalAssists / numberOfGames).toFixed(2),
                        block: (totalBlock / numberOfGames).toFixed(2),
                        p_miss: (totalPMiss / numberOfGames).toFixed(2),
                        p_foul: (totalPFoul / numberOfGames).toFixed(2),
                        paint: (totalPaint / numberOfGames).toFixed(2),
                    };
    
                    // 在這裡使用 averageData 進行你需要的操作
                    console.log(averageData);
                    finalData.push(averageData)
                    data.forEach((element) => {
                        if (element.id === getTeamId(tsvalue)) {
                            let pctvalue=document.querySelector(".pctvalue")
                            let tpic=document.querySelector("#tpic")
                            let t=document.querySelector("#t")
                            let id = element.id;
                            let team = element.team;

                            let point2 = parseFloat(element.point2.split("%")[0]);
                            let point3 = parseFloat(element.point3.split("%")[0]);
                            let foulShot = parseFloat(element.foulShot.split("%")[0]);
                            let backboards = element.backboards;
                            let assists = element.assists;
                            let block = element.block;
                            let p_miss = element.p_miss;
                            let p_foul = element.p_foul;
                            let paint = element.paint;
                            let win= parseInt(element.win);
                            let lose = parseInt(element.lose);

                            tpic.src=element.tpic
                            pctvalue.textContent=element.pct
                            t.textContent=element.teams
                            console.log(tpic)
                            drawChart2(point2)
                            drawChart3(point3)
                            drawChart4(foulShot)
                            winnlose(win,lose)
                            finalData.push(backboards,assists,block,p_miss,p_foul,paint)
                            drawCurve(team)
                           
                        }
                    });
                }
            });
    }

   let finalData=[]
   console.log(finalData)
        
function drawChart(scores){
   
    let pieChartContainer = d3.select("#tc1");

    let width = 90;
    let height = 90;
    let radius = Math.min(width, height) / 2;

    // 設置內外半徑，以創建環狀圓餅圖
    let innerRadius = radius - 20;

    // 創建 SVG 元素
    let svg = pieChartContainer.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // 設置顏色
    let color = d3.scaleOrdinal(["#009e96", "#dcdcdc"]);

    // 創建弧生成器
    let arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(innerRadius);

    // 設置資料
    let data = [scores, 100 - scores];

    // 創建圓餅圖
    let pie = d3.pie();

    // 繪製圓餅圖
    let arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function (d, i) {
            return color(i);
        })
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .attrTween("d", function (d) {
            let interpolate = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        });

    // 添加百分比標籤
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .text(scores + "%")
        .style("font-size", "10px");
    }

    function drawChart2(point2) {
        console.log("drawChart2 - point2:", point2);
    
        // 清空先前的图表
        d3.select("#point2").select("svg").remove();
    
        let pieChartContainer2 = d3.select("#point2");
    
        let width = 60;
        let height = 60;
        let radius = Math.min(width, height) / 2;
    
        // 設置內外半徑，以創建環狀圓餅圖
        let innerRadius = radius - 10;
    
        // 創建 SVG 元素
        let svg2 = pieChartContainer2.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        // 設置顏色
        let color = d3.scaleOrdinal(["#dcdcdc", "#da7b00"]);
    
        // 創建弧生成器
        let arc2 = d3.arc()
            .outerRadius(radius)
            .innerRadius(innerRadius);
    
        // 設置資料
        let data2 = [point2, 100 - point2];
    
        // 創建圓餅圖
        let pie2 = d3.pie();
    
        // 繪製圓餅圖
        let arcs = svg2.selectAll(".arc2")  // 将选择器更改为 ".arc2"
            .data(pie2(data2))
            .enter()
            .append("g")
            .attr("class", "arc2");
    
        arcs.append("path")
            .attr("d", arc2)
            .attr("fill", function (d, i) {
                console.log("drawed")
                return color(i);
            })
            .transition()
            .ease(d3.easeLinear)
            .duration(1000)
            .attrTween("d", function (d) {
                let interpolate = d3.interpolate(d.startAngle, d.endAngle);
                return function (t) {
                    d.endAngle = interpolate(t);
                    return arc2(d);
                };
            });
    
        // 添加百分比標籤
        svg2.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text(point2 + "%")
            .attr("fill", "#696969")
            .style("font-size", "8px");
    }
    
    function drawChart3(point3) {
        // 清空先前的图表
        d3.select("#point3").select("svg").remove();
    
        let pieChartContainer2 = d3.select("#point3");
    
        let width = 60;
        let height = 60;
        let radius = Math.min(width, height) / 2;
    
        // 設置內外半徑，以創建環狀圓餅圖
        let innerRadius = radius - 10;
    
        // 創建 SVG 元素
        let svg3 = pieChartContainer2.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        // 設置顏色
        let color = d3.scaleOrdinal(["#dcdcdc", "#da7b00"]);
    
        // 創建弧生成器
        let arc2 = d3.arc()
            .outerRadius(radius)
            .innerRadius(innerRadius);
    
        // 設置資料
        let data2 = [point3, 100 - point3];
    
        // 創建圓餅圖
        let pie2 = d3.pie();
    
        // 繪製圓餅圖
        let arcs = svg3.selectAll(".arc2")
            .data(pie2(data2))
            .enter()
            .append("g")
            .attr("class", "arc2");
    
        arcs.append("path")
            .attr("d", arc2)
            .attr("fill", function (d, i) {
                return color(i);
            })
            .transition()
            .ease(d3.easeLinear)
            .duration(1000)
            .attrTween("d", function (d) {
                let interpolate = d3.interpolate(d.startAngle, d.endAngle);
                return function (t) {
                    d.endAngle = interpolate(t);
                    return arc2(d);
                };
            });
    
        // 添加百分比標籤
        svg3.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text(point3 + "%")
            .attr("fill", "#696969")
            .style("font-size", "8px");
    }
    
    function drawChart4(foulShot) {
        // 清空先前的图表
        d3.select("#foulShot").select("svg").remove();
    
        let pieChartContainer2 = d3.select("#foulShot");
    
        let width = 60;
        let height = 60;
        let radius = Math.min(width, height) / 2;
    
        // 設置內外半徑，以創建環狀圓餅圖
        let innerRadius = radius - 10;
    
        // 創建 SVG 元素
        let svg4 = pieChartContainer2.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        // 設置顏色
        let color = d3.scaleOrdinal(["#dcdcdc", "#da7b00"]);
    
        // 創建弧生成器
        let arc2 = d3.arc()
            .outerRadius(radius)
            .innerRadius(innerRadius);
    
        // 設置資料
        let data2 = [foulShot, 100 - foulShot];
    
        // 創建圓餅圖
        let pie2 = d3.pie();
    
        // 繪製圓餅圖
        let arcs = svg4.selectAll(".arc2")
            .data(pie2(data2))
            .enter()
            .append("g")
            .attr("class", "arc2");
    
        arcs.append("path")
            .attr("d", arc2)
            .attr("fill", function (d, i) {
                return color(i);
            })
            .transition()
            .ease(d3.easeLinear)
            .duration(1000)
            .attrTween("d", function (d) {
                let interpolate = d3.interpolate(d.startAngle, d.endAngle);
                return function (t) {
                    d.endAngle = interpolate(t);
                    return arc2(d);
                };
            });
    
        // 添加百分比標籤
        svg4.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text(foulShot + "%")
            .attr("fill", "#696969")
            .style("font-size", "8px");
    }
    

    function winnlose(win, lose) {
        // 清空先前的图表
        d3.select("#chart").select("svg").remove();
    
        const totalLength = 200;
        const data = [
            { label: 'W勝', value: win }, // 按比例调整
            { label: 'L敗', value: lose },
        ];
    
        // 计算比例
        const totalValue = data.reduce((acc, d) => acc + d.value, 0);
        data.forEach(d => d.scaledValue = (d.value / totalValue) * totalLength);
    
        // 创建 SVG 容器
        const svgWidth = totalLength;
        const svgHeight = 100;
    
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
    
        // 创建比分图
        const barHeight = 15;
        const barPadding = 10;
    
        const bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i === 0 ? 0 : data[i - 1].scaledValue)
            .attr("y", 0)
            .attr("width", d => d.scaledValue)
            .attr("height", barHeight)
            .attr("fill", d => d.label === 'W勝' ? '#af1b3f' : '#27313b');
    
        // 添加标签
        const labels = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (d, i) => (i === 0 ? 0 : data[i - 1].scaledValue) + d.scaledValue / 2)
            .attr("y", barHeight + 10)
            .attr("text-anchor", "middle")
            .attr("fill", "#696969")
            .text(d => d.label + ": " + d.value);
    }
    

      function drawCurve(team) {
        const aaadata = [
            { date: '籃板', value1: finalData[0].backboards, value2: finalData[1] },
            { date: '助攻', value1: finalData[0].assists, value2: finalData[2] },
            { date: '阻攻', value1: finalData[0].block, value2: finalData[3] },
            { date: '失誤', value1: finalData[0].p_foul, value2: finalData[4] },
            { date: '犯規', value1: finalData[0].p_miss, value2: finalData[5] },
            { date: '禁區得分', value1: finalData[0].paint, value2: finalData[6] }
        ];
    console.log(aaadata)
        // 提取日期和數值
        const dates = aaadata.map(entry => entry.date);
        const values1 = aaadata.map(entry => entry.value1);
        const values2 = aaadata.map(entry => entry.value2);
        const text1 = values1.map(value => (typeof value === 'number' ? value.toFixed(2) : ''));
        const text2 = values2.map(value => (typeof value === 'number' ? value.toFixed(2) : ''));
    
        // 使用 Plotly.js 繪製曲線圖
        Plotly.newPlot('chart-container', [
            {
                x: dates,
                y: values1,
                text: text1, // 在每個點上顯示數值
                type: 'scatter',
                mode: 'lines+markers',
                marker: { size: 8 },
                line: { shape: 'linear' },
                name: '平均' // 線條1的名稱
            },
            {
                x: dates,
                y: values2,
                text: text2, // 在每個點上顯示數值
                type: 'scatter',
                mode: 'lines+markers',
                marker: { size: 8 },
                hoverinfo: 'text',  // 隱藏 hover 數值
                name: team // 線條2的名稱
            }
        ], {
            margin: { t: 30, l: 30, r: 30, b: 30 },
            plot_bgcolor: 'rgba(0,0,0,0)', // 設置背景色為透明
            paper_bgcolor: 'rgba(0,0,0,0)', // 設置繪圖區域背景色為透明
            xaxis: {
                showline: false, // 隱藏 x 軸線
                showgrid: false  // 隱藏 x 軸網格線
            },
            yaxis: { showgrid: false },  // 隱藏 y 軸網格線
            shapes: dates.map(date => ({
                type: 'line',
                x0: date,
                x1: date,
                y0: 0,
                y1: -1, // 調整這個值以控制底線的位置
                line: {
                    color: 'black',
                    width: 2
                }
            }))
        }, {
            displayModeBar: false 
            
        });
    }
    
    let tb = document.querySelector(".tb");
    let curveSection = document.querySelector(".curveSection"); 
    let thead = document.querySelector("#thead"); 
    
    tb.addEventListener("click", () => {
        tb.style.display = "none";
        curveSection.style.display = "block";
        thead.style.display = "flex";
    });
    
    
})

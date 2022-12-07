import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
const DashboardChart = () => {
  useLayoutEffect(() => {
    var root = am5.Root.new("chartID");
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );
    chart.get("colors").set("step", 3);
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );
    series.strokes.template.setAll({
      strokeWidth: 2,
      strokeDasharray: [3, 3],
    });

    // Create animating bullet by adding two circles in a bullet container and
    // animating radius and opacity of one of them.
    series.bullets.push(function (root, series, dataItem) {
      if (dataItem.dataContext.bullet) {
        var container = am5.Container.new(root, {});
        var circle0 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000),
          })
        );
        var circle1 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000),
          })
        );

        circle1.animate({
          key: "radius",
          to: 20,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        });
        circle1.animate({
          key: "opacity",
          to: 0,
          from: 1,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        });

        return am5.Bullet.new(root, {
          sprite: container,
        });
      }
    });

    // Set data
    var data = [
      {
        date: new Date(2021, 5, 12).getTime(),
        value: 50,
      },
      {
        date: new Date(2021, 5, 13).getTime(),
        value: 53,
      },
      {
        date: new Date(2021, 5, 14).getTime(),
        value: 56,
      },
      {
        date: new Date(2021, 5, 15).getTime(),
        value: 52,
      },
      {
        date: new Date(2021, 5, 16).getTime(),
        value: 48,
      },
      {
        date: new Date(2021, 5, 17).getTime(),
        value: 47,
      },
      {
        date: new Date(2021, 5, 18).getTime(),
        value: 59,
        bullet: true,
      },
    ];

    series.data.setAll(data);
    // //Create title chart
    // chart.children.unshift(
    //   am5.Label.new(root, {
    //     text: "Doanh số bán hàng trong tháng",
    //     fontSize: 25,
    //     fontWeight: "500",
    //     textAlign: "center",
    //     x: am5.percent(50),
    //     centerX: am5.percent(50),
    //     paddingTop: 0,
    //     paddingBottom: 0,
    //   })
    // );
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);
  return (
    <>
      <div className="text-center font-semibold text-xl">
        Doanh số bán hàng trong tháng
      </div>
      <div id="chartID" className="w-full h-[500px]"></div>
    </>
  );
};

export default DashboardChart;

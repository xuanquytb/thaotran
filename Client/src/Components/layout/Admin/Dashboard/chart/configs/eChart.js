const eChart = {
    options: {
        chart: {
            type: "bar",
            width: "100%",
            height: "auto",
            fillColor: "#EB8C87",
            toolbar: {
                show: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "50%",
                borderRadius: 6,
            },
        },
        dataLabels: {
            enabled: false,
        },

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [-50, 150, 200],
                type: "diagonal2",
            },
        },

        stroke: {
            show: true,
            width: 1,
            colors: ["gray"],
            curve: "smooth",
            lineCap: "butt",
            width: 0.5,
            dashArray: 0,
        },
        grid: {
            show: true,
            borderColor: "#ccc",
            strokeDashArray: 2,
        },
        xaxis: {
            categories: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ],
            labels: {
                show: true,
                align: "right",
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: [
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                    ],
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
                align: "right",
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: [
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                        "gray",
                    ],
                },
            },
        },

        labels: {
            style: {
                colors: "blue",
                fontSize: "12px",
            },
        },

        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " đơn hàng";
                },
            },
        },
    },
};

export default eChart;

import ReactApexChart from "react-apexcharts";
import eChart from "./configs/eChart";

function EChart({ data }) {
    const series = [
        {
            name: "Doanh số",
            data: data,
            color: "#fff",
        },
    ];

    return (
        <>
            <div style={{ fontSize: 20, marginBottom: 10 }}>
                Thống kê đơn hàng
            </div>

            <div id='chart'>
                <ReactApexChart
                    className='bar-chart'
                    options={eChart.options}
                    series={series}
                    type='bar'
                    height={420}
                />
            </div>
        </>
    );
}

export default EChart;

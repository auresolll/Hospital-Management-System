import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getOverviews, OverviewsAPI } from "../../Adapters/index.api";
import AnalyticChartByRole from "../../Components/Charts/AnalyticChartByRole.lazy";
import OverviewsAnalyticChartPatient from "../../Components/Charts/OverviewsAnalyticChartPatient";
import IconHome from "./../../Styles/assets/home.png";
import IconScissor from "./../../Styles/assets/scissor.png";
import IconStatusupWhite from "./../../Styles/assets/statusup-white.png";
import IconStatusup from "./../../Styles/assets/statusup.png";
import styles from "./Home.module.scss";
interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [overviews, setOverviews] = useState<OverviewsAPI[]>([]);
  const series = [
    {
      name: "Bác sĩ",
      type: "column",
      fill: "solid",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 88],
    },
    {
      name: "Bệnh nhân",
      type: "area",
      fill: "gradient",
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 100],
    },
    {
      name: "Nhân viên",
      type: "line",
      fill: "solid",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 5],
    },
  ];
  const seriesPatients = [44, 55, 67, 83];
  useEffect(() => {
    getOverviews().then((value) => setOverviews(value.data));
  }, []);

  useEffect(() => {
    const overviewsNode = document.querySelectorAll(".overviewsNode");
    overviews.forEach((value, index) => {
      const line = overviewsNode[index].querySelector<HTMLElement>(
        ".overviewsNode__Line"
      );
      const percentage =
        100 - (10000 - Number(8061 + value.totalCountInMonth)) / 100;

      if (!line) return;
      line.style.width = `${percentage}%`;
    });
  }, [overviews]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Hospital </title>
      </Helmet>
      <div className={styles.Home}>
        <div className={styles.Home__Heading}>
          <h1>Welcome back, Tú Anh!</h1>
          <p>Thống kê báo cáo trong ngày hôm nay ở đây</p>
        </div>

        <section className={styles.Home__Overviews}>
          {overviews.map((value: OverviewsAPI, index) => {
            return (
              <div
                key={index}
                className={`${styles.Home__Overviews__Block} overviewsNode`}
              >
                <div className={styles.Home__Overviews__Block__Heading}>
                  {index === 0 && (
                    <>
                      <img src={IconStatusup} alt="IconStatusup" />
                      {index === 0 && <p>Số lượng bệnh nhân</p>}
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <img src={IconHome} alt="IconHome" />
                      {index === 1 && <p>Số lượng bệnh nhân nội trú</p>}
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <img src={IconScissor} alt="IconScissor" />
                      {index === 2 && <p>Số lần phẫu thuật</p>}
                    </>
                  )}
                </div>

                <div className={styles.Home__Overviews__Block__Values}>
                  <h3>2123.123{value.count}</h3>
                  <p>+ {value.percentageIncrease}%</p>
                </div>

                <p className={styles.Home__Overviews__Block__Desc}>
                  Dữ liệu cập nhật từ 14 ngày trước từ{" "}
                  <strong>1513.156{value.countPrevious}</strong> -{" "}
                  <strong>2123.123{value.count}</strong>{" "}
                  {index === 2 ? "số lần phẫu thuật" : "bệnh nhân"}.
                </p>

                <div className={styles.Home__Overviews__Block__TimeLine}>
                  <div
                    className={
                      styles.Home__Overviews__Block__TimeLine__Container
                    }
                  >
                    <div
                      className={`${styles.Home__Overviews__Block__TimeLine__Container__Node} overviewsNode__Line `}
                    ></div>
                  </div>
                  <p>806{value.totalCountInMonth} / Tháng</p>
                </div>
              </div>
            );
          })}
        </section>

        <section className={styles.Home__Analytics}>
          <div className={styles.Home__Analytics__Role}>
            <div className={styles.Home__Analytics__Role__Heading}>
              <img src={IconStatusupWhite} alt="IconStatusupWhite" />
              <p>Thống kê tỉ lệ công việc</p>
            </div>

            <div className={styles.Home__Analytics__Role__Visual}>
              <AnalyticChartByRole
                chartData={series}
                chartLabels={[
                  "2023-01-01",
                  "2023-02-01",
                  "2023-03-01",
                  "2023-04-01",
                  "2023-05-01",
                  "2023-06-01",
                  "2023-07-01",
                  "2023-08-01",
                  "2023-09-01",
                  "2023-10-01",
                  "2023-11-01",
                  "2023-12-01",
                ]}
                other={{
                  plotOptions: {
                    bar: {
                      columnWidth: "16%",
                      borderRadius: 2.5,
                    },
                  },
                  colors: ["#00A76F", "#FFAB00", "#00B8D9"],
                  stroke: {
                    width: [2, 3, 4],
                  },
                  legend: {
                    position: "top",
                    horizontalAlign: "right",
                  },
                }}
              />
            </div>
          </div>

          <div className={styles.Home__Analytics__Base}>
            <div className={styles.Home__Analytics__Base__Heading}>
              <img src={IconStatusupWhite} alt="IconStatusupWhite" />
              <p>Thống kê dựa cơ sở</p>
            </div>

            <div className={styles.Home__Analytics__Base__Visual}>
              <OverviewsAnalyticChartPatient
                chartData={seriesPatients}
                chartLabels={["Hồ Chí Minh", "Hà Nội", "Nghệ An", "Đà Lạt"]}
                other={{
                  colors: ["#00A76F", "#FFD460", "#00B8D9", "#FF5630"],
                  plotOptions: {
                    radialBar: {
                      dataLabels: {
                        total: {
                          fillSeriesColor: false,
                          show: true,
                          label: "Tổng",
                          formatter: function (w: any) {
                            const sum = w.config.series.reduce(
                              (accumulator: number, currentValue: number) => {
                                return accumulator + currentValue;
                              },
                              0
                            );
                            return `${sum} Bệnh nhân`;
                          },
                        },
                        value: {
                          formatter: function (val: any) {
                            return `${val} Bệnh nhân`;
                          },
                        },
                      },
                    },
                  },
                  grid: {
                    padding: {
                      bottom: 50,
                    },
                  },
                  stroke: {
                    lineCap: "round",
                  },
                  legend: {
                    show: true,
                    floating: true,
                    position: "bottom",
                    horizontalAlign: "center",

                    itemMargin: {
                      horizontal: 12,
                      vertical: 8,
                    },
                  },
                }}
              />
            </div>
          </div>
        </section>

        <section className={styles.Home__Table}>
          <div className={styles.Home__Analytics__Role__Heading}>
            <img src={IconStatusupWhite} alt="IconStatusupWhite" />
            <p>Thống kê cơ sở</p>
          </div>

          <p className={styles.Home__Table__Title}>
            Quý 1 năm 2023 (T01 - T04)
          </p>

          <table className={styles.Home__Table__Container}>
            <tr>
              <th>Tên cơ sở</th>
              <th>Số lượng bệnh nhân</th>
              <th>Số lượng bác sĩ</th>
              <th>Số lượng phòng bệnh</th>
              <th>Số lượng xuất viện</th>
              <th>Số lượng tái khám</th>
            </tr>
            <tr>
              <td>HCM</td>
              <td>6121</td>
              <td>6121</td>
              <td>6121</td>
              <td>6121</td>
              <td>6121</td>
            </tr>
            <tr>
              <td>HCM</td>
              <td>6121</td>
              <td>6121</td>
              <td>6121</td>
              <td>6121</td>
              <td>6121</td>
            </tr>
          </table>
        </section>
      </div>
    </>
  );
};

export default Home;

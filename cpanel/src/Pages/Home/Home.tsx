import { FC, useEffect, useState } from "react";
import { getOverviews, OverviewsAPI } from "../../Adapters/index.api";
import IconHome from "./../../Styles/assets/home.png";
import IconScissor from "./../../Styles/assets/scissor.png";
import IconStatusupWhite from "./../../Styles/assets/statusup-white.png";
import IconStatusup from "./../../Styles/assets/statusup.png";
import styles from "./Home.module.scss";
interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [overviews, setOverviews] = useState<OverviewsAPI[]>([]);

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
    <div className={styles.Home}>
      <div className={styles.Home__Heading}>
        <h1>Welcome back, Tú Anh!</h1>
        <p>Thống kê báo cáo trong ngày hôm nay ở đây</p>
      </div>

      <div className={styles.Home__Overviews}>
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
                  className={styles.Home__Overviews__Block__TimeLine__Container}
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
      </div>

      <div className={styles.Home__Analytics}>
        <div className={styles.Home__Analytics__Role}>
          <div className={styles.Home__Analytics__Role__Heading}>
            <img src={IconStatusupWhite} alt="IconStatusupWhite" />
            <p>Tỉ lệch chênh lệch giữa các ROLES</p>
          </div>
        </div>
        <div className={styles.Home__Analytics__Base}>
          <div className={styles.Home__Analytics__Role__Heading}>
            <img src={IconStatusupWhite} alt="IconStatusupWhite" />
            <p>Thống kê dựa cơ sở</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
